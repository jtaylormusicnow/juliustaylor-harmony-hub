
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Settings, Edit, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            {/* Cover image */}
            <div className="h-48 bg-gradient-to-r from-primary/20 to-blue/20 relative">
              <Button variant="outline" size="sm" className="absolute top-4 right-4">
                <Edit size={16} className="mr-2" />
                Edit Cover
              </Button>
            </div>
            
            {/* Profile header */}
            <div className="px-6 pb-6 pt-16 relative">
              {/* Profile picture */}
              <div className="absolute -top-12 left-6 border-4 border-card rounded-full overflow-hidden">
                <img 
                  src={`https://api.dicebear.com/7.x/personas/svg?seed=${user?.id}`}
                  alt="Profile" 
                  className="w-24 h-24 bg-muted"
                />
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                  </h1>
                  <p className="text-muted-foreground">@{user?.email?.split('@')[0] || 'username'}</p>
                </div>
                
                <div className="flex gap-2">
                  <Link to="/mysite">
                    <Button variant="outline" size="sm">
                      View My Site
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => signOut()}>
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
              
              {/* Bio */}
              <div className="mt-6">
                <p className="text-muted-foreground">
                  Add your bio here. Tell people about yourself, your music, and what inspires you.
                </p>
              </div>
              
              {/* Stats */}
              <div className="mt-6 flex gap-6 border-t border-border pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
              </div>
            </div>
            
            {/* Featured content section */}
            <div className="px-6 py-6 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Featured Music</h2>
                <Button variant="outline" size="sm">
                  <Edit size={16} className="mr-2" />
                  Add Music
                </Button>
              </div>
              
              <div className="p-12 border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-4">
                  You haven't added any featured music yet
                </p>
                <Button>Add Featured Song</Button>
              </div>
            </div>
            
            {/* Recent posts (empty state) */}
            <div className="px-6 py-6 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Posts</h2>
                <Link to="/create">
                  <Button variant="outline" size="sm">
                    Create New Post
                  </Button>
                </Link>
              </div>
              
              <div className="p-12 border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-4">
                  You haven't posted any content yet
                </p>
                <Link to="/create">
                  <Button>Create Your First Post</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
