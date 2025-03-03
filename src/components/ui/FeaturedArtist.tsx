
import React, { useState } from 'react';
import { Play, ExternalLink, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedArtistProps {
  id: string;
  name: string;
  image: string;
  genre: string;
  songTitle: string;
  previewUrl: string;
  external?: {
    spotify?: string;
    apple?: string;
    youtube?: string;
  };
}

const FeaturedArtist = ({
  id,
  name,
  image,
  genre,
  songTitle,
  previewUrl,
  external
}: FeaturedArtistProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(previewUrl));

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  // Clean up audio when component unmounts
  React.useEffect(() => {
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audio]);

  return (
    <div className="block group">
      <Link
        to={`/artist/${id}`}
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-xl hover-lift transition-all duration-300">
          <div className="aspect-square relative overflow-hidden rounded-xl">
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 opacity-70 group-hover:opacity-90" />
            
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <div className="self-start">
                <span className="px-3 py-1 rounded-full text-xs font-medium glassmorphism text-white">
                  {genre}
                </span>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-display font-medium text-white">{name}</h3>
                <p className="text-white/80 text-sm flex items-center">
                  <Music size={14} className="mr-1" />
                  {songTitle}
                </p>
              </div>
            </div>
            
            <button
              onClick={togglePlay}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              } bg-primary text-primary-foreground hover:bg-primary/90`}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <Play size={24} className={isPlaying ? "animate-pulse" : "ml-1"} />
            </button>
          </div>
        </div>
      </Link>
      
      {external && (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Listen on:</span>
          <div className="flex space-x-3">
            {external.spotify && (
              <a
                href={external.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </a>
            )}
            {external.apple && (
              <a
                href={external.apple}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </a>
            )}
            {external.youtube && (
              <a
                href={external.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedArtist;
