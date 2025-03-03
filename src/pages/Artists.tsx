
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Music } from 'lucide-react';
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
