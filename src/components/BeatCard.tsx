
import React, { useState } from "react";
import { Beat } from "@/lib/data";
import { Play, Pause, ShoppingCart, Clock, Activity } from "lucide-react";
import MusicPlayer from "./MusicPlayer";

interface BeatCardProps {
  beat: Beat;
  className?: string;
  featured?: boolean;
}

const BeatCard: React.FC<BeatCardProps> = ({ 
  beat, 
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
          src={beat.artwork} 
          alt={beat.title} 
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
        
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white rounded-full text-sm font-medium">
            ${beat.price.toFixed(2)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-display font-semibold text-lg">{beat.title}</h3>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{beat.duration}</span>
              </div>
              <div className="flex items-center">
                <Activity size={14} className="mr-1" />
                <span>{beat.bpm} BPM</span>
              </div>
              <div>
                <span className="font-medium">{beat.key}</span>
              </div>
            </div>
          </div>
          
          <button 
            className="p-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {beat.genres.map((genre) => (
            <span 
              key={genre} 
              className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700"
            >
              {genre}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-1">
          {beat.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-0.5 text-xs text-gray-500"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {showPlayer && (
          <div className="mt-4">
            <MusicPlayer 
              audioSrc={beat.audioSrc} 
              title={beat.title}
              coverImage={beat.artwork}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              mini={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BeatCard;
