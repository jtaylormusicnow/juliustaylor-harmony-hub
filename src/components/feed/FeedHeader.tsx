
import React from 'react';
import { Home, MessageSquare, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeedHeaderProps {
  navigateToHome: () => void;
  navigateToMessages: () => void;
  navigateToCreatePost: () => void;
  children?: React.ReactNode;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({
  navigateToHome,
  navigateToMessages,
  navigateToCreatePost,
  children
}) => {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Button variant="ghost" onClick={navigateToHome} className="flex gap-1 items-center">
          <Home size={20} />
          <span className="sr-only md:not-sr-only">Home</span>
        </Button>

        <div className="flex items-center gap-2">
          {children}
          <Button variant="ghost" onClick={navigateToMessages} className="flex gap-1 items-center">
            <MessageSquare size={20} />
            <span className="sr-only md:not-sr-only">Messages</span>
          </Button>
          <Button variant="default" onClick={navigateToCreatePost} className="flex gap-1 items-center">
            <PlusCircle size={20} />
            <span className="sr-only md:not-sr-only">Create</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default FeedHeader;
