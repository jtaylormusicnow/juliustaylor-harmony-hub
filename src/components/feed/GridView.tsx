
import React from 'react';
import { Post } from '@/types/feed';
import { Play, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GridViewProps {
  posts: Post[];
  onSelectPost: (index: number) => void;
}

const GridView: React.FC<GridViewProps> = ({ posts, onSelectPost }) => {
  if (!posts.length) return null;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
      {posts.map((post, index) => (
        <div 
          key={post.id}
          className="relative aspect-square overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-all hover:scale-[0.98]"
          onClick={() => onSelectPost(index)}
        >
          {post.media_type === 'video' ? (
            <div className="group relative h-full">
              <video 
                src={post.media_url}
                className="w-full h-full object-cover"
                muted
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={40} className="text-white" />
              </div>
            </div>
          ) : (
            <img 
              src={post.media_url} 
              alt={post.caption || 'Post'} 
              className="w-full h-full object-cover"
            />
          )}
          
          <div className={cn(
            "absolute bottom-0 left-0 right-0 p-2 text-white",
            "bg-gradient-to-t from-black/70 to-transparent"
          )}>
            <div className="flex items-center text-xs">
              <Music size={12} className="mr-1" />
              <span className="truncate">
                {post.caption || 'Harmony Hub Post'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;
