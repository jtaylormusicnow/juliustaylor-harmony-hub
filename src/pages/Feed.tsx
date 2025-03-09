
import React, { useState } from 'react';
import { useFeed } from '@/hooks/useFeed';
import FeedHeader from '@/components/feed/FeedHeader';
import ProgressBar from '@/components/feed/ProgressBar';
import PostNavigation from '@/components/feed/PostNavigation';
import PostContent from '@/components/feed/PostContent';
import PostActions from '@/components/feed/PostActions';
import CommentOverlay from '@/components/feed/CommentOverlay';
import EmptyFeed from '@/components/feed/EmptyFeed';
import FeaturedPosts from '@/components/feed/FeaturedPosts';
import GridView from '@/components/feed/GridView';
import ReactionAnimation from '@/components/feed/Reaction';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Grid, Maximize } from 'lucide-react';

const Feed = () => {
  const { user } = useAuth();
  const {
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
    navigateToNextPost,
    navigateToPrevPost,
    likePost,
    toggleComments,
    submitComment,
    reactToPost,
    sharePost,
    navigateToCreatePost,
    navigateToProfile,
    navigateToMessages,
    navigateToHome
  } = useFeed();

  const [viewMode, setViewMode] = useState<'grid' | 'fullscreen'>('grid'); // Default to grid view like Instagram
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [currentReaction, setCurrentReaction] = useState<{
    type: 'headNod' | 'bass' | 'barz' | 'nextLevel' | null;
    visible: boolean;
  }>({ type: null, visible: false });

  // Identify featured posts (could be based on views, likes, etc.)
  const featuredPosts = posts.slice(0, 3);

  const handleReact = (postId: string, reactionType: string) => {
    reactToPost(postId, reactionType);
    setCurrentReaction({
      type: reactionType as 'headNod' | 'bass' | 'barz' | 'nextLevel',
      visible: true
    });
    
    // Hide reaction animation after 1.5 seconds
    setTimeout(() => {
      setCurrentReaction(prev => ({ ...prev, visible: false }));
    }, 1500);
  };

  const handleToggleComments = (postId: string) => {
    setCommentsOpen(true);
  };

  const handleSelectGridPost = (index: number) => {
    setViewMode('fullscreen');
    // Navigate to the selected post
    setCurrentPostIndex(index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-gray-900">
      {/* Top Navigation */}
      <FeedHeader 
        navigateToHome={navigateToHome}
        navigateToMessages={() => {
          markMessagesAsRead();
          navigateToMessages();
        }}
        navigateToCreatePost={navigateToCreatePost}
        navigateToProfile={navigateToProfile}
        currentUserId={user?.id}
        hasNotifications={hasNewMessages}
        notificationCount={unreadCount}
      />

      {/* View Toggle */}
      <div className="flex justify-end px-4 py-2">
        <div className="bg-secondary/30 rounded-full p-1 flex">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-full"
            onClick={() => setViewMode('grid')}
          >
            <Grid size={18} className="mr-1" />
            Grid
          </Button>
          <Button
            variant={viewMode === 'fullscreen' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-full"
            onClick={() => setViewMode('fullscreen')}
          >
            <Maximize size={18} className="mr-1" />
            Full
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : posts.length > 0 ? (
          <>
            {/* Featured Posts Section (Instagram-like stories at top) */}
            {viewMode === 'grid' && (
              <FeaturedPosts 
                featuredPosts={featuredPosts}
                navigateToProfile={navigateToProfile}
              />
            )}

            {/* Main Content Area */}
            {viewMode === 'grid' ? (
              <GridView 
                posts={posts} 
                onSelectPost={handleSelectGridPost} 
              />
            ) : (
              <div className="h-full relative flex flex-col">
                {/* Instagram-like Story Progress Bar */}
                <ProgressBar 
                  totalPosts={posts.length} 
                  currentIndex={currentPostIndex} 
                />
                
                {/* Main Post Display */}
                <div className="flex-1 flex items-center justify-center relative">
                  {/* Navigation Arrows */}
                  <PostNavigation 
                    hasPrevious={currentPostIndex > 0}
                    hasNext={currentPostIndex < posts.length - 1}
                    onPrevious={navigateToPrevPost}
                    onNext={navigateToNextPost}
                  />

                  {/* Current Post Content */}
                  <div className="max-w-2xl w-full mx-auto bg-card rounded-xl overflow-hidden shadow-lg">
                    <PostContent 
                      post={posts[currentPostIndex]}
                      navigateToProfile={navigateToProfile}
                    />
                    
                    <div className="p-4">
                      <PostActions 
                        postId={posts[currentPostIndex].id}
                        isLiked={likedPosts[posts[currentPostIndex].id]}
                        reactions={reactions[posts[currentPostIndex].id] || {
                          headNod: false,
                          bass: false,
                          barz: false,
                          nextLevel: false
                        }}
                        showComments={showComments}
                        onLike={likePost}
                        onReact={handleReact}
                        onToggleComments={handleToggleComments}
                        onShare={sharePost}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Comments Overlay */}
            <CommentOverlay
              isOpen={commentsOpen}
              postId={posts[currentPostIndex]?.id}
              comments={comments[posts[currentPostIndex]?.id] || []}
              newComment={newComment}
              setNewComment={setNewComment}
              submitComment={(postId) => {
                submitComment(postId);
                // Don't close the overlay on submit to show the new comment
              }}
              onClose={() => setCommentsOpen(false)}
            />

            {/* Reaction Animation */}
            {currentReaction.type && (
              <ReactionAnimation
                type={currentReaction.type}
                isVisible={currentReaction.visible}
              />
            )}
          </>
        ) : (
          <EmptyFeed navigateToCreatePost={navigateToCreatePost} />
        )}
      </main>

      <style>
        {`
          @keyframes bounce-up {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-30px);
            }
            60% {
              transform: translateY(-15px);
            }
          }
          
          .animate-bounce-up {
            animation: bounce-up 1s ease;
          }
          
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
