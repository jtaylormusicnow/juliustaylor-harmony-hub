
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Music, Calendar, Users, Headphones, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FeaturedArtist from '../components/ui/FeaturedArtist';

// Mock data - same as the featured artists from Index
const artists = [
  {
    id: '1',
    name: 'Lunar Waves',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Hip-Hop',
    songTitle: 'Midnight Memories',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    external: {
      spotify: 'https://spotify.com',
      apple: 'https://apple.com/music',
      youtube: 'https://youtube.com'
    }
  },
  {
    id: '2',
    name: 'Echo Valley',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'R&B',
    songTitle: 'Summer Breeze',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    external: {
      spotify: 'https://spotify.com',
      apple: 'https://apple.com/music'
    }
  },
  {
    id: '3',
    name: 'Synth Collective',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Electronic',
    songTitle: 'Digital Dreams',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    external: {
      spotify: 'https://spotify.com',
      youtube: 'https://youtube.com'
    }
  },
  {
    id: '4',
    name: 'Crimson Skies',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    genre: 'Lo-Fi',
    songTitle: 'Chill Vibes',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    external: {
      spotify: 'https://spotify.com'
    }
  },
  {
    id: '5',
    name: 'Urban Elements',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    genre: 'Urban',
    songTitle: 'City Nights',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    external: {
      spotify: 'https://spotify.com',
      youtube: 'https://youtube.com'
    }
  },
  {
    id: '6',
    name: 'Melody Makers',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    genre: 'Pop',
    songTitle: 'Summer Dreams',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    external: {
      spotify: 'https://spotify.com',
      apple: 'https://apple.com/music'
    }
  },
  {
    id: '7',
    name: 'Bass Collective',
    image: 'https://images.unsplash.com/photo-1526327760257-75f515c74478?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
    genre: 'Bass',
    songTitle: 'Deep Waves',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    external: {
      spotify: 'https://spotify.com',
      youtube: 'https://youtube.com'
    }
  },
  {
    id: '8',
    name: 'Future Sound',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    genre: 'Future Bass',
    songTitle: 'Neon Dreams',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    external: {
      spotify: 'https://spotify.com',
      apple: 'https://apple.com/music'
    }
  }
];

// Mock data for upcoming listening parties
const listeningParties = [
  {
    id: '1',
    title: 'Cosmic Journey EP Premiere',
    artistName: 'JuliusTaylor',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: 'June 15, 2024',
    time: '8:00 PM EST',
    description: 'Join JuliusTaylor for an exclusive first listen of the Cosmic Journey EP with live commentary on the production process.',
    attendees: 243,
    exclusive: 'Custom Drum Kit'
  },
  {
    id: '2',
    title: 'Summer Vibes Collection',
    artistName: 'Echo Valley',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: 'June 23, 2024',
    time: '7:00 PM EST',
    description: 'Echo Valley presents a collection of summer-inspired beats with detailed breakdowns of each track.',
    attendees: 187,
    exclusive: '30% Off Selected Beats'
  },
  {
    id: '3',
    title: 'Future Bass Masterclass',
    artistName: 'Synth Collective',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: 'July 5, 2024',
    time: '9:00 PM EST',
    description: 'Synth Collective breaks down their production techniques for their new Future Bass compilation.',
    attendees: 156,
    exclusive: 'Synth Presets Package'
  }
];

const ListeningPartyCard = ({ party }) => {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-border/50 bg-card/50 hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-video">
        <img 
          src={party.image} 
          alt={party.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-xl font-bold text-white">{party.title}</h3>
          <p className="text-white/80">by {party.artistName}</p>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span className="text-sm">{party.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span className="text-sm">{party.time}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">{party.description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <Users size={16} className="text-primary" />
              <span className="text-sm">{party.attendees} attending</span>
            </div>
            <div className="flex items-center gap-1">
              <Headphones size={16} className="text-primary" />
              <span className="text-sm font-medium">Exclusive: {party.exclusive}</span>
            </div>
          </div>
          
          <Link
            to={`/listening-party/${party.id}`}
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <span>Join Listening Party</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Artists = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with New Banner */}
      <section className="relative pt-32 pb-16 md:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10" />
          <img
            src="/lovable-uploads/d35ce910-7ebb-4e24-a8d2-a8459dc62021.png"
            alt="Artist Profile"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white">
              Discover Amazing <span className="text-gradient">Artists</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Explore our curated collection of talented musicians from around the world. Listen to their tracks and connect with them on your favorite platforms.
            </p>
          </div>
        </div>
      </section>
      
      {/* Listening Parties Section - NEW */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Upcoming Listening Parties
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Join exclusive live events where artists premiere new tracks with real-time commentary. React, engage, and unlock exclusive content.
              </p>
            </div>
            <Link 
              to="/listening-parties" 
              className="hidden md:flex items-center text-primary hover:text-primary/80"
            >
              <span>View All Events</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {listeningParties.map((party) => (
              <ListeningPartyCard key={party.id} party={party} />
            ))}
          </div>
          
          <div className="flex md:hidden justify-center">
            <Link 
              to="/listening-parties" 
              className="flex items-center text-primary hover:text-primary/80"
            >
              <span>View All Events</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Artists Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {artists.map((artist) => (
              <FeaturedArtist
                key={artist.id}
                id={artist.id}
                name={artist.name}
                image={artist.image}
                genre={artist.genre}
                songTitle={artist.songTitle}
                previewUrl={artist.previewUrl}
                external={artist.external}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Share Your Music?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community of artists and reach a wider audience. Create your profile, upload your music, and connect with fans today.
            </p>
            <Link 
              to="/signup" 
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center"
            >
              <span>Sign Up as Artist</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Artists;
