
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronRight, ChevronLeft, MessageSquare, Heart, Share2, Plus, Home } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const Feed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Record<string, any[]>>({});
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
          setPosts(prevPosts => [payload.new, ...prevPosts]);
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
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      setComments(prev => ({
        ...prev,
        [postId]: data || []
      }));
    } catch (error: any) {
      console.error('Error fetching comments:', error.message);
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

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-gray-900">
      {/* Top Navigation */}
      <header className="py-4 px-6 border-b bg-background/95 backdrop-blur-sm dark:bg-gray-900/95 dark:border-gray-800 sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-xl font-bold">Feed</h1>
          <div className="flex space-x-4">
            <button 
              onClick={navigateToHome}
              title="Go back to home"
              className="p-2 rounded-full hover:bg-secondary/50"
            >
              <Home size={24} />
            </button>
            <button 
              onClick={navigateToMessages}
              title="Messages"
              className="p-2 rounded-full hover:bg-secondary/50"
            >
              <MessageSquare size={24} />
            </button>
            <button 
              onClick={navigateToCreatePost}
              title="Create new post"
              className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Horizontal Scrolling Feed */}
      <main className="flex-1 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : posts.length > 0 ? (
          <div className="h-full relative flex flex-col">
            {/* Instagram-like Story Progress Bar */}
            <div className="px-6 py-2">
              <div className="flex space-x-1 max-w-6xl mx-auto">
                {posts.map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-1 flex-1 rounded-full ${index === currentPostIndex ? 'bg-primary' : 'bg-secondary'}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Main Post Display */}
            <div className="flex-1 flex items-center justify-center relative">
              {/* Navigation Arrows */}
              {currentPostIndex > 0 && (
                <button 
                  onClick={navigateToPrevPost}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 p-2 rounded-full text-white hover:bg-black/40"
                >
                  <ChevronLeft size={32} />
                </button>
              )}
              
              {currentPostIndex < posts.length - 1 && (
                <button 
                  onClick={navigateToNextPost}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 p-2 rounded-full text-white hover:bg-black/40"
                >
                  <ChevronRight size={32} />
                </button>
              )}

              {/* Current Post Content */}
              <div className="max-w-2xl w-full mx-auto bg-card rounded-xl overflow-hidden shadow-lg">
                <div className="p-4 border-b">
                  <div className="flex items-center">
                    <Avatar onClick={() => navigateToProfile(posts[currentPostIndex].profiles.id)}>
                      <img 
                        src={posts[currentPostIndex].profiles.avatar_url} 
                        alt={posts[currentPostIndex].profiles.username}
                        className="w-10 h-10 rounded-full cursor-pointer"
                      />
                    </Avatar>
                    <div className="ml-3">
                      <p className="font-semibold cursor-pointer" onClick={() => navigateToProfile(posts[currentPostIndex].profiles.id)}>
                        {posts[currentPostIndex].profiles.full_name || posts[currentPostIndex].profiles.username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @{posts[currentPostIndex].profiles.username}
                      </p>
                    </div>
                  </div>
                </div>
                
                {posts[currentPostIndex].media_type === 'video' ? (
                  <video 
                    src={posts[currentPostIndex].media_url} 
                    className="w-full aspect-square object-cover"
                    controls
                    autoPlay
                    loop
                  />
                ) : (
                  <img 
                    src={posts[currentPostIndex].media_url} 
                    alt="Post content" 
                    className="w-full aspect-square object-cover"
                  />
                )}
                
                <div className="p-4">
                  <div className="flex space-x-4 mb-3">
                    <button 
                      onClick={() => likePost(posts[currentPostIndex].id)}
                      className={`flex items-center text-sm hover:text-primary transition-colors ${likedPosts[posts[currentPostIndex].id] ? 'text-red-500' : 'text-muted-foreground'}`}
                    >
                      <Heart size={20} className="mr-1" fill={likedPosts[posts[currentPostIndex].id] ? "currentColor" : "none"} />
                      Like
                    </button>
                    <button 
                      onClick={() => toggleComments(posts[currentPostIndex].id)}
                      className={`flex items-center text-sm hover:text-primary transition-colors ${showComments ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      <MessageSquare size={20} className="mr-1" />
                      Comment
                    </button>
                    <button 
                      onClick={() => sharePost(posts[currentPostIndex].id)}
                      className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Share2 size={20} className="mr-1" />
                      Share
                    </button>
                  </div>
                  
                  <p className="text-sm mb-3">{posts[currentPostIndex].caption}</p>
                </div>
                
                {/* Comments Section */}
                {showComments && (
                  <div className="p-4 pt-0 border-t">
                    <h3 className="font-medium mb-3">Comments</h3>
                    
                    {/* Comment List */}
                    <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
                      {comments[posts[currentPostIndex].id]?.length > 0 ? (
                        comments[posts[currentPostIndex].id].map((comment) => (
                          <div key={comment.id} className="flex items-start gap-2">
                            <Avatar className="w-8 h-8">
                              <img
                                src={comment.profiles.avatar_url}
                                alt={comment.profiles.username}
                                className="w-8 h-8 rounded-full"
                              />
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-secondary/50 dark:bg-gray-800 rounded-lg p-2">
                                <p className="text-xs font-medium">{comment.profiles.username}</p>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(comment.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No comments yet. Be the first to comment!</p>
                      )}
                    </div>
                    
                    {/* Comment Input */}
                    <div className="flex gap-2">
                      <Textarea
                        ref={commentInputRef}
                        placeholder="Add a comment..."
                        className="resize-none min-h-[40px]"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            submitComment(posts[currentPostIndex].id);
                          }
                        }}
                      />
                      <Button 
                        size="sm" 
                        onClick={() => submitComment(posts[currentPostIndex].id)}
                        disabled={!newComment.trim()}
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">No posts yet</h2>
            <p className="text-muted-foreground mb-6">Be the first to share a moment!</p>
            <button 
              onClick={navigateToCreatePost}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center"
            >
              <Plus className="mr-2" size={20} />
              Create Post
            </button>
          </div>
        )}
      </main>

      <style>
        {`
          html, body, #root {
            height: 100%;
            overflow-x: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default Feed;
