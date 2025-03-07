
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { usePostOperations } from './usePostOperations';
import { useCommentOperations } from './useCommentOperations';
import { useNavigation } from './useNavigation';
import { Post } from '@/types/feed';

export * from '@/types/feed';

export const useFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const {
    likedPosts,
    fetchLikeStatus,
    likePost,
    sharePost
  } = usePostOperations(user);
  
  const {
    comments,
    newComment,
    setNewComment,
    showComments,
    setShowComments,
    commentInputRef,
    fetchComments,
    toggleComments,
    submitComment
  } = useCommentOperations(user);
  
  const {
    navigateToNextPost,
    navigateToPrevPost,
    navigateToCreatePost,
    navigateToProfile,
    navigateToMessages,
    navigateToHome
  } = useNavigation();

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
      
      if (data) {
        await fetchLikeStatus(data);
        for (const post of data) {
          await fetchComments(post.id);
        }
        setPosts(data);
      }
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

  const handleNavigateToNextPost = () => {
    setCurrentPostIndex(prevIndex => navigateToNextPost(prevIndex, posts));
    setShowComments(false);
  };

  const handleNavigateToPrevPost = () => {
    setCurrentPostIndex(prevIndex => navigateToPrevPost(prevIndex));
    setShowComments(false);
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
    navigateToNextPost: handleNavigateToNextPost,
    navigateToPrevPost: handleNavigateToPrevPost,
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
