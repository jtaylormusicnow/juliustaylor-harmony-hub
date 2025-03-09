
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { usePostOperations } from './usePostOperations';
import { useCommentOperations } from './useCommentOperations';
import { useNavigation } from './useNavigation';
import { useMessageNotifications } from './useMessageNotifications';
import { Post } from '@/types/feed';

export * from '@/types/feed';

export const useFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reactions, setReactions] = useState<Record<string, {
    headNod: boolean;
    bass: boolean;
    barz: boolean;
    nextLevel: boolean;
  }>>({});
  
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

  const { 
    hasNewMessages, 
    unreadCount, 
    markMessagesAsRead 
  } = useMessageNotifications();

  useEffect(() => {
    fetchPosts();
    fetchReactions();
    
    // Subscribe to realtime changes for new posts
    const postsChannel = supabase
      .channel('posts_channel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'posts'
      }, async (payload) => {
        console.log('New post received:', payload);
        const newPost = payload.new as any;
        
        // Fetch profile data for the new post
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id, username, full_name, avatar_url')
          .eq('id', newPost.profiles?.id || newPost.user_id)
          .single();
          
        if (!profileError && profileData) {
          // Add profile data to the new post
          const completePost = {
            ...newPost,
            profiles: profileData
          };
          
          // Update like status for this post
          await fetchLikeStatus([completePost as Post]);
          
          // Add the new post to the top of the feed
          setPosts(prevPosts => [completePost as Post, ...prevPosts]);
          
          // Show a toast notification for the new post
          toast({
            title: "New Post",
            description: `${profileData.username || 'Someone'} just shared a new post!`,
          });
        }
      })
      .subscribe();

    // Subscribe to realtime changes for reactions
    const reactionsChannel = supabase
      .channel('reactions_channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'reactions'
      }, () => {
        // Refresh reactions when changes occur
        fetchReactions();
      })
      .subscribe();

    // Subscribe to realtime changes for comments
    const commentsChannel = supabase
      .channel('comments_channel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'comments'
      }, (payload) => {
        const newComment = payload.new as any;
        if (newComment && newComment.post_id) {
          // Fetch the updated comments for this post
          fetchComments(newComment.post_id);
          
          // Show a toast notification if the comment is not from the current user
          if (newComment.user_id !== user?.id) {
            toast({
              title: "New Comment",
              description: "Someone commented on a post you're following",
            });
          }
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(reactionsChannel);
      supabase.removeChannel(commentsChannel);
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
        console.log('Fetched posts:', data);
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

  const fetchReactions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('reactions')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      if (data) {
        const reactionsMap: Record<string, {
          headNod: boolean;
          bass: boolean;
          barz: boolean;
          nextLevel: boolean;
        }> = {};
        
        data.forEach(reaction => {
          if (!reactionsMap[reaction.post_id]) {
            reactionsMap[reaction.post_id] = {
              headNod: false,
              bass: false,
              barz: false,
              nextLevel: false
            };
          }
          
          if (reaction.reaction_type) {
            reactionsMap[reaction.post_id][reaction.reaction_type as keyof typeof reactionsMap[string]] = true;
          }
        });
        
        setReactions(reactionsMap);
      }
    } catch (error: any) {
      console.error('Error fetching reactions:', error.message);
    }
  };

  const reactToPost = async (postId: string, reactionType: string) => {
    if (!user) return;
    
    try {
      // Check if the reaction already exists
      const isReacted = reactions[postId]?.[reactionType as keyof typeof reactions[string]] || false;
      
      if (isReacted) {
        // Remove the reaction
        const { error } = await supabase
          .from('reactions')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id)
          .eq('reaction_type', reactionType);
          
        if (error) throw error;
        
        // Update local state
        setReactions(prev => ({
          ...prev,
          [postId]: {
            ...prev[postId],
            [reactionType]: false
          }
        }));
      } else {
        // Add the reaction
        const { error } = await supabase
          .from('reactions')
          .insert({
            post_id: postId,
            user_id: user.id,
            reaction_type: reactionType
          });
          
        if (error) throw error;
        
        // Update local state
        setReactions(prev => ({
          ...prev,
          [postId]: {
            ...(prev[postId] || {
              headNod: false,
              bass: false,
              barz: false,
              nextLevel: false
            }),
            [reactionType]: true
          }
        }));
      }
    } catch (error: any) {
      console.error('Error reacting to post:', error.message);
      toast({
        title: "Error",
        description: "Could not process your reaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNavigateToNextPost = () => {
    navigateToNextPost(currentPostIndex, posts.length - 1);
    setShowComments(false);
  };

  const handleNavigateToPrevPost = () => {
    navigateToPrevPost(currentPostIndex);
    setShowComments(false);
  };

  return {
    posts,
    currentPostIndex,
    setCurrentPostIndex,
    loading,
    comments,
    newComment,
    setNewComment,
    showComments,
    likedPosts,
    reactions,
    commentInputRef,
    hasNewMessages,
    unreadCount,
    markMessagesAsRead,
    navigateToNextPost: handleNavigateToNextPost,
    navigateToPrevPost: handleNavigateToPrevPost,
    likePost,
    toggleComments,
    submitComment,
    reactToPost,
    sharePost,
    navigateToCreatePost,
    navigateToProfile,
    navigateToMessages,
    navigateToHome
  };
};
