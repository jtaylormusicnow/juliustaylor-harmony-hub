
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Music } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  website: string | null;
}

interface Microsite {
  id: string;
  user_id: string;
  featured_song_url: string | null;
  featured_song_title: string | null;
  featured_song_artist: string | null;
  theme: string;
  custom_links: any[] | null;
}

const MicroSite = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [microsite, setMicrosite] = useState<Microsite | null>(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const { toast } = useToast();
  
  useEffect(() => {
    fetchMicrosite();
  }, [username]);

  const fetchMicrosite = async () => {
    if (!username) return;
    
    try {
      setLoading(true);
      
      // Fetch profile by username
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();
        
      if (profileError) throw profileError;
      
      // Fetch microsite data
      const { data: micrositeData, error: micrositeError } = await supabase
        .from('microsites')
        .select('*')
        .eq('user_id', profileData.id)
        .single();
        
      if (micrositeError && micrositeError.code !== 'PGRST116') throw micrositeError;
      
      setProfile(profileData);
      setMicrosite(micrositeData || null);
    } catch (error: any) {
      console.error('Error fetching microsite:', error.message);
      toast({
        title: "Error",
        description: "Could not load microsite. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Microsite Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The microsite you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          to="/"
          className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 flex items-center"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center bg-background"
      style={{ 
        backgroundImage: microsite?.theme === 'gradient' 
          ? 'linear-gradient(135deg, hsl(240, 50%, 10%), hsl(240, 50%, 30%))' 
          : undefined 
      }}
    >
      <header className="w-full max-w-xl px-6 py-8 flex justify-between items-center">
        <Link 
          to="/"
          className="p-2 rounded-full bg-background/10 backdrop-blur-sm hover:bg-background/20"
        >
          <ArrowLeft size={24} />
        </Link>
      </header>
      
      <main className="flex-1 w-full max-w-xl px-6 pb-20">
        <div className="flex flex-col items-center text-center mb-10">
          <img 
            src={profile.avatar_url || `https://api.dicebear.com/7.x/personas/svg?seed=${profile.id}`}
            alt={profile.username}
            className="w-32 h-32 rounded-full object-cover border-4 border-background mb-4"
          />
          
          <h1 className="text-3xl font-bold mb-2">
            {profile.full_name || `@${profile.username}`}
          </h1>
          
          <p className="text-muted-foreground mb-4">
            @{profile.username}
          </p>
          
          {profile.bio && (
            <p className="mb-6 max-w-md">
              {profile.bio}
            </p>
          )}
        </div>
        
        {microsite?.featured_song_url && (
          <div className="bg-card border border-border rounded-xl p-6 mb-8 w-full">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Music className="mr-2" size={20} />
              Featured Track
            </h2>
            
            <div className="aspect-video">
              <iframe 
                src={microsite.featured_song_url}
                title={microsite.featured_song_title || "Featured music"}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
            
            {(microsite.featured_song_title || microsite.featured_song_artist) && (
              <div className="mt-3">
                {microsite.featured_song_title && (
                  <p className="font-semibold">{microsite.featured_song_title}</p>
                )}
                {microsite.featured_song_artist && (
                  <p className="text-muted-foreground">{microsite.featured_song_artist}</p>
                )}
              </div>
            )}
          </div>
        )}
        
        <div className="space-y-3 w-full">
          {profile.website && (
            <a 
              href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 bg-card hover:bg-card/90 border border-border rounded-xl text-center font-medium transition-colors flex items-center justify-center"
            >
              <ExternalLink size={18} className="mr-2" />
              Website
            </a>
          )}
          
          <Link
            to="/feed"
            className="block w-full py-4 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-center font-medium transition-colors"
          >
            Open App
          </Link>
          
          {microsite?.custom_links && microsite.custom_links.length > 0 && (
            microsite.custom_links.map((link: any, index: number) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 bg-card hover:bg-card/90 border border-border rounded-xl text-center font-medium transition-colors"
              >
                {link.title}
              </a>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default MicroSite;
