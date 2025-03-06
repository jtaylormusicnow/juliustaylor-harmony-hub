
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronRight, ChevronLeft, MessageSquare, Heart, Share2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Feed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const navigateToNextPost = () => {
    if (currentPostIndex < posts.length - 1) {
      setCurrentPostIndex(prevIndex => prevIndex + 1);
    }
  };

  const navigateToPrevPost = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(prevIndex => prevIndex - 1);
    }
  };

  const likePost = async (postId: string) => {
    // Placeholder for like functionality
    toast({
      title: "Liked",
      description: "You liked this post!",
    });
  };

  const sharePost = async (postId: string) => {
    // Placeholder for share functionality
    toast({
      title: "Shared",
      description: "Post share feature coming soon!",
    });
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="py-4 px-6 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Feed</h1>
          <div className="flex space-x-4">
            <button 
              onClick={navigateToMessages}
              className="p-2 rounded-full hover:bg-secondary/50"
            >
              <MessageSquare size={24} />
            </button>
            <button 
              onClick={navigateToCreatePost}
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
          <div className="h-full relative">
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

            {/* Current Post Display */}
            <div className="h-full w-full flex items-center justify-center p-4">
              <div className="max-w-lg w-full bg-card rounded-xl overflow-hidden shadow-lg">
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
                  <div className="flex items-center mb-3">
                    <img 
                      src={posts[currentPostIndex].profiles.avatar_url} 
                      alt={posts[currentPostIndex].profiles.username}
                      className="w-10 h-10 rounded-full mr-3 cursor-pointer"
                      onClick={() => navigateToProfile(posts[currentPostIndex].profiles.id)}
                    />
                    <div>
                      <p className="font-semibold cursor-pointer" onClick={() => navigateToProfile(posts[currentPostIndex].profiles.id)}>
                        {posts[currentPostIndex].profiles.full_name || posts[currentPostIndex].profiles.username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @{posts[currentPostIndex].profiles.username}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-3">{posts[currentPostIndex].caption}</p>
                  
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => likePost(posts[currentPostIndex].id)}
                      className="flex items-center text-sm text-muted-foreground hover:text-primary"
                    >
                      <Heart size={18} className="mr-1" />
                      Like
                    </button>
                    <button 
                      onClick={() => sharePost(posts[currentPostIndex].id)}
                      className="flex items-center text-sm text-muted-foreground hover:text-primary"
                    >
                      <Share2 size={18} className="mr-1" />
                      Share
                    </button>
                  </div>
                </div>
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

      {/* Progress Bar */}
      <div className="px-6 py-2 border-t">
        <div className="flex space-x-1">
          {posts.map((_, index) => (
            <div 
              key={index} 
              className={`h-1 flex-1 rounded-full ${index === currentPostIndex ? 'bg-primary' : 'bg-secondary'}`}
            />
          ))}
        </div>
      </div>

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
