
import React, { createContext, useContext, ReactNode } from 'react';
import { useClerk, useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isLoading: boolean;
  isSignedIn: boolean | undefined;
  user: any;
  signIn: (provider: 'google' | 'facebook') => Promise<void>;
  signInWithCredentials: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signIn, signOut } = useClerk();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (provider: 'google' | 'facebook') => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: provider === 'google' 
          ? 'oauth_google'
          : 'oauth_facebook',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/'
      });
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        title: 'Authentication Error',
        description: 'Failed to sign in. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleSignInWithCredentials = async (email: string, password: string) => {
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      
      if (result.status === 'complete') {
        toast({
          title: 'Login Successful',
          description: 'Welcome back!'
        });
        navigate('/');
      } else {
        console.error('Login incomplete:', result);
        toast({
          title: 'Authentication Error',
          description: 'Failed to sign in. Please try again.',
          variant: 'destructive'
        });
      }
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast({
        title: 'Authentication Error',
        description: error?.errors?.[0]?.message || 'Failed to sign in. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out'
      });
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive'
      });
    }
  };

  const value = {
    isLoading: !isLoaded,
    isSignedIn,
    user,
    signIn: handleSignIn,
    signInWithCredentials: handleSignInWithCredentials,
    signOut: handleSignOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
