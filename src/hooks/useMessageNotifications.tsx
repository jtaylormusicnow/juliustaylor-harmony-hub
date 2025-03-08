
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export const useMessageNotifications = () => {
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    // Check for unread messages on initial load
    const checkUnreadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('receiver_id', user.id)
          .is('read_at', null);

        if (error) throw error;
        
        setUnreadCount(data?.length || 0);
        setHasNewMessages(data && data.length > 0);
      } catch (error) {
        console.error('Error checking unread messages:', error);
      }
    };

    checkUnreadMessages();

    // Set up real-time listener for new messages
    const messageSubscription = supabase
      .channel('messages-channel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `receiver_id=eq.${user.id}`
      }, (payload) => {
        // Update notification state
        setHasNewMessages(true);
        setUnreadCount(prev => prev + 1);
        
        // Show toast notification
        toast({
          title: "New Message",
          description: "You have received a new message",
        });
      })
      .subscribe();

    return () => {
      // Clean up the subscription when component unmounts
      supabase.removeChannel(messageSubscription);
    };
  }, [user, toast]);

  const markMessagesAsRead = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('receiver_id', user.id)
        .is('read_at', null);
        
      if (error) throw error;
      
      setHasNewMessages(false);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  return {
    hasNewMessages,
    unreadCount,
    markMessagesAsRead
  };
};
