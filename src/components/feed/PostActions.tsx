
import React from 'react';
import { Heart, MessageSquare, Share2 } from 'lucide-react';

interface PostActionsProps {
  postId: string;
  isLiked: boolean;
  showComments: boolean;
  onLike: (postId: string) => void;
  onToggleComments: (postId: string) => void;
  onShare: (postId: string) => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  isLiked,
  showComments,
  onLike,
  onToggleComments,
  onShare
}) => {
  return (
    <div className="flex space-x-4 mb-3">
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
    </div>
  );
};

export default PostActions;
