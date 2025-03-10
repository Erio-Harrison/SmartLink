import React from 'react';
import Avatar from '../ui/Avatar';
import { type Message } from './ChatWindow';
import { Check, CheckCheck, Image, File, Mic } from 'lucide-react';

type MessageBubbleProps = {
  message: Message;
  showAvatar?: boolean;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  showAvatar = true
}) => {
  const isIncoming = message.sender === 'other';
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Message status icon
  const StatusIcon = () => {
    if (message.status === 'sent') return <Check size={14} />;
    if (message.status === 'delivered') return <CheckCheck size={14} />;
    if (message.status === 'read') return <CheckCheck size={14} className="text-accent-primary" />;
    return null;
  };
  
  // Render different message types
  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="relative rounded-lg overflow-hidden">
            <img src={message.media} alt="Shared image" className="max-w-xs rounded-lg" />
          </div>
        );
      case 'file':
        return (
          <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-primary/20 text-accent-primary">
              <File size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary font-medium truncate">{message.content}</p>
              <p className="text-sm text-text-secondary">文件</p>
            </div>
          </div>
        );
      case 'voice':
        return (
          <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-primary/20 text-accent-primary">
              <Mic size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="w-36 h-8 bg-white/10 rounded-full overflow-hidden">
                {/* Voice waveform placeholder */}
                <div className="h-full flex items-center justify-around px-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-accent-primary"
                      style={{ 
                        height: `${Math.random() * 100}%`,
                        opacity: isIncoming ? 0.7 : 1
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-text-secondary mt-1">0:12</p>
            </div>
          </div>
        );
      default:
        return (
          <p
            className={
              isIncoming ? 'text-text-primary' : 'text-white'
            }
          >
            {message.content}
          </p>
        );
    }
  };

  return (
    <div className={`max-w-[80%] flex ${isIncoming ? 'self-start' : 'self-end flex-row-reverse'}`}>
      {showAvatar && (
        <div className={`${isIncoming ? 'mr-3' : 'ml-3'}`}>
          <Avatar 
            size="sm" 
            text={isIncoming ? 'Other' : 'Me'} 
            status={isIncoming ? 'online' : undefined}
          />
        </div>
      )}
      
      <div className="flex flex-col">
        <div 
          className={`
            p-3 rounded-2xl relative
            ${isIncoming 
              ? 'bg-bg-tertiary' 
              : 'bg-accent-primary'
            }
          `}
        >
          {renderMessageContent()}
        </div>
        
        <div className={`flex items-center mt-1 text-xs text-text-primary-30 ${isIncoming ? 'self-start' : 'self-end'}`}>
          <span>{formatTime(message.timestamp)}</span>
          {!isIncoming && message.status && (
            <span className="ml-1">
              <StatusIcon />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;