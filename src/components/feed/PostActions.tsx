
import React from 'react';
import { Heart, MessageSquare, Share2, Music, Flame, Mic, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostActionsProps {
  postId: string;
  isLiked: boolean;
  reactions: {
    headNod: boolean;
    bass: boolean;
    barz: boolean;
    nextLevel: boolean;
  };
  showComments: boolean;
  onLike: (postId: string) => void;
  onReact: (postId: string, reactionType: string) => void;
  onToggleComments: (postId: string) => void;
  onShare: (postId: string) => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  isLiked,
  reactions,
  showComments,
  onLike,
  onReact,
  onToggleComments,
  onShare
}) => {
  const handleReaction = (type: string) => {
    onReact(postId, type);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <button 
        onClick={() => onLike(postId)}
        className={`flex items-center text-sm hover:text-primary transition-colors ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
      >
        <Heart size={20} className="mr-1" fill={isLiked ? "currentColor" : "none"} />
        Like
      </button>
      
      <button 
        onClick={() => onToggleComments(postId)}
        className={`flex items-center text-sm hover:text-primary transition-colors ${showComments ? 'text-primary' : 'text-muted-foreground'}`}
      >
        <MessageSquare size={20} className="mr-1" />
        Comment
      </button>
      
      <button 
        onClick={() => onShare(postId)}
        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <Share2 size={20} className="mr-1" />
        Share
      </button>
      
      <div className="w-full mt-2 flex justify-between">
        <button 
          onClick={() => handleReaction('headNod')}
          className={cn(
            "flex items-center text-sm transition-all transform hover:scale-110",
            reactions.headNod ? "text-blue-400" : "text-muted-foreground"
          )}
        >
          <Music size={18} className="mr-1" />
          <span>🎵 Head Nod</span>
        </button>
        
        <button 
          onClick={() => handleReaction('bass')}
          className={cn(
            "flex items-center text-sm transition-all transform hover:scale-110",
            reactions.bass ? "text-orange-500" : "text-muted-foreground"
          )}
        >
          <Flame size={18} className="mr-1" />
          <span>🔥 808 Face</span>
        </button>
        
        <button 
          onClick={() => handleReaction('barz')}
          className={cn(
            "flex items-center text-sm transition-all transform hover:scale-110",
            reactions.barz ? "text-purple-500" : "text-muted-foreground"
          )}
        >
          <Mic size={18} className="mr-1" />
          <span>🎤 Barz</span>
        </button>
        
        <button 
          onClick={() => handleReaction('nextLevel')}
          className={cn(
            "flex items-center text-sm transition-all transform hover:scale-110",
            reactions.nextLevel ? "text-green-500" : "text-muted-foreground"
          )}
        >
          <Rocket size={18} className="mr-1" />
          <span>🚀 Next Level</span>
        </button>
      </div>
    </div>
  );
};

export default PostActions;
