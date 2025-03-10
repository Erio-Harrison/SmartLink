'use client';

import React, { useState, useEffect } from 'react';
import SideNav from '@/components/layout/SideNav';
import ChatList from '@/components/chat/ChatList';
import ChatWindow from '@/components/chat/ChatWindow';
import { type Message } from '@/components/chat/ChatWindow';
import { v4 as uuidv4 } from 'uuid';

// Sample chat data
const sampleChats = [
  { id: '1', name: 'John Doe', avatar: '', lastMessage: 'See you this afternoon!', time: '09:42', unread: 2, online: true, muted: true },
  { id: '2', name: 'Sarah Smith', avatar: '', lastMessage: 'Project docs sent', time: 'Yesterday', unread: 1, online: false },
  { id: '3', name: 'Project Team', avatar: '', lastMessage: 'Mike: Meeting canceled tomorrow', time: 'Yesterday', unread: 0, online: true },
  { id: '4', name: 'AI Assistant', avatar: '', lastMessage: 'Meeting reminder created', time: 'Monday', unread: 0, online: true },
];

// Sample message data
const sampleMessages: Record<string, Message[]> = {
  '1': [
    { id: '1-1', content: 'Hey John! Are you free this afternoon? I’d like to discuss the new project with you.', sender: 'other', timestamp: new Date(Date.now() - 3600000) },
    { id: '1-2', content: 'Hi, yeah I’m free. What time works for you?', sender: 'user', timestamp: new Date(Date.now() - 3500000), status: 'read' },
    { id: '1-3', content: 'How about 3 PM? I’ve booked Meeting Room A. Could you bring the prototype design doc we talked about last time?', sender: 'other', timestamp: new Date(Date.now() - 3400000) },
    { id: '1-4', content: '3 PM works for me. I’ll bring the doc. Anything else I should prep?', sender: 'user', timestamp: new Date(Date.now() - 3300000), status: 'read' },
    { id: '1-5', content: 'No need for anything else yet. Let’s discuss the initial plan first, then we’ll prep more later.', sender: 'other', timestamp: new Date(Date.now() - 3200000) },
  ],
  '2': [
    { id: '2-1', content: 'Hi Sarah, did you get the project timeline I sent?', sender: 'user', timestamp: new Date(Date.now() - 86400000), status: 'read' },
    { id: '2-2', content: 'Yes, looks good! I’ve forwarded it to the team.', sender: 'other', timestamp: new Date(Date.now() - 86000000) },
    { id: '2-3', content: 'Awesome, thanks! Let me know if they have any feedback.', sender: 'user', timestamp: new Date(Date.now() - 85500000), status: 'read' },
  ],
  '3': [
    { id: '3-1', content: 'Hey team, just a heads-up: the client meeting tomorrow is postponed.', sender: 'other', timestamp: new Date(Date.now() - 90000000) },
    { id: '3-2', content: 'Got it, thanks for the update!', sender: 'user', timestamp: new Date(Date.now() - 89500000), status: 'read' },
  ],
};

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats, setChats] = useState(sampleChats);
  const [messages, setMessages] = useState<Record<string, Message[]>>(sampleMessages);
  
  // Handle chat selection
  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    
    // Mark as read
    setChats(prev => 
      prev.map(chat => 
        chat.id === chatId ? { ...chat, unread: 0 } : chat
      )
    );
  };
  
  // Handle sending a message
  const handleSendMessage = (content: string, type: 'text' | 'image' | 'file' | 'voice') => {
    if (!selectedChatId) return;
    
    const newMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
      type
    };
    
    // Add message to state
    setMessages(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMessage]
    }));
    
    // Simulate message status change
    setTimeout(() => {
      setMessages(prev => {
        const updatedMessages = [...prev[selectedChatId]];
        const lastIndex = updatedMessages.length - 1;
        updatedMessages[lastIndex] = {
          ...updatedMessages[lastIndex],
          status: 'delivered'
        };
        return { ...prev, [selectedChatId]: updatedMessages };
      });
    }, 1000);
    
    // Simulate reply (except for AI Assistant)
    if (selectedChatId !== '4') {
      setTimeout(() => {
        const replyMessage: Message = {
          id: uuidv4(),
          content: 'Got it, I’ve received your message.',
          sender: 'other',
          timestamp: new Date(),
        };
        
        setMessages(prev => ({
          ...prev,
          [selectedChatId]: [...prev[selectedChatId], replyMessage]
        }));
        
        // Update last message and time if not current chat
        if (selectedChatId) {
          setChats(prev => 
            prev.map(chat => 
              chat.id === selectedChatId 
                ? { ...chat, lastMessage: content, time: 'Just now' } 
                : chat
            )
          );
        }
      }, 3000);
    }
  };
  
  // Default to first chat
  useEffect(() => {
    if (chats.length > 0 && !selectedChatId) {
      setSelectedChatId(chats[0].id);
    }
  }, [chats, selectedChatId]);

  return (
    <div className="flex h-screen">
      {/* Side Navigation */}
      <SideNav userName={''}/>
      
      {/* Chat List */}
      <ChatList 
        chats={chats}
        onSelectChat={handleSelectChat}
        selectedChatId={selectedChatId || undefined}
      />
      
      {/* Chat Window */}
      {selectedChatId ? (
        <div className="flex-1">
          <ChatWindow 
            contactName={chats.find(c => c.id === selectedChatId)?.name || ''}
            contactStatus={chats.find(c => c.id === selectedChatId)?.online ? 'online' : 'offline'}
            messages={messages[selectedChatId] || []}
            onSendMessage={handleSendMessage}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-bg-secondary">
          <div className="text-center text-text-secondary">
            <p className="text-xl mb-2">Select a chat to start messaging</p>
            <p>Or start a new conversation</p>
          </div>
        </div>
      )}
    </div>
  );
}