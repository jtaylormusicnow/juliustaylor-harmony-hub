
import React, { useState } from "react";
import { Music } from "@/lib/data";
import { Play, Pause, Download, Clock } from "lucide-react";
import MusicPlayer from "./MusicPlayer";

interface MusicCardProps {
  music: Music;
  className?: string;
  featured?: boolean;
}

const MusicCard: React.FC<MusicCardProps> = ({ 
  music, 
  className = "",
  featured = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  
  const handlePlay = () => {
    setIsPlaying(true);
    setShowPlayer(true);
  };
  
  const handlePause = () => {
    setIsPlaying(false);
  };
  
  return (
    <div 
      className={`group rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl bg-white ${
        featured ? "md:col-span-2" : ""
      } ${className}`}
    >
      <div className="relative">
        <img 
          src={music.artwork} 
          alt={music.title} 
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            featured ? "h-64 md:h-80" : "h-56"
          }`}
        />
        
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handlePlay}
            className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white transform scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-display font-semibold text-lg">{music.title}</h3>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <Clock size={14} className="mr-1" />
              <span>{music.duration}</span>
            </div>
          </div>
          
          <a 
            href={music.audioSrc} 
            download={`${music.title}.mp3`}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Download"
          >
            <Download size={18} />
          </a>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{music.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {music.genres.map((genre) => (
            <span 
              key={genre} 
              className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700"
            >
              {genre}
            </span>
          ))}
        </div>
        
        {showPlayer && (
          <div className="mt-4">
            <MusicPlayer 
              audioSrc={music.audioSrc} 
              title={music.title}
              coverImage={music.artwork}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicCard;
