
import React from 'react';
import { useFeed } from '@/hooks/useFeed';
import FeedHeader from '@/components/feed/FeedHeader';
import ProgressBar from '@/components/feed/ProgressBar';
import PostNavigation from '@/components/feed/PostNavigation';
import PostContent from '@/components/feed/PostContent';
import PostActions from '@/components/feed/PostActions';
import CommentSection from '@/components/feed/CommentSection';
import EmptyFeed from '@/components/feed/EmptyFeed';
import { useAuth } from '@/contexts/AuthContext';

const Feed = () => {
  const { user } = useAuth();
  const {
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
  } = useFeed();

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

      {/* Main Content - Horizontal Scrolling Feed */}
      <main className="flex-1 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : posts.length > 0 ? (
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
                    showComments={showComments}
                    onLike={likePost}
                    onToggleComments={toggleComments}
                    onShare={sharePost}
                  />
                </div>
                
                {/* Comments Section */}
                {showComments && (
                  <CommentSection 
                    postId={posts[currentPostIndex].id}
                    comments={comments[posts[currentPostIndex].id] || []}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    submitComment={submitComment}
                    commentInputRef={commentInputRef}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <EmptyFeed navigateToCreatePost={navigateToCreatePost} />
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
