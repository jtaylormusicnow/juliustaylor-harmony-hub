
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ReactionProps {
  type: 'headNod' | 'bass' | 'barz' | 'nextLevel';
  isVisible: boolean;
}

const ReactionAnimation: React.FC<ReactionProps> = ({ type, isVisible }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  
  if (!visible) return null;
  
  const getEmoji = () => {
    switch (type) {
      case 'headNod': return '🎵';
      case 'bass': return '🔥';
      case 'barz': return '🎤';
      case 'nextLevel': return '🚀';
      default: return '🎵';
    }
  };
  
  const getColor = () => {
    switch (type) {
      case 'headNod': return 'from-blue-500 to-blue-300';
      case 'bass': return 'from-orange-500 to-orange-300';
      case 'barz': return 'from-purple-500 to-purple-300';
      case 'nextLevel': return 'from-green-500 to-green-300';
      default: return 'from-blue-500 to-blue-300';
    }
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      <div 
        className={cn(
          "flex flex-col items-center animate-bounce-up scale-in transition-all duration-500",
          "text-7xl"
        )}
      >
        <div className="text-9xl">{getEmoji()}</div>
        <div className={cn(
          "mt-4 px-6 py-3 rounded-full font-bold text-white",
          "bg-gradient-to-r shadow-lg",
          getColor()
        )}>
          {type === 'headNod' && "This slaps!"}
          {type === 'bass' && "That bass hits hard!"}
          {type === 'barz' && "Lyrics are crazy!"}
          {type === 'nextLevel' && "Industry ready!"}
        </div>
      </div>
    </div>
  );
};

export default ReactionAnimation;
