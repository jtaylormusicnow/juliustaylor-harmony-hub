
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Users, 
  MessageCircle, 
  Gift, 
  Share2, 
  Headphones, 
  PlayCircle, 
  PauseCircle,
  Volume2,
  VolumeX
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MusicReactions from '../components/ui/MusicReactions';

// Mock data for a listening party
const partyData = {
  id: '1',
  title: 'Cosmic Journey EP Premiere',
  artistName: 'JuliusTaylor',
  artistImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  date: 'June 15, 2024',
  time: '8:00 PM EST',
  description: 'Join JuliusTaylor for an exclusive first listen of the Cosmic Journey EP with live commentary on the production process. Learn about the creative decisions, sample choices, and technical aspects that went into making this project.',
  attendees: 243,
  exclusive: 'Custom Drum Kit',
  tracks: [
    {
      id: '1',
      title: 'Cosmic Intro',
      duration: '1:32',
      status: 'played',
      commentary: 'I wanted to create an atmospheric intro that sets the mood for the entire EP. The synth pad was designed using Serum with heavy reverb and delay effects.',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      reactions: { headnod: 45, bass: 12, barz: 8, nextlevel: 67 }
    },
    {
      id: '2',
      title: 'Stellar Groove',
      duration: '3:45',
      status: 'playing',
      commentary: 'This track features a 808 pattern inspired by classic trap but with spacey elements. I recorded the synth line on an analog synth and processed it through various pedals.',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      reactions: { headnod: 78, bass: 124, barz: 22, nextlevel: 56 }
    },
    {
      id: '3',
      title: 'Orbit',
      duration: '2:56',
      status: 'upcoming',
      commentary: 'For Orbit, I experimented with unusual time signatures and polyrhythms. The main drum pattern is in 7/8 while the melody follows a more traditional 4/4 structure.',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      reactions: { headnod: 0, bass: 0, barz: 0, nextlevel: 0 }
    },
    {
      id: '4',
      title: 'Space Drift (feat. Echo Valley)',
      duration: '4:12',
      status: 'upcoming',
      commentary: 'This collaboration with Echo Valley combines our styles in a unique way. We recorded the vocals in my home studio and then processed them with various effects to create that spacey vibe.',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      reactions: { headnod: 0, bass: 0, barz: 0, nextlevel: 0 }
    }
  ],
  chat: [
    { id: '1', user: 'MusicFan22', message: 'The bassline on Stellar Groove is incredible!', time: '8:12 PM' },
    { id: '2', user: 'BeatMaker', message: 'What synth are you using for that lead?', time: '8:15 PM' },
    { id: '3', user: 'JuliusTaylor', message: 'Thanks everyone for joining! The lead is from Arturia Pigments.', time: '8:17 PM', isHost: true },
    { id: '4', user: 'WavyProducer', message: 'Can\'t wait to hear Orbit, that description sounds amazing', time: '8:20 PM' }
  ]
};

