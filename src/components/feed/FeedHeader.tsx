
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MessageSquare, Plus } from 'lucide-react';

interface FeedHeaderProps {
  navigateToHome: () => void;
  navigateToMessages: () => void;
  navigateToCreatePost: () => void;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({ 
  navigateToHome, 
  navigateToMessages, 
  navigateToCreatePost 
}) => {
  return (
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
  );
};

export default FeedHeader;
