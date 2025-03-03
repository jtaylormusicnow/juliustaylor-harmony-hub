
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Globe, 
  Music, 
  Disc3 
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MusicPlayer from '../components/ui/MusicPlayer';

// Mock artist data
const artistData = {
  id: '1',
  name: 'Lunar Waves',
  image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  coverImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
  bio: 'Lunar Waves is an indie electronic artist known for blending atmospheric soundscapes with driving beats. With roots in both classical training and digital production, they create music that bridges emotional depth with danceable rhythms.',
  location: 'Los Angeles, CA',
  genres: ['Electronic', 'Indie', 'Lo-Fi'],
  social: {
    instagram: 'https://instagram.com/lunarwaves',
    twitter: 'https://twitter.com/lunarwaves',
    facebook: 'https://facebook.com/lunarwaves',
    youtube: 'https://youtube.com/lunarwaves',
    website: 'https://lunarwaves.com'
  },
  featuredTrack: {
    title: 'Midnight Memories',
    cover: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  stats: {
    followers: 3452,
    plays: 24891
  },
  externalPlatforms: [
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/artist/example'
    },
    {
      name: 'Apple Music',
      url: 'https://music.apple.com/artist/example'
    },
    {
      name: 'SoundCloud',
      url: 'https://soundcloud.com/example'
    }
  ]
};

const Artist = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState(artistData);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    // In a real app, you would fetch the artist based on the ID
    // Example: fetchArtist(id).then(data => setArtist(data));
  }, [id]);
  
  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${artist.name} on JuliusTaylor Music Hub`,
        text: `Listen to ${artist.name}'s music on JuliusTaylor Music Hub`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with Cover Image */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background z-10" />
          <img
            src={artist.coverImage}
            alt={`${artist.name} cover`}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <Link to="/artists" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Artists</span>
          </Link>
          
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-12">
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background shadow-xl">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
                {artist.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {artist.genres.map((genre, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 text-xs rounded-full glassmorphism text-white"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-white/80 text-sm mb-4">
                <span className="inline-flex items-center">
                  <Disc3 size={14} className="mr-1" />
                  {artist.stats.followers.toLocaleString()} Followers
                </span>
                <span className="inline-flex items-center ml-4">
                  <Music size={14} className="mr-1" />
                  {artist.stats.plays.toLocaleString()} Plays
                </span>
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={shareProfile}
                className="p-2 rounded-full glassmorphism text-white hover:bg-white/20 transition-colors"
                aria-label="Share profile"
              >
                <Share2 size={20} />
              </button>
              {artist.social.instagram && (
                <a 
                  href={artist.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glassmorphism text-white hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
              {artist.social.twitter && (
                <a 
                  href={artist.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glassmorphism text-white hover:bg-white/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              )}
              {artist.social.facebook && (
                <a 
                  href={artist.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glassmorphism text-white hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              )}
              {artist.social.youtube && (
                <a 
                  href={artist.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glassmorphism text-white hover:bg-white/20 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              )}
              {artist.social.website && (
                <a 
                  href={artist.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glassmorphism text-white hover:bg-white/20 transition-colors"
                  aria-label="Website"
                >
                  <Globe size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Artist Bio & Featured Track */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">About {artist.name}</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">{artist.bio}</p>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Listen on</h3>
                <div className="flex flex-wrap gap-4">
                  {artist.externalPlatforms.map((platform, index) => (
                    <a
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      {platform.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Featured Track</h2>
              <MusicPlayer 
                title={artist.featuredTrack.title}
                artist={artist.name}
                cover={artist.featuredTrack.cover}
                audioSrc={artist.featuredTrack.audioSrc}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Want to showcase your music like {artist.name}?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
            Create your artist profile on JuliusTaylor Music Hub and start sharing your music with our community today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Create Artist Profile
            </Link>
            <Link 
              to="/learn-more" 
              className="px-8 py-3 rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Artist;
