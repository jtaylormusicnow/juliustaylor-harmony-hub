
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export interface Post {
  id: string;
  media_url: string;
  media_type: string;
  caption: string | null;
  created_at: string | null;
  expires_at: string | null;
  views: number | null;
  profiles: {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
  };
}

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
  };
}

export const useFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchPosts();
    
    // Subscribe to realtime changes
    const subscription = supabase
      .channel('posts_channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'posts'
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setPosts(prevPosts => [payload.new as Post, ...prevPosts]);
        } else if (payload.eventType === 'DELETE') {
          setPosts(prevPosts => prevPosts.filter(post => post.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Fetch posts that haven't expired yet
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          media_url,
          media_type,
          caption,
          created_at,
          expires_at,
          views,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Initialize likes
      const initialLikedState: Record<string, boolean> = {};
      if (data) {
        for (const post of data) {
          await fetchComments(post.id);
          const { data: likeData } = await supabase
            .from('likes')
            .select('*')
            .eq('post_id', post.id)
            .eq('user_id', user?.id)
            .single();
          
          initialLikedState[post.id] = !!likeData;
        }
      }
      
      setLikedPosts(initialLikedState);
      setPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching posts:', error.message);
      toast({
        title: "Error",
        description: "Could not load posts. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      // Fixed query to correctly join comments with profiles
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          profiles(
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error in comment query:', error);
        throw error;
      }
      
      // Check if data exists and has the correct structure before updating state
      if (data && Array.isArray(data)) {
        // TypeScript validation to ensure proper data structure
        const validComments = data.filter(item => 
          item && item.profiles && typeof item.profiles === 'object' && 
          'id' in item.profiles && 'username' in item.profiles
        ) as Comment[];
        
        setComments(prev => ({
          ...prev,
          [postId]: validComments
        }));
      }
    } catch (error: any) {
      console.error('Error fetching comments:', error.message);
      // Don't update state with error data
    }
  };

  const navigateToNextPost = () => {
    if (currentPostIndex < posts.length - 1) {
      setCurrentPostIndex(prevIndex => prevIndex + 1);
      setShowComments(false);
    }
  };

  const navigateToPrevPost = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(prevIndex => prevIndex - 1);
      setShowComments(false);
    }
  };

  const likePost = async (postId: string) => {
    try {
      const isCurrentlyLiked = likedPosts[postId];
      
      if (isCurrentlyLiked) {
        // Unlike the post
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user?.id);
        
        if (error) throw error;
      } else {
        // Like the post
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: postId,
            user_id: user?.id
          });
        
        if (error) throw error;
      }
      
      // Update local state
      setLikedPosts(prev => ({
        ...prev,
        [postId]: !isCurrentlyLiked
      }));
      
      toast({
        title: isCurrentlyLiked ? "Unliked" : "Liked",
        description: isCurrentlyLiked ? "You unliked this post." : "You liked this post!",
      });
    } catch (error: any) {
      console.error('Error toggling like:', error.message);
      toast({
        title: "Error",
        description: "Could not process your reaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleComments = async (postId: string) => {
    setShowComments(!showComments);
    if (!showComments) {
      await fetchComments(postId);
      setTimeout(() => {
        if (commentInputRef.current) {
          commentInputRef.current.focus();
        }
      }, 100);
    }
  };

  const submitComment = async (postId: string) => {
    if (!newComment.trim()) return;
    
    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: user?.id,
          content: newComment.trim()
        });
      
      if (error) throw error;
      
      await fetchComments(postId);
      setNewComment('');
      
      toast({
        title: "Comment Added",
        description: "Your comment has been posted.",
      });
    } catch (error: any) {
      console.error('Error adding comment:', error.message);
      toast({
        title: "Error",
        description: "Could not post your comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const sharePost = async (postId: string) => {
    try {
      // Copy the URL to clipboard
      await navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
      
      toast({
        title: "Link Copied",
        description: "Post link copied to clipboard!",
      });
    } catch (error) {
      toast({
        title: "Sharing Failed",
        description: "Could not copy the link. Try again later.",
        variant: "destructive",
      });
    }
  };

  const navigateToCreatePost = () => {
    navigate('/create');
  };

  const navigateToProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const navigateToMessages = () => {
    navigate('/messages');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return {
    posts,
    currentPostIndex,
    loading,
    comments,
    newComment,
    setNewComment,
    showComments,
    likedPosts,
    commentInputRef,
    navigateToNextPost,
    navigateToPrevPost,
    likePost,
    toggleComments,
    submitComment,
    sharePost,
    navigateToCreatePost,
    navigateToProfile,
    navigateToMessages,
    navigateToHome
  };
};
