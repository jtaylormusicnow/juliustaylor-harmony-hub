
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PostNavigationProps {
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const PostNavigation: React.FC<PostNavigationProps> = ({ 
  hasPrevious, 
  hasNext, 
  onPrevious, 
  onNext 
}) => {
  return (
    <>
      {hasPrevious && (
        <button 
          onClick={onPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 p-2 rounded-full text-white hover:bg-black/40"
        >
          <ChevronLeft size={32} />
        </button>
      )}
      
      {hasNext && (
        <button 
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 p-2 rounded-full text-white hover:bg-black/40"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </>
  );
};

export default PostNavigation;