const ListeningParty = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(1); // Index of the "playing" track
  const [chatMessage, setChatMessage] = useState('');
  const [audio] = useState(new Audio(partyData.tracks[currentTrackIndex].audioUrl));
  
  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  // Handle mute/unmute
  const toggleMute = () => {
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audio]);
  
  // Send chat message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // In a real app, this would send the message to a backend service
    console.log('Sending message:', chatMessage);
    
    // Clear the input
    setChatMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content - 2/3 width on large screens */}
            <div className="lg:col-span-2 space-y-8">
              {/* Party header with cover image */}
              <div className="relative rounded-xl overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src={partyData.cover} 
                    alt={partyData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                      <img 
                        src={partyData.artistImage} 
                        alt={partyData.artistName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-white">{partyData.title}</h1>
                      <p className="text-white/80">Hosted by {partyData.artistName}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-white/80">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{partyData.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{partyData.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{partyData.attendees} attending</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gift size={16} />
                      <span>Unlock: {partyData.exclusive}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="p-6 rounded-xl border border-border/50 bg-card/50">
                <h2 className="text-xl font-semibold mb-2">About this listening party</h2>
                <p className="text-muted-foreground">{partyData.description}</p>
              </div>
              
              {/* Now Playing & Controls */}
              <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Now Playing</h2>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={toggleMute}
                      className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <button 
                      onClick={togglePlay}
                      className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                    >
                      {isPlaying ? (
                        <PauseCircle size={32} className="text-primary" />
                      ) : (
                        <PlayCircle size={32} className="text-primary" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium">{partyData.tracks[currentTrackIndex].title}</h3>
                  <p className="text-sm text-muted-foreground">Track {currentTrackIndex + 1} of {partyData.tracks.length}</p>
                </div>
                
                <div className="bg-card p-4 rounded-lg mb-6">
                  <h4 className="text-sm font-medium text-primary mb-2">Producer Commentary</h4>
                  <p className="text-sm text-muted-foreground italic">
                    "{partyData.tracks[currentTrackIndex].commentary}"
                  </p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">React to this track</h4>
                  <MusicReactions 
                    initialReactions={partyData.tracks[currentTrackIndex].reactions} 
                    variant="horizontal"
                  />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Tracklist</h4>
                  <div className="space-y-2">
                    {partyData.tracks.map((track, index) => (
                      <div 
                        key={track.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          index === currentTrackIndex 
                            ? 'bg-primary/10 border border-primary/30' 
                            : track.status === 'played' 
                              ? 'bg-muted/20' 
                              : 'bg-card'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="w-6 text-center text-muted-foreground">{index + 1}</span>
                          <div className="ml-3">
                            <p className="font-medium">{track.title}</p>
                            <p className="text-xs text-muted-foreground">{track.duration}</p>
                          </div>
                        </div>
                        {index === currentTrackIndex && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary text-primary-foreground">
                            PLAYING
                          </span>
                        )}
                        {track.status === 'played' && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            PLAYED
                          </span>
                        )}
                        {track.status === 'upcoming' && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                            UPCOMING
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar - 1/3 width on large screens */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Live Chat */}
                <div className="rounded-xl border border-border bg-card/50 flex flex-col h-[600px]">
                  <div className="p-4 border-b border-border flex justify-between items-center">
                    <h3 className="font-medium">Live Chat</h3>
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                      {partyData.attendees} Watching
                    </span>
                  </div>
                  
                  <div className="p-4 overflow-y-auto flex-1 space-y-4">
                    {partyData.chat.map((message) => (
                      <div key={message.id} className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${message.isHost ? 'text-primary' : ''}`}>
                            {message.user} {message.isHost && '(Host)'}
                          </span>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-sm mt-1">{message.message}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-border mt-auto">
                    <form onSubmit={sendMessage} className="flex items-center gap-2">
                      <input 
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      <button 
                        type="submit"
                        className="p-2 rounded-md bg-primary text-primary-foreground"
                      >
                        <MessageCircle size={18} />
                      </button>
                    </form>
                  </div>
                </div>
                
                {/* Share */}
                <div className="p-4 rounded-xl border border-border bg-card/50">
                  <h3 className="font-medium mb-4">Share this listening party</h3>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 p-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors">
                      <Share2 size={16} />
                      <span>Copy Link</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 p-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors">
                      <span>Tweet</span>
                    </button>
                  </div>
                </div>
                
                {/* Unlock exclusive content */}
                <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
                  <h3 className="font-medium mb-2">Unlock Exclusive Content</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Stay until the end of the listening party to unlock this exclusive content:
                  </p>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
                    <Gift size={24} className="text-primary" />
                    <div>
                      <p className="font-medium">{partyData.exclusive}</p>
                      <p className="text-xs text-muted-foreground">Available after all tracks are played</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListeningParty;
