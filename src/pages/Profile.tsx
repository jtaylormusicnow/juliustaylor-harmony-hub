
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Microsite, transformMicrositeData } from '@/types/microsite';

const Profile = () => {
  const { user, isLoading: authLoading } = useAuth();
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
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Get profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileError) throw profileError;
        
        setProfile(profileData);
        
        // Get microsite data
        const { data: micrositeData, error: micrositeError } = await supabase
          .from('microsites')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (micrositeError && micrositeError.code !== 'PGRST116') throw micrositeError;
        
        if (micrositeData) {
          setMicrosite(transformMicrositeData(micrositeData));
        }
        
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (!authLoading && user) {
      fetchProfileData();
    }
  }, [user, authLoading]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading profile...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
            <p>There was an error loading your profile. Please try again later.</p>
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-8">
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <div className="mb-4 md:mb-0 md:mr-6">
                {profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.full_name || 'User'} 
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-2xl text-gray-600">
                      {(profile.full_name || 'User').charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-1">{profile.full_name || 'No Name'}</h2>
                <p className="text-muted-foreground mb-3">@{profile.username || 'username'}</p>
                
                {profile.bio && (
                  <p className="mb-3">{profile.bio}</p>
                )}
                
                {profile.website && (
                  <a 
                    href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {profile.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
              
              <button className="mt-4 md:mt-0 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Microsite</h2>
            
            <div>
              <p className="mb-4">
                Your public microsite URL: <a href={`/user/${profile.username}`} className="text-primary hover:underline">{window.location.origin}/user/{profile.username}</a>
              </p>
              
              <div className="flex justify-between">
                <h3 className="font-medium">Microsite Theme: {microsite.theme || 'Default'}</h3>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Edit Microsite
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
