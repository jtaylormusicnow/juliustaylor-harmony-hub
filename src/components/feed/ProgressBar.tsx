
import React from 'react';

interface ProgressBarProps {
  totalPosts: number;
  currentIndex: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalPosts, currentIndex }) => {
  return (
    <div className="px-6 py-2">
      <div className="flex space-x-1 max-w-6xl mx-auto">
        {Array.from({ length: totalPosts }).map((_, index) => (
          <div 
            key={index} 
            className={`h-1 flex-1 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-secondary'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
