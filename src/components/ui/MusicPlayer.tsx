
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  title: string;
  artist: string;
  cover: string;
  audioSrc: string;
  mini?: boolean;
}

const MusicPlayer = ({ title, artist, cover, audioSrc, mini = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const setAudioData = () => {
      setDuration(audio.duration);
    };
    
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };
    
    // Events
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    
    // Set volume
    audio.volume = volume;
    
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [volume]);
  
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };
  
  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    if (!progressBar || !audioRef.current) return;
    
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
    if (value === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  if (mini) {
    return (
      <div className="glassmorphism rounded-full p-2 flex items-center space-x-3 animate-fade-in">
        <img 
          src={cover} 
          alt={`${title} by ${artist}`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{title}</p>
          <p className="text-xs text-muted-foreground truncate">{artist}</p>
        </div>
        <button
          onClick={togglePlay}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <audio ref={audioRef} src={audioSrc} />
      </div>
    );
  }
  
  return (
    <div className="w-full glassmorphism rounded-xl p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-full max-w-[200px] aspect-square">
          <img 
            src={cover} 
            alt={`${title} by ${artist}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        <div className="flex-1 w-full">
          <div className="mb-4">
            <h3 className="text-xl font-medium">{title}</h3>
            <p className="text-muted-foreground">{artist}</p>
          </div>
          
          <div className="space-y-4 w-full">
            <div 
              ref={progressBarRef}
              className="w-full h-2 bg-secondary rounded-full overflow-hidden cursor-pointer"
              onClick={handleProgressChange}
            >
              <div 
                className="h-full bg-primary rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="text-foreground hover:text-primary transition-colors">
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
                <button className="text-foreground hover:text-primary transition-colors">
                  <SkipForward size={20} />
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleMute}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 accent-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};

export default MusicPlayer;
