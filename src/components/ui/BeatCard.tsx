
import React, { useState } from 'react';
import { PlayCircle, PauseCircle, ShoppingCart, Download } from 'lucide-react';

interface License {
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

interface BeatCardProps {
  id: string;
  title: string;
  producedBy: string;
  cover: string;
  genre: string;
  bpm: number;
  previewUrl: string;
  licenses: License[];
}

const BeatCard = ({
  id,
  title,
  producedBy,
  cover,
  genre,
  bpm,
  previewUrl,
  licenses
}: BeatCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<string>(licenses[0]?.name || '');
  const [audio] = useState(new Audio(previewUrl));

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Clean up audio when component unmounts
  React.useEffect(() => {
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audio]);

  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-card border border-border/50 h-full flex flex-col">
      <div className="relative aspect-square group cursor-pointer" onClick={togglePlay}>
        <img 
          src={cover} 
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          {isPlaying ? (
            <PauseCircle size={56} className="text-white" />
          ) : (
            <PlayCircle size={56} className="text-white" />
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex justify-between items-center">
            <span className="px-2 py-1 rounded-full text-xs font-medium glassmorphism text-white">
              {genre}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium glassmorphism text-white">
              {bpm} BPM
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">Produced by {producedBy}</p>
        
        <div className="flex-1">
          <div className="space-y-3 mb-4">
            {licenses.map((license) => (
              <label 
                key={license.name}
                className={`block relative border rounded-lg p-3 cursor-pointer transition-all ${
                  selectedLicense === license.name 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/30'
                } ${license.isPopular ? 'ring-1 ring-primary' : ''}`}
              >
                <input
                  type="radio"
                  name="license"
                  value={license.name}
                  checked={selectedLicense === license.name}
                  onChange={() => setSelectedLicense(license.name)}
                  className="sr-only"
                />
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{license.name}</span>
                  <span className="text-primary font-semibold">${license.price}</span>
                </div>
                {license.isPopular && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>
        
        <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
        
        <button className="w-full mt-2 py-2 rounded-lg border border-primary/20 text-primary hover:bg-primary/5 transition-colors flex items-center justify-center space-x-2">
          <Download size={16} />
          <span>Download Preview</span>
        </button>
      </div>
    </div>
  );
};

export default BeatCard;
