
import React, { useState } from 'react';
import { Filter, ChevronDown, Search, Music, Play, Clock, Download, ShoppingCart } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Mock data
const beats = [
  {
    id: '1',
    title: 'Euphoria',
    producedBy: 'JuliusTaylor',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    genre: 'Trap',
    bpm: 140,
    duration: '2:45',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    licenses: [
      {
        name: 'Basic License',
        price: 29.99,
        features: ['MP3 File', 'Non-exclusive', 'Limited distribution']
      },
      {
        name: 'Premium License',
        price: 79.99,
        features: ['WAV + MP3 Files', 'Non-exclusive', 'Unlimited distribution'],
        isPopular: true
      },
      {
        name: 'Exclusive License',
        price: 299.99,
        features: ['All Files', 'Full ownership', 'Removed from store']
      }
    ]
  },
  {
    id: '2',
    title: 'Midnight Run',
    producedBy: 'JuliusTaylor',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Hip-Hop',
    bpm: 95,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    licenses: [
      {
        name: 'Basic License',
        price: 29.99,
        features: ['MP3 File', 'Non-exclusive', 'Limited distribution']
      },
      {
        name: 'Premium License',
        price: 79.99,
        features: ['WAV + MP3 Files', 'Non-exclusive', 'Unlimited distribution'],
        isPopular: true
      },
      {
        name: 'Exclusive License',
        price: 299.99,
        features: ['All Files', 'Full ownership', 'Removed from store']
      }
    ]
  },
  {
    id: '3',
    title: 'Ocean Waves',
    producedBy: 'JuliusTaylor',
    cover: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Lofi',
    bpm: 80,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    licenses: [
      {
        name: 'Basic License',
        price: 29.99,
        features: ['MP3 File', 'Non-exclusive', 'Limited distribution']
      },
      {
        name: 'Premium License',
        price: 79.99,
        features: ['WAV + MP3 Files', 'Non-exclusive', 'Unlimited distribution']
      },
      {
        name: 'Exclusive License',
        price: 299.99,
        features: ['All Files', 'Full ownership', 'Removed from store'],
        isPopular: true
      }
    ]
  },
  {
    id: '4',
    title: 'City Lights',
    producedBy: 'JuliusTaylor',
    cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    genre: 'R&B',
    bpm: 90,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    licenses: [
      {
        name: 'Basic License',
        price: 29.99,
        features: ['MP3 File', 'Non-exclusive', 'Limited distribution']
      },
      {
        name: 'Premium License',
        price: 79.99,
        features: ['WAV + MP3 Files', 'Non-exclusive', 'Unlimited distribution'],
        isPopular: true
      },
      {
        name: 'Exclusive License',
        price: 299.99,
        features: ['All Files', 'Full ownership', 'Removed from store']
      }
    ]
  },
  {
    id: '5',
    title: 'Dreamy Clouds',
    producedBy: 'JuliusTaylor',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Ambient',
    bpm: 70,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    licenses: [
      {
        name: 'Basic License',
        price: 29.99,
        features: ['MP3 File', 'Non-exclusive', 'Limited distribution']
      },
      {
        name: 'Premium License',
        price: 79.99,
        features: ['WAV + MP3 Files', 'Non-exclusive', 'Unlimited distribution']
      },
      {
        name: 'Exclusive License',
        price: 299.99,
        features: ['All Files', 'Full ownership', 'Removed from store'],
        isPopular: true
      }
    ]
  },
  {
    id: '6',
    title: 'Electric Dreams',
    producedBy: 'JuliusTaylor',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Electronic',
    bpm: 128,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    licenses: [
      {
        name: 'Basic License',
        price: 29.99,
        features: ['MP3 File', 'Non-exclusive', 'Limited distribution']
      },
      {
        name: 'Premium License',
        price: 79.99,
        features: ['WAV + MP3 Files', 'Non-exclusive', 'Unlimited distribution'],
        isPopular: true
      },
      {
        name: 'Exclusive License',
        price: 299.99,
        features: ['All Files', 'Full ownership', 'Removed from store']
      }
    ]
  }
];

