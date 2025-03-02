
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  audioSrc: string;
  title: string;
  artist?: string;
  coverImage?: string;
  onEnded?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  className?: string;
  mini?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  audioSrc,
  title,
  artist = "J. Taylor",
  coverImage,
  onEnded,
  onPlay,
  onPause,
  className = "",
  mini = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onEnded) onEnded();
    };

    // Events
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [onEnded]);

  // Handle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      if (onPause) onPause();
    } else {
      audio.play().catch((e) => console.error("Error playing audio:", e));
      setIsPlaying(true);
      if (onPlay) onPlay();
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progress = progressRef.current;
    if (!audio || !progress) return;

    const rect = progress.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * duration;
  };

  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
      setIsMuted(value === 0);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.7;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg ${className} ${mini ? "flex items-center" : ""}`}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      {!mini && coverImage && (
        <div className="mb-4">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-48 object-cover rounded-md shadow-sm"
          />
        </div>
      )}
      
      <div className={`flex ${mini ? "items-center space-x-4" : "flex-col space-y-2"}`}>
        {mini && coverImage && (
          <img
            src={coverImage}
            alt={title}
            className="w-12 h-12 object-cover rounded-md shadow-sm"
          />
        )}
        
        <div className={mini ? "flex-grow" : ""}>
          <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
          <p className="text-gray-600 text-sm">{artist}</p>
        </div>
        
        <div className={`flex items-center space-x-3 ${mini ? "" : "mt-4"}`}>
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={mini ? 16 : 18} /> : <Play size={mini ? 16 : 18} />}
          </button>
          
          {!mini && (
            <>
              <div 
                ref={progressRef}
                className="player-progress"
                onClick={handleProgressClick}
              >
                <div 
                  className="player-progress-bar"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              
              <div className="text-sm text-gray-600 min-w-[80px] text-right">
                {formatTime(currentTime)} / {formatTime(duration || 0)}
              </div>
            </>
          )}
        </div>
        
        {!mini && (
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={toggleMute}
              className="player-control"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              aria-label="Volume"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
