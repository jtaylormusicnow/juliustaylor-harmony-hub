
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Music, Headphones, Users, ShoppingBag } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FeaturedArtist from '../components/ui/FeaturedArtist';
import MusicPlayer from '../components/ui/MusicPlayer';
import BeatCard from '../components/ui/BeatCard';

// Mock data
const featuredArtists = [
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
];

const featuredBeats = [
  {
    id: '1',
    title: 'Euphoria',
    producedBy: 'JuliusTaylor',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    genre: 'Trap',
    bpm: 140,
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
  }
];

const Index = () => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setHeroLoaded(true);
    }, 300);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20 z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1526327760257-75f515c74478?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-nightclub-3389-large.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className={`inline-block px-4 py-2 rounded-full bg-primary/20 text-primary mb-6 transition-all duration-700 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>The Hub for Music Creators</span>
            
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 transition-all duration-700 delay-100 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Elevate Your Sound with <span className="text-gradient">JuliusTaylor</span>
            </h1>
            
            <p className={`text-xl text-white/80 mb-8 max-w-2xl transition-all duration-700 delay-200 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              A platform for artists, producers, and music lovers to connect, create, and collaborate. Join our community today.
            </p>
            
            <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Link 
                to="/beats" 
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Headphones size={18} />
                <span>Shop Beats</span>
              </Link>
              <Link 
                to="/artists" 
                className="px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Music size={18} />
                <span>Explore Artists</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Track */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-display font-bold">Featured Track</h2>
                <p className="text-muted-foreground max-w-xl">Explore the latest release from JuliusTaylor, setting new standards in modern production.</p>
              </div>
              
              <MusicPlayer 
                title="Cosmic Journey"
                artist="JuliusTaylor"
                cover="https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
                audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
              />
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="relative aspect-square max-w-[500px] mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Featured Track" 
                  className="rounded-2xl object-cover w-full h-full animate-fade-in shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 glassmorphism p-4 rounded-lg max-w-[240px] animate-slide-up">
                  <p className="text-sm">
                    "A perfect blend of atmospheric sounds and driving rhythms that captivates from start to finish."
                  </p>
                  <p className="text-sm font-medium mt-2">— Music Magazine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What We Offer</h2>
            <p className="text-muted-foreground">
              JuliusTaylor Music Hub provides everything you need to elevate your music career. From beat sales to artist promotion, we've got you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Music className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-medium mb-3">Beat Marketplace</h3>
              <p className="text-muted-foreground mb-4">
                Browse and purchase high-quality beats with flexible licensing options tailored to your needs.
              </p>
              <Link 
                to="/beats" 
                className="inline-flex items-center text-primary hover:text-primary/80"
              >
                <span>Shop Beats</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="p-8 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Users className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-medium mb-3">Artist Community</h3>
              <p className="text-muted-foreground mb-4">
                Connect with like-minded artists, showcase your music, and grow your audience through our platform.
              </p>
              <Link 
                to="/artists" 
                className="inline-flex items-center text-primary hover:text-primary/80"
              >
                <span>Explore Community</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="p-8 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <ShoppingBag className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-medium mb-3">Merchandise</h3>
              <p className="text-muted-foreground mb-4">
                Shop exclusive merchandise from JuliusTaylor and featured artists to support your favorite creators.
              </p>
              <Link 
                to="/merch" 
                className="inline-flex items-center text-primary hover:text-primary/80"
              >
                <span>Shop Merch</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Artists Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Artists</h2>
              <p className="text-muted-foreground max-w-xl">
                Discover talented artists on the JuliusTaylor platform. Listen to their latest tracks and follow their journey.
              </p>
            </div>
            <Link 
              to="/artists" 
              className="hidden md:flex items-center text-primary hover:text-primary/80"
            >
              <span>View All Artists</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredArtists.map((artist) => (
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
          
          <div className="flex md:hidden justify-center">
            <Link 
              to="/artists" 
              className="flex items-center text-primary hover:text-primary/80"
            >
              <span>View All Artists</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Beats Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Beats</h2>
              <p className="text-muted-foreground max-w-xl">
                Browse our selection of premium beats available for purchase. Find the perfect sound for your next project.
              </p>
            </div>
            <Link 
              to="/beats" 
              className="hidden md:flex items-center text-primary hover:text-primary/80"
            >
              <span>View All Beats</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredBeats.map((beat) => (
              <BeatCard
                key={beat.id}
                id={beat.id}
                title={beat.title}
                producedBy={beat.producedBy}
                cover={beat.cover}
                genre={beat.genre}
                bpm={beat.bpm}
                previewUrl={beat.previewUrl}
                licenses={beat.licenses}
              />
            ))}
          </div>
          
          <div className="flex md:hidden justify-center">
            <Link 
              to="/beats" 
              className="flex items-center text-primary hover:text-primary/80"
            >
              <span>View All Beats</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
            className="w-full h-full object-cover"
            alt="Background"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Share Your Music with the World?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join our community of artists and producers. Create your profile, upload your music, and connect with fans today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sign Up Free
              </Link>
              <Link 
                to="/learn-more" 
                className="px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
