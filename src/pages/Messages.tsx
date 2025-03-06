
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Send, Smile, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read_at: string | null;
  profiles: Profile;
}

interface Conversation {
  profile: Profile;
  lastMessage: Message | null;
  unreadCount: number;
}

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.id);
      markMessagesAsRead(activeConversation.id);
    }
  }, [activeConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch messages where user is either sender or receiver
      const { data: sentMessages, error: sentError } = await supabase
        .from('messages')
        .select(`
          id,
          sender_id,
          receiver_id,
          content,
          created_at,
          read_at,
          profiles!messages_receiver_id_fkey (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('sender_id', user.id)
        .order('created_at', { ascending: false });
        
      if (sentError) throw sentError;
      
      const { data: receivedMessages, error: receivedError } = await supabase
        .from('messages')
        .select(`
          id,
          sender_id,
          receiver_id,
          content,
          created_at,
          read_at,
          profiles!messages_sender_id_fkey (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('receiver_id', user.id)
        .order('created_at', { ascending: false });
        
      if (receivedError) throw receivedError;
      
      // Combine and deduplicate conversations
      const allUserIds = new Set<string>();
      const allMessages = [...(sentMessages || []), ...(receivedMessages || [])];
      
      sentMessages?.forEach(msg => allUserIds.add(msg.receiver_id));
      receivedMessages?.forEach(msg => allUserIds.add(msg.sender_id));
      
      const conversationsList: Conversation[] = [];
      
      for (const userId of allUserIds) {
        if (userId === user.id) continue;
        
        // Find the user's profile data
        const sentMsg = sentMessages?.find(msg => msg.receiver_id === userId);
        const receivedMsg = receivedMessages?.find(msg => msg.sender_id === userId);
        
        const profile = sentMsg 
          ? sentMsg.profiles 
          : receivedMsg
            ? receivedMsg.profiles
            : null;
            
        if (!profile) continue;
        
        // Find the last message between users
        const messagesWithUser = allMessages.filter(
          msg => (msg.sender_id === userId && msg.receiver_id === user.id) || 
                (msg.sender_id === user.id && msg.receiver_id === userId)
        );
        
        const lastMessage = messagesWithUser.length > 0 
          ? messagesWithUser.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
          : null;
          
        // Count unread messages
        const unreadCount = messagesWithUser.filter(
          msg => msg.sender_id === userId && !msg.read_at
        ).length;
        
        conversationsList.push({
          profile,
          lastMessage,
          unreadCount
        });
      }
      
      // Sort by last message time
      conversationsList.sort((a, b) => {
        if (!a.lastMessage && !b.lastMessage) return 0;
        if (!a.lastMessage) return 1;
        if (!b.lastMessage) return -1;
        
        return new Date(b.lastMessage.created_at).getTime() - new Date(a.lastMessage.created_at).getTime();
      });
      
      setConversations(conversationsList);
    } catch (error: any) {
      console.error('Error fetching conversations:', error.message);
      toast({
        title: "Error",
        description: "Could not load conversations. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (otherUserId: string) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          sender_id,
          receiver_id,
          content,
          created_at,
          read_at,
          profiles!messages_sender_id_fkey (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error fetching messages:', error.message);
      toast({
        title: "Error",
        description: "Could not load messages. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const markMessagesAsRead = async (otherUserId: string) => {
    if (!user) return;
    
    try {
      // Mark messages from the other user as read
      const { error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('sender_id', otherUserId)
        .eq('receiver_id', user.id)
        .is('read_at', null);
        
      if (error) throw error;
      
      // Update local state
      setConversations(prev => 
        prev.map(conv => {
          if (conv.profile.id === otherUserId) {
            return { ...conv, unreadCount: 0 };
          }
          return conv;
        })
      );
    } catch (error: any) {
      console.error('Error marking messages as read:', error.message);
    }
  };

  const sendMessage = async () => {
    if (!user || !activeConversation || !newMessage.trim()) return;
    
    try {
      setSendingMessage(true);
      
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: activeConversation.id,
          content: newMessage.trim()
        });
        
      if (error) throw error;
      
      setNewMessage('');
      
      // Refresh messages
      fetchMessages(activeConversation.id);
      fetchConversations();
    } catch (error: any) {
      console.error('Error sending message:', error.message);
      toast({
        title: "Error",
        description: "Could not send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSendingMessage(false);
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatLastMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="py-4 px-6 border-b">
        <div className="flex items-center">
          {activeConversation ? (
            <>
              <button 
                onClick={() => setActiveConversation(null)}
                className="mr-4 p-2 rounded-full hover:bg-secondary/50"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center">
                {activeConversation.avatar_url ? (
                  <img 
                    src={activeConversation.avatar_url} 
                    alt={activeConversation.username}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                    <User size={24} />
                  </div>
                )}
                <div>
                  <p className="font-semibold">
                    {activeConversation.full_name || activeConversation.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    @{activeConversation.username}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-secondary/50"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-xl font-bold">Messages</h1>
            </>
          )}
        </div>
      </header>
      
      <main className="flex-1 flex overflow-hidden">
        {!activeConversation ? (
          <div className="w-full overflow-y-auto">
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Search messages"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : conversations.length > 0 ? (
                <div className="space-y-1">
                  {conversations.map(conversation => (
                    <div
                      key={conversation.profile.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-secondary/20 ${conversation.unreadCount > 0 ? 'bg-secondary/10' : ''}`}
                      onClick={() => setActiveConversation(conversation.profile)}
                    >
                      {conversation.profile.avatar_url ? (
                        <div className="relative">
                          <img 
                            src={conversation.profile.avatar_url} 
                            alt={conversation.profile.username}
                            className="w-12 h-12 rounded-full mr-3"
                          />
                          {conversation.unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mr-3">
                            <User size={24} />
                          </div>
                          {conversation.unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold truncate">
                            {conversation.profile.full_name || conversation.profile.username}
                          </p>
                          {conversation.lastMessage && (
                            <p className="text-xs text-muted-foreground">
                              {formatLastMessageTime(conversation.lastMessage.created_at)}
                            </p>
                          )}
                        </div>
                        {conversation.lastMessage ? (
                          <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'font-medium' : 'text-muted-foreground'}`}>
                            {conversation.lastMessage.sender_id === user?.id ? 'You: ' : ''}
                            {conversation.lastMessage.content}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            No messages yet
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start a conversation with someone!
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <p className="text-muted-foreground mb-2">No messages yet</p>
                  <p className="text-sm text-muted-foreground">
                    Send a message to start the conversation
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map(message => {
                    const isOwnMessage = message.sender_id === user?.id;
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isOwnMessage && (
                          <div className="flex-shrink-0 mr-3">
                            {message.profiles.avatar_url ? (
                              <img 
                                src={message.profiles.avatar_url} 
                                alt={message.profiles.username}
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                <User size={16} />
                              </div>
                            )}
                          </div>
                        )}
                        <div className={`max-w-[70%] ${isOwnMessage ? 'bg-primary text-primary-foreground' : 'bg-secondary'} rounded-2xl px-4 py-2`}>
                          <p>{message.content}</p>
                          <p className={`text-xs ${isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'} text-right mt-1`}>
                            {formatMessageTime(message.created_at)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-secondary/50">
                  <Smile size={24} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !sendingMessage) {
                      sendMessage();
                    }
                  }}
                />
                <button 
                  className={`p-2 rounded-full ${newMessage.trim() ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || sendingMessage}
                >
                  <Send size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
