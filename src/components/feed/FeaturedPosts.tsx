
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Post } from '@/types/feed';
import PostContent from './PostContent';

interface FeaturedPostsProps {
  featuredPosts: Post[];
  navigateToProfile: (userId: string) => void;
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ featuredPosts, navigateToProfile }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % featuredPosts.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredPosts.length]);
  
  if (!featuredPosts.length) return null;
  
  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + featuredPosts.length) % featuredPosts.length);
  };
  
  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % featuredPosts.length);
  };
  
  return (
    <div className="sticky top-0 z-10 mb-6 py-4 bg-background/80 backdrop-blur-lg">
      <div className="relative">
        <h2 className="text-lg font-bold mb-2 flex items-center">
          <span className="mr-2 text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Featured
          </span>
          <span className="text-sm text-muted-foreground">Trending Beats & Exclusive Drops</span>
        </h2>
        
        <div className="relative">
          <PostContent 
            post={featuredPosts[currentIndex]} 
            isFeatured={true}
            navigateToProfile={navigateToProfile} 
          />
          
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1">
            {featuredPosts.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-muted'}`}
              />
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full text-white"
            onClick={handlePrev}
          >
            <ChevronLeft size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full text-white"
            onClick={handleNext}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
