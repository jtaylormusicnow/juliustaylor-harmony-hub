
import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Comment } from '@/types/feed';

export const useCommentOperations = (user: any) => {
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { toast } = useToast();
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const fetchComments = async (postId: string) => {
    try {
      // Query to correctly join comments with profiles
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
          item && 
          item.profiles && 
          typeof item.profiles === 'object' && 
          item.profiles !== null &&
          'id' in item.profiles && 
          'username' in item.profiles
        ) as unknown as Comment[];
        
        setComments(prev => ({
          ...prev,
          [postId]: validComments
        }));
      }
    } catch (error: any) {
      console.error('Error fetching comments:', error.message);
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

  return {
    comments,
    newComment,
    setNewComment,
    showComments,
    setShowComments,
    commentInputRef,
    fetchComments,
    toggleComments,
    submitComment
  };
};
