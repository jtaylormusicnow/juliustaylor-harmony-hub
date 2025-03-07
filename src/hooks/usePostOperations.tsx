
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Post } from '@/types/feed';

export const usePostOperations = (user: any) => {
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const fetchLikeStatus = async (posts: Post[]) => {
    const initialLikedState: Record<string, boolean> = {};
    
    if (user && posts.length > 0) {
      for (const post of posts) {
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
    return initialLikedState;
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

  return {
    likedPosts,
    fetchLikeStatus,
    likePost,
    sharePost
  };
};
