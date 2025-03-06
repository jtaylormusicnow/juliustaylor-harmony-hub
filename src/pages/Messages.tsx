
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, Send, Mic, Image, Smile, MoreVertical, Phone, Video } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Placeholder data
const CONVERSATIONS = [
  {
    id: '1',
    name: 'Jane Cooper',
    avatar: 'https://source.unsplash.com/random/150x150?face-1',
    lastMessage: 'Hey, I loved your new track!',
    time: '2m ago',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Wade Warren',
    avatar: 'https://source.unsplash.com/random/150x150?face-2',
    lastMessage: 'When are you dropping the album?',
    time: '1h ago',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Esther Howard',
    avatar: 'https://source.unsplash.com/random/150x150?face-3',
    lastMessage: 'Can we collaborate on a beat?',
    time: '3h ago',
    unread: 0,
    online: true,
  },
  {
    id: '4',
    name: 'Cameron Williamson',
    avatar: 'https://source.unsplash.com/random/150x150?face-4',
    lastMessage: 'The mix sounds great!',
    time: '1d ago',
    unread: 0,
    online: false,
  },
];

const Messages = () => {
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState(CONVERSATIONS[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <div className="border-b border-border py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-display font-bold">Messages</h1>
          </div>
        </div>
        
        <div className="flex-1 flex">
          {/* Conversation list */}
          <div className="w-full sm:w-80 border-r border-border">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Search messages"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-13rem)]">
              <div className="p-2 space-y-1">
                {CONVERSATIONS.map((conversation) => (
                  <button
                    key={conversation.id}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeConversation.id === conversation.id
                        ? 'bg-primary/10'
                        : 'hover:bg-secondary/10'
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        {conversation.online && (
                          <span className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <p className="font-medium truncate">{conversation.name}</p>
                          <span className="text-xs text-muted-foreground ml-2 shrink-0">
                            {conversation.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-medium text-primary-foreground">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Chat area */}
          <div className="hidden sm:flex flex-1 flex-col">
            {activeConversation ? (
              <>
                {/* Chat header */}
                <div className="border-b border-border p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={activeConversation.avatar}
                      alt={activeConversation.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{activeConversation.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {activeConversation.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-secondary/10">
                      <Phone size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-secondary/10">
                      <Video size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-secondary/10">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Chat messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="flex flex-col items-center mb-8">
                    <p className="px-3 py-1 rounded-full bg-secondary/20 text-xs text-muted-foreground">
                      Today
                    </p>
                  </div>
                  
                  {/* Example message - You can replace with real implementation */}
                  <div className="flex justify-end mb-4">
                    <div className="max-w-[75%] bg-primary text-primary-foreground rounded-tl-lg rounded-tr-lg rounded-bl-lg p-3">
                      <p>Hey! How's it going?</p>
                      <span className="text-xs opacity-70 mt-1 block text-right">12:34 PM</span>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    <img
                      src={activeConversation.avatar}
                      alt={activeConversation.name}
                      className="w-8 h-8 rounded-full mr-2 self-end"
                    />
                    <div className="max-w-[75%] bg-secondary/20 rounded-tl-lg rounded-tr-lg rounded-br-lg p-3">
                      <p>{activeConversation.lastMessage}</p>
                      <span className="text-xs text-muted-foreground mt-1 block">12:36 PM</span>
                    </div>
                  </div>
                </ScrollArea>
                
                {/* Message input */}
                <div className="border-t border-border p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-secondary/10">
                      <Smile size={20} className="text-muted-foreground" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-secondary/10">
                      <Image size={20} className="text-muted-foreground" />
                    </button>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 py-2 px-4 bg-secondary/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    {message ? (
                      <button className="p-2 rounded-full bg-primary text-primary-foreground">
                        <Send size={20} />
                      </button>
                    ) : (
                      <button className="p-2 rounded-full hover:bg-secondary/10">
                        <Mic size={20} className="text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Send size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Your Messages</h3>
                <p className="text-muted-foreground max-w-sm">
                  Send private messages to other members of the JuliusTaylor community
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