const Beats = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedBeat, setSelectedBeat] = useState<string | null>(null);
  
  // Filter beats based on search query and genre
  const filteredBeats = beats.filter(beat => {
    const matchesSearch = beat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          beat.producedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All Genres' || beat.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });
  
  // Extract unique genres
  const genres = ['All Genres', ...new Set(beats.map(beat => beat.genre))];

  // Toggle play/pause
  const togglePlay = (id: string, audioUrl: string) => {
    if (playingId === id) {
      setPlayingId(null);
      // Pause audio logic here
    } else {
      setPlayingId(id);
      // Play audio logic here
    }
  };

  // Handle beat selection
  const handleBeatSelect = (id: string) => {
    setSelectedBeat(id === selectedBeat ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with your banner image */}
      <section 
        className="pt-24 pb-12 md:py-32 bg-gradient-to-b from-background to-secondary/20"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url('/lovable-uploads/9ad931bf-32fe-43d4-8db9-76c026598e32.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white">
              Premium <span className="text-gradient">Beats</span> Collection
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Find the perfect beat for your next project. Browse our collection of high-quality beats with flexible licensing options.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filters & Search Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Search beats..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-muted-foreground" />
                <span className="text-sm">Filter:</span>
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none px-4 py-2 pr-8 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Playlist Header */}
          <div className="hidden md:flex border-b border-border py-3 px-4 text-sm font-medium text-muted-foreground">
            <div className="w-14 text-center">#</div>
            <div className="w-16"></div>
            <div className="flex-1">Title</div>
            <div className="w-32">Genre</div>
            <div className="w-24 text-center">BPM</div>
            <div className="w-24 text-center">Duration</div>
            <div className="w-32 text-center">Price</div>
            <div className="w-24"></div>
          </div>
          
          {filteredBeats.length > 0 ? (
            <div className="divide-y divide-border">
              {filteredBeats.map((beat, index) => (
                <div
                  key={beat.id}
                  className={`group flex flex-col md:flex-row md:items-center py-4 px-4 transition-colors hover:bg-secondary/10 ${selectedBeat === beat.id ? 'bg-secondary/20' : ''}`}
                  onClick={() => handleBeatSelect(beat.id)}
                >
                  {/* Mobile Layout */}
                  <div className="flex items-center md:hidden mb-3">
                    <div className="h-14 w-14 mr-4 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={beat.cover}
                        alt={beat.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium">{beat.title}</h3>
                      <p className="text-sm text-muted-foreground">By {beat.producedBy}</p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <span className="mr-3">{beat.genre}</span>
                        <span>{beat.bpm} BPM</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(beat.id, beat.previewUrl);
                      }}
                      className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                    >
                      <Play size={18} className={playingId === beat.id ? "animate-pulse" : ""} />
                    </button>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden md:flex md:items-center md:w-full">
                    <div className="w-14 text-center text-muted-foreground">{index + 1}</div>
                    
                    <div className="w-16 h-12 rounded overflow-hidden">
                      <img
                        src={beat.cover}
                        alt={beat.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 ml-4">
                      <h3 className="font-medium">{beat.title}</h3>
                      <p className="text-sm text-muted-foreground">By {beat.producedBy}</p>
                    </div>
                    
                    <div className="w-32 text-sm">{beat.genre}</div>
                    <div className="w-24 text-center text-sm">{beat.bpm}</div>
                    <div className="w-24 text-center text-sm">{beat.duration}</div>
                    <div className="w-32 text-center text-sm font-medium text-primary">
                      ${beat.licenses[0].price}
                    </div>
                    
                    <div className="w-24 flex justify-end space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay(beat.id, beat.previewUrl);
                        }}
                        className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                      >
                        <Play size={16} className={playingId === beat.id ? "animate-pulse" : ""} />
                      </button>
                      
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary/20 transition-colors"
                      >
                        <ShoppingCart size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Expanded details for mobile (when selected) */}
                  {selectedBeat === beat.id && (
                    <div className="mt-4 md:hidden">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {beat.licenses.map((license) => (
                          <div
                            key={license.name}
                            className={`border rounded-lg p-3 text-center ${license.isPopular ? 'border-primary' : 'border-border'}`}
                          >
                            <div className="text-sm font-medium mb-1">{license.name}</div>
                            <div className="text-primary font-bold">${license.price}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                          <ShoppingCart size={16} />
                          <span>Add to Cart</span>
                        </button>
                        
                        <button className="px-4 py-2 rounded-lg border border-primary/20 text-primary hover:bg-primary/5 transition-colors flex items-center justify-center">
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No beats found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Beats;
