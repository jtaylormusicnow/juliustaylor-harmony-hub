
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Edit, Globe, Share2, Music, ExternalLink, Instagram, Twitter, Facebook } from 'lucide-react';

const MicroSite = () => {
  const { user } = useAuth();
  const { username } = useParams();
  const isOwnProfile = !username; // If no username in params, we're viewing our own microsite
  
  const [isEditMode, setIsEditMode] = useState(false);

  // Placeholder data - in a real implementation, this would come from your database
  const profile = {
    name: isOwnProfile ? (user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Your Name') : (username || 'Artist Name'),
    username: isOwnProfile ? (user?.email?.split('@')[0] || 'username') : (username || 'artistname'),
    bio: "Music producer and beat maker specializing in lo-fi hip-hop and experimental electronic sounds. Based in Los Angeles.",
    links: [
      { icon: <Music size={16} />, label: "Spotify", url: "#" },
      { icon: <Music size={16} />, label: "SoundCloud", url: "#" },
      { icon: <Instagram size={16} />, label: "Instagram", url: "#" },
      { icon: <Twitter size={16} />, label: "Twitter", url: "#" },
    ],
    featuredTrack: {
      title: "Midnight Dreams",
      artist: "Your Artist Name",
      cover: "https://source.unsplash.com/random/500x500?album-cover"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Edit mode banner (only visible to the owner) */}
          {isOwnProfile && (
            <div className="mb-6 p-4 bg-secondary/10 border border-border rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-medium mb-1">Your Micro-Website</h3>
                <p className="text-sm text-muted-foreground">
                  This is how visitors will see your personal page
                </p>
              </div>
              <Button
                variant={isEditMode ? "default" : "outline"}
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? "Save Changes" : (
                  <>
                    <Edit size={16} className="mr-2" />
                    Edit Site
                  </>
                )}
              </Button>
            </div>
          )}
          
          {/* Microsite container */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            {/* Cover/Header */}
            <div className="h-32 bg-gradient-to-r from-primary/20 via-blue/10 to-green/10" />
            
            {/* Profile info */}
            <div className="px-8 pt-8 pb-6 text-center">
              <div className="w-24 h-24 mx-auto -mt-16 rounded-full border-4 border-card overflow-hidden bg-muted">
                <img 
                  src={`https://api.dicebear.com/7.x/personas/svg?seed=${profile.username}`}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {isEditMode ? (
                <input
                  type="text"
                  defaultValue={profile.name}
                  className="mt-4 text-2xl font-bold text-center w-full bg-transparent border-b border-border focus:outline-none focus:border-primary"
                />
              ) : (
                <h1 className="mt-4 text-2xl font-bold">{profile.name}</h1>
              )}
              
              <div className="flex items-center justify-center mt-1 space-x-1">
                <Globe size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">@{profile.username}</span>
              </div>
              
              {isEditMode ? (
                <textarea
                  defaultValue={profile.bio}
                  className="mt-4 text-sm text-muted-foreground text-center w-full bg-transparent border border-border rounded p-2 focus:outline-none focus:border-primary resize-none"
                  rows={3}
                />
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">{profile.bio}</p>
              )}
              
              {!isOwnProfile && (
                <div className="mt-6 flex justify-center gap-3">
                  <Button>Follow</Button>
                  <Button variant="outline">
                    <Share2 size={16} className="mr-2" />
                    Share
                  </Button>
                </div>
              )}
            </div>
            
            {/* Featured Music */}
            <div className="px-8 py-6 border-t border-border">
              <h2 className="font-medium mb-4">Featured Track</h2>
              
              {isEditMode ? (
                <div className="p-6 border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground mb-4">
                    Add your featured track from Spotify, SoundCloud, or upload directly
                  </p>
                  <Button>
                    <Music size={16} className="mr-2" />
                    Add Music
                  </Button>
                </div>
              ) : (
                <div className="flex items-center p-4 bg-secondary/5 rounded-lg">
                  <img 
                    src={profile.featuredTrack.cover}
                    alt={profile.featuredTrack.title}
                    className="w-16 h-16 rounded-md mr-4 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{profile.featuredTrack.title}</h3>
                    <p className="text-sm text-muted-foreground">{profile.featuredTrack.artist}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Play
                  </Button>
                </div>
              )}
            </div>
            
            {/* Links section */}
            <div className="px-8 py-6 border-t border-border">
              <h2 className="font-medium mb-4">Links</h2>
              
              {isEditMode ? (
                <div className="space-y-2">
                  {profile.links.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {link.icon}
                      <input
                        type="text"
                        defaultValue={link.label}
                        className="flex-1 p-2 bg-secondary/5 rounded-lg border border-border focus:outline-none focus:border-primary"
                      />
                      <input
                        type="text"
                        defaultValue={link.url}
                        className="flex-1 p-2 bg-secondary/5 rounded-lg border border-border focus:outline-none focus:border-primary"
                        placeholder="https://"
                      />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    + Add Link
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {profile.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-secondary/5 hover:bg-secondary/10 rounded-lg transition-colors"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                      <ExternalLink size={14} className="ml-auto text-muted-foreground" />
                    </a>
                  ))}
                </div>
              )}
            </div>
            
            {/* Content preview */}
            <div className="px-8 py-6 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium">Recent Content</h2>
                {!isEditMode && (
                  <Link to="/feed" className="text-sm text-primary">
                    View All
                  </Link>
                )}
              </div>
              
              <div className="p-12 border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-4">
                  No recent content to display
                </p>
                {isOwnProfile && (
                  <Link to="/create">
                    <Button>Create Your First Post</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MicroSite;
