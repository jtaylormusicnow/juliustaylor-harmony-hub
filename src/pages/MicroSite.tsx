
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Microsite, transformMicrositeData } from '@/types/microsite';

const MicroSite = () => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [microsite, setMicrosite] = useState<Microsite>({
    id: '',
    user_id: '',
    theme: 'default',
    custom_links: [],
    featured_song_url: '',
    featured_song_title: '',
    featured_song_artist: '',
    created_at: '',
    updated_at: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        
        // If username is provided, get profile by username
        if (username) {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .single();
            
          if (profileError) throw profileError;
          if (!profileData) throw new Error('Profile not found');
          
          setProfile(profileData);
          
          // Get microsite data for this profile
          const { data: micrositeData, error: micrositeError } = await supabase
            .from('microsites')
            .select('*')
            .eq('user_id', profileData.id)
            .single();
            
          if (micrositeError && micrositeError.code !== 'PGRST116') throw micrositeError;
          
          if (micrositeData) {
            setMicrosite(transformMicrositeData(micrositeData));
          }
        }
        
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, [username]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading microsite...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
            <p>The user you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="mb-6">
              {profile.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.full_name || 'User'} 
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary"
                />
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto bg-gray-300 flex items-center justify-center">
                  <span className="text-4xl text-gray-600">
                    {(profile.full_name || 'User').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{profile.full_name || 'User'}</h1>
            <p className="text-lg text-muted-foreground mb-4">@{profile.username}</p>
            
            {profile.bio && (
              <p className="mb-6 max-w-lg mx-auto">{profile.bio}</p>
            )}
            
            {profile.website && (
              <a 
                href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-primary hover:underline mb-6"
              >
                {profile.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
          
          {microsite.featured_song_url && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-xl font-semibold mb-4">Featured Track</h2>
              <div>
                <h3 className="font-medium">{microsite.featured_song_title || 'Untitled Track'}</h3>
                {microsite.featured_song_artist && (
                  <p className="text-sm text-muted-foreground mb-3">by {microsite.featured_song_artist}</p>
                )}
                <audio 
                  controls 
                  className="w-full"
                  src={microsite.featured_song_url}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}
          
          {microsite.custom_links && microsite.custom_links.length > 0 && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Links</h2>
              <div className="space-y-3">
                {microsite.custom_links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-4 rounded-lg border border-border hover:bg-secondary/10 transition-colors text-center"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MicroSite;
