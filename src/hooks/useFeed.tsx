
import { useState, useEffect } from 'react';
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
    
    // Subscribe to realtime changes for new posts
    const postsChannel = supabase
      .channel('posts_channel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'posts'
      }, async (payload) => {
        console.log('New post received:', payload);
        const newPost = payload.new as any; // Use 'any' temporarily to access properties
        
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

    return () => {
      supabase.removeChannel(postsChannel);
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
    hasNewMessages,
    unreadCount,
    markMessagesAsRead,
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
