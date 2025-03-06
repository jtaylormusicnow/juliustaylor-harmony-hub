
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, MessageCircle, Heart, Share2, MoreHorizontal } from 'lucide-react';

// Sample data for demo purposes
const DEMO_STORIES = [
  {
    id: '1',
    username: 'johndoe',
    profilePic: 'https://source.unsplash.com/random/150x150?face-1',
    content: 'https://source.unsplash.com/random/720x1280?music-1',
    likes: 423,
    comments: 89,
    timeLeft: '4h remaining',
  },
  {
    id: '2',
    username: 'musicproducer',
    profilePic: 'https://source.unsplash.com/random/150x150?face-2',
    content: 'https://source.unsplash.com/random/720x1280?concert-1',
    likes: 1289,
    comments: 214,
    timeLeft: '12h remaining',
  },
  {
    id: '3',
    username: 'beatmaker',
    profilePic: 'https://source.unsplash.com/random/150x150?face-3',
    content: 'https://source.unsplash.com/random/720x1280?dj-1',
    likes: 876,
    comments: 134,
    timeLeft: '18h remaining',
  },
  {
    id: '4',
    username: 'vocalist',
    profilePic: 'https://source.unsplash.com/random/150x150?face-4',
    content: 'https://source.unsplash.com/random/720x1280?singer-1',
    likes: 632,
    comments: 98,
    timeLeft: '6h remaining',
  },
];

const Feed = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleContentClick = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'right' && currentIndex < DEMO_STORIES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {/* Header section */}
        <div className="border-b border-border py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-display font-bold">Feed</h1>
            <button
              onClick={() => navigate('/create')}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <PlusCircle size={18} />
              <span>Create</span>
            </button>
          </div>
        </div>
        
        {/* Content feed */}
        <div className="flex-1 relative overflow-hidden bg-black">
          {/* Left click area */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer" 
            onClick={() => handleContentClick('left')}
          />
          
          {/* Right click area */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer" 
            onClick={() => handleContentClick('right')}
          />
          
          {/* Content area */}
          <div 
            className="flex h-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {DEMO_STORIES.map((story) => (
              <div key={story.id} className="min-w-full h-full relative">
                {/* Video/Image content */}
                <img 
                  src={story.content} 
                  alt={`Content by ${story.username}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* User info overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                  <div className="flex items-center gap-2">
                    <img 
                      src={story.profilePic} 
                      alt={story.username} 
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <span className="font-medium text-white text-shadow">{story.username}</span>
                  </div>
                  <span className="text-xs text-white bg-black/30 px-3 py-1 rounded-full">
                    {story.timeLeft}
                  </span>
                </div>
                
                {/* Interaction buttons */}
                <div className="absolute bottom-10 left-4 right-4 flex items-center justify-between z-20">
                  <div className="flex gap-6">
                    <button className="flex flex-col items-center">
                      <Heart size={28} className="text-white" />
                      <span className="text-xs text-white mt-1">{story.likes}</span>
                    </button>
                    <button className="flex flex-col items-center">
                      <MessageCircle size={28} className="text-white" />
                      <span className="text-xs text-white mt-1">{story.comments}</span>
                    </button>
                    <button>
                      <Share2 size={28} className="text-white" />
                    </button>
                  </div>
                  <button>
                    <MoreHorizontal size={28} className="text-white" />
                  </button>
                </div>
                
                {/* Progress indicator */}
                <div className="absolute top-0 left-0 right-0 flex gap-1 p-1 z-20">
                  {DEMO_STORIES.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1 rounded-full flex-1 ${idx === currentIndex ? 'bg-primary' : 'bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {DEMO_STORIES.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-primary' : 'bg-white/40'}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />

      <style jsx>{`
        .text-shadow {
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
};

export default Feed;
