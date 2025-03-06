
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Edit3, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
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

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [microsite, setMicrosite] = useState<Microsite | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [featuredSongUrl, setFeaturedSongUrl] = useState('');
  const [featuredSongTitle, setFeaturedSongTitle] = useState('');
  const [featuredSongArtist, setFeaturedSongArtist] = useState('');
  const { user, signOut } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isOwnProfile = !username;

  useEffect(() => {
    fetchProfile();
  }, [username, user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      let profileId;
      
      if (isOwnProfile) {
        if (!user) return;
        profileId = user.id;
      } else {
        // Fetch by username
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', username)
          .single();
          
        if (profileError) throw profileError;
        if (!profileData) throw new Error('Profile not found');
        
        profileId = profileData.id;
      }
      
      // Fetch profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .single();
        
      if (profileError) throw profileError;
      
      // Fetch microsite data
      const { data: microsite, error: micrositeError } = await supabase
        .from('microsites')
        .select('*')
        .eq('user_id', profileId)
        .single();
        
      if (micrositeError && micrositeError.code !== 'PGRST116') throw micrositeError;
      
      setProfile(profile);
      setMicrosite(microsite || null);
      
      // Set form values
      setFullName(profile.full_name || '');
      setBio(profile.bio || '');
      setWebsite(profile.website || '');
      
      if (microsite) {
        setFeaturedSongUrl(microsite.featured_song_url || '');
        setFeaturedSongTitle(microsite.featured_song_title || '');
        setFeaturedSongArtist(microsite.featured_song_artist || '');
      }
      
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
      toast({
        title: "Error",
        description: "Could not load profile. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          bio,
          website,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (profileError) throw profileError;
      
      // Update microsite
      const { error: micrositeError } = await supabase
        .from('microsites')
        .update({
          featured_song_url: featuredSongUrl,
          featured_song_title: featuredSongTitle,
          featured_song_artist: featuredSongArtist,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
        
      if (micrositeError) throw micrositeError;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      // Refresh profile data
      fetchProfile();
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const goToMicrosite = () => {
    window.open(`/user/${profile?.username}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-4 px-6 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full hover:bg-secondary/50"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">
              {isOwnProfile ? 'Your Profile' : `@${profile?.username}`}
            </h1>
          </div>
          
          {isOwnProfile && (
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 rounded-full hover:bg-secondary/50"
              >
                {isEditing ? <Settings size={24} /> : <Edit3 size={24} />}
              </button>
              <button 
                onClick={handleSignOut}
                className="p-2 rounded-full hover:bg-secondary/50"
              >
                <LogOut size={24} />
              </button>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 p-6 max-w-3xl mx-auto w-full">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : profile ? (
          <div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <div className="relative">
                <img 
                  src={profile.avatar_url || `https://api.dicebear.com/7.x/personas/svg?seed=${profile.id}`}
                  alt={profile.username}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Bio
                      </label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        placeholder="Tell people about yourself"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Website
                      </label>
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-1">
                      {profile.full_name || `@${profile.username}`}
                    </h2>
                    <p className="text-muted-foreground mb-3">
                      @{profile.username}
                    </p>
                    
                    {profile.bio && (
                      <p className="mb-4">{profile.bio}</p>
                    )}
                    
                    {profile.website && (
                      <a 
                        href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center justify-center sm:justify-start mb-4"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        {profile.website}
                      </a>
                    )}
                  </>
                )}
                
                {isOwnProfile && !isEditing && (
                  <button 
                    onClick={goToMicrosite}
                    className="px-4 py-2 mt-2 rounded-lg bg-secondary hover:bg-secondary/90 transition-colors inline-flex items-center"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View your micro-site
                  </button>
                )}
              </div>
            </div>
            
            {isEditing && (
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Featured Music</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Featured Song URL
                    </label>
                    <input
                      type="text"
                      value={featuredSongUrl}
                      onChange={(e) => setFeaturedSongUrl(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Spotify or SoundCloud embed URL"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Song Title
                    </label>
                    <input
                      type="text"
                      value={featuredSongTitle}
                      onChange={(e) => setFeaturedSongTitle(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Title of your song"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Artist
                    </label>
                    <input
                      type="text"
                      value={featuredSongArtist}
                      onChange={(e) => setFeaturedSongArtist(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Artist name"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {isEditing && (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 rounded-lg border border-border hover:bg-secondary/10"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProfile}
                  className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            )}
            
            {!isEditing && microsite && microsite.featured_song_url && (
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Featured Music</h3>
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
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
              {/* This will be implemented in the future */}
              <div className="text-center py-8 bg-card border border-border rounded-xl">
                <p className="text-muted-foreground">No posts yet</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold mb-2">Profile not found</h2>
            <p className="text-muted-foreground">
              The profile you're looking for doesn't exist or has been removed.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
