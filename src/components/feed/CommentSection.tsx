
import React, { useRef } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: Profile;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  newComment: string;
  setNewComment: (comment: string) => void;
  submitComment: (postId: string) => void;
  commentInputRef: React.RefObject<HTMLTextAreaElement>;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  newComment,
  setNewComment,
  submitComment,
  commentInputRef
}) => {
  return (
    <div className="p-4 pt-0 border-t">
      <h3 className="font-medium mb-3">Comments</h3>
      
      {/* Comment List */}
      <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2">
              <Avatar className="w-8 h-8">
                <img
                  src={comment.profiles.avatar_url || ''}
                  alt={comment.profiles.username}
                  className="w-8 h-8 rounded-full"
                />
              </Avatar>
              <div className="flex-1">
                <div className="bg-secondary/50 dark:bg-gray-800 rounded-lg p-2">
                  <p className="text-xs font-medium">{comment.profiles.username}</p>
                  <p className="text-sm">{comment.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground italic">No comments yet. Be the first to comment!</p>
        )}
      </div>
      
      {/* Comment Input */}
      <div className="flex gap-2">
        <Textarea
          ref={commentInputRef}
          placeholder="Add a comment..."
          className="resize-none min-h-[40px]"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submitComment(postId);
            }
          }}
        />
        <Button 
          size="sm" 
          onClick={() => submitComment(postId)}
          disabled={!newComment.trim()}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
