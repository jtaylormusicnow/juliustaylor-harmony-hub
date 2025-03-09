
import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Comment } from '@/types/feed';

interface CommentOverlayProps {
  isOpen: boolean;
  postId: string;
  comments: Comment[];
  newComment: string;
  setNewComment: (comment: string) => void;
  submitComment: (postId: string) => void;
  onClose: () => void;
}

const CommentOverlay: React.FC<CommentOverlayProps> = ({
  isOpen,
  postId,
  comments,
  newComment,
  setNewComment,
  submitComment,
  onClose
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
    
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        ref={overlayRef}
        className="bg-card rounded-xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl animate-fade-in"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold">Comments</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  {comment.profiles.avatar_url ? (
                    <img
                      src={comment.profiles.avatar_url}
                      alt={comment.profiles.username || ''}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {(comment.profiles.username || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                </Avatar>
                
                <div className="flex-1">
                  <div className="bg-secondary/50 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-xs font-medium mb-1">
                      {comment.profiles.full_name || comment.profiles.username}
                    </p>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No comments yet.</p>
              <p className="text-sm">Be the first to add a comment!</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t">
          <div className="flex gap-3">
            <Textarea
              ref={textareaRef}
              placeholder="Add a comment..."
              className="resize-none min-h-[80px]"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  submitComment(postId);
                }
              }}
            />
          </div>
          
          <div className="flex justify-end mt-3">
            <Button 
              onClick={() => submitComment(postId)}
              disabled={!newComment.trim()}
            >
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentOverlay;
