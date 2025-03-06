
import React from 'react';
import { Plus } from 'lucide-react';

interface EmptyFeedProps {
  navigateToCreatePost: () => void;
}

const EmptyFeed: React.FC<EmptyFeedProps> = ({ navigateToCreatePost }) => {
  return (
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
  );
};

export default EmptyFeed;
