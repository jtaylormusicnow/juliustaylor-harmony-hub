
import React, { useState } from 'react';
import { Home, MessageSquare, PlusCircle, User, LogOut, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FeedHeaderProps {
  navigateToHome: () => void;
  navigateToMessages: () => void;
  navigateToCreatePost: () => void;
  navigateToProfile: (userId: string) => void;
  currentUserId?: string;
  hasNotifications?: boolean;
  notificationCount?: number;
  children?: React.ReactNode;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({
  navigateToHome,
  navigateToMessages,
  navigateToCreatePost,
  navigateToProfile,
  currentUserId,
  hasNotifications = false,
  notificationCount = 0,
  children
}) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const goToFeed = () => {
    navigate('/feed');
  };

  const goToDashboard = () => {
    navigate('/profile');
  };

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Button variant="ghost" onClick={navigateToHome} className="flex gap-1 items-center">
          <Home size={20} />
          <span className="sr-only md:not-sr-only">Home</span>
        </Button>

        <div className="flex items-center gap-2">
          {children}
          
          <Button variant="ghost" onClick={navigateToMessages} className="flex gap-1 items-center relative">
            <MessageSquare size={20} />
            <span className="sr-only md:not-sr-only">Messages</span>
            {hasNotifications && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 bg-red-500 text-white text-xs rounded-full">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </Button>
          
          <Button variant="default" onClick={navigateToCreatePost} className="flex gap-1 items-center">
            <PlusCircle size={20} />
            <span className="sr-only md:not-sr-only">Create</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex gap-1 items-center">
                <User size={20} />
                <span className="sr-only md:not-sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={goToFeed}>
                <Home className="mr-2 h-4 w-4" />
                <span>Feed</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={goToDashboard}>
                <User className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default FeedHeader;
