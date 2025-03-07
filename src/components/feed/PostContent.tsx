
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface PostContentProps {
  post: {
    id: string;
    media_url: string;
    media_type: string;
    caption: string | null;
    profiles: Profile;
  };
  navigateToProfile: (userId: string) => void;
}

const PostContent: React.FC<PostContentProps> = ({ post, navigateToProfile }) => {
  const goToProfileDashboard = () => {
    window.location.href = '/profile';
  };

  return (
    <div className="max-w-2xl w-full mx-auto bg-card rounded-xl overflow-hidden shadow-lg">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar onClick={() => navigateToProfile(post.profiles.id)}>
              <img 
                src={post.profiles.avatar_url || ''} 
                alt={post.profiles.username}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </Avatar>
            <div className="ml-3">
              <p className="font-semibold cursor-pointer" onClick={() => navigateToProfile(post.profiles.id)}>
                {post.profiles.full_name || post.profiles.username}
              </p>
              <p className="text-sm text-muted-foreground">
                @{post.profiles.username}
              </p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToProfileDashboard}
            className="flex gap-1 items-center"
          >
            <User size={16} />
            <span>Profile</span>
          </Button>
        </div>
      </div>
      
      {post.media_type === 'video' ? (
        <video 
          src={post.media_url} 
          className="w-full aspect-square object-cover"
          controls
          autoPlay
          loop
        />
      ) : (
        <img 
          src={post.media_url} 
          alt="Post content" 
          className="w-full aspect-square object-cover"
        />
      )}
      
      <div className="p-4">
        <p className="text-sm mb-3">{post.caption}</p>
      </div>
    </div>
  );
};

export default PostContent;
