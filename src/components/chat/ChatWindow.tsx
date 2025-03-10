import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import Avatar from '../ui/Avatar';
import EncryptionIndicator from '../features/EncryptionIndicator';
import { Phone, Video, MoreVertical, PlusCircle, Search, ShieldCheck, Lock } from 'lucide-react';
import { IoCall } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'file' | 'voice';
  media?: string;
};

type ChatWindowProps = {
  contactName: string;
  contactStatus?: 'online' | 'offline' | 'away' | 'busy';
  messages: Message[];
  isEncrypted?: boolean;
  isGroup?: boolean;
  onSendMessage: (content: string, type: 'text' | 'image' | 'file' | 'voice') => void;
};

const ChatWindow: React.FC<ChatWindowProps> = ({
  contactName,
  contactStatus = 'online',
  messages,
  isEncrypted = true,
  isGroup = false,
  onSendMessage
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEncryptionInfo, setShowEncryptionInfo] = useState(false);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-bg-primary">
      {/* Chat Header */}
      <div className="p-4 h-20 border-b border-text-primary-5 flex justify-between items-center shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <Avatar text={contactName} status={contactStatus} />
          <div>
            <h3 className="font-semibold text-text-primary">{contactName}</h3>
            <div className="flex items-center gap-2">
              <p className="text-sm text-text-primary-30">
                {contactStatus === 'online' ? 'Online' : 
                 contactStatus === 'away' ? 'Away' : 
                 contactStatus === 'busy' ? 'Busy' : 'Offline'}
              </p>
              
              {/* Encryption Indicator */}
              {isEncrypted && (
                <div 
                  className="flex items-center gap-1 text-xs text-accent-primary cursor-pointer"
                  onClick={() => setShowEncryptionInfo(!showEncryptionInfo)}
                >
                  <Lock size={12} />
                  <span>End-to-End Encrypted</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-accent-primary-10 text-text-primary hover:text-accent-primary transition">
            <IoCall size={18} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-accent-primary-10 text-text-primary hover:bg-accent-primary/10 hover:text-accent-primary transition">
            <IoVideocam size={18} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-accent-primary-10 text-text-primary hover:bg-accent-primary/10 hover:text-accent-primary transition">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
      
      {/* Encryption Info Panel */}
      {showEncryptionInfo && (
        <div className="p-3 bg-accent-primary/10 border-b border-accent-primary/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary">
            <ShieldCheck size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-text-primary">This conversation is end-to-end encrypted. Only participants can view the content.</p>
            <button className="text-xs text-accent-primary mt-1">Learn More</button>
          </div>
          <button 
            className="text-text-secondary hover:text-text-primary"
            onClick={() => setShowEncryptionInfo(false)}
          >
            ×
          </button>
        </div>
      )}
      
      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto bg-bg-primary/30 flex flex-col gap-6">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            showAvatar={true}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;