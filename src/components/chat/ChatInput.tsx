import React, { useState, useRef } from 'react';
import { Smile, PaperclipIcon, Mic, Send, Image } from 'lucide-react';
import { RiAttachmentLine } from "react-icons/ri";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { PiPaperPlaneTiltFill } from "react-icons/pi";

type ChatInputProps = {
  onSendMessage: (content: string, type: 'text' | 'image' | 'file' | 'voice') => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle sending a message
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, 'text');
      setMessage('');
    }
  };
  
  // Handle pressing Enter to send
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Trigger file input click
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Logic for handling file upload would go here
      // For now, we'll just use the filename as message content
      onSendMessage(file.name, file.type.startsWith('image/') ? 'image' : 'file');
    }
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  // Handle voice recording
  const handleVoiceClick = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      // End recording and send voice message
      onSendMessage('Voice message', 'voice');
    }
    // In a real app, you'd start/stop recording here
  };

  return (
    <div className="p-4 border-t-[1.5px] border-text-primary-5">
      <div className="flex items-center gap-3 relative">
        {/* Emoji Button */}
        <button className="text-text-primary hover:text-accent-primary transition">
          <MdOutlineEmojiEmotions size={22} />
        </button>
        <button 
          className="text-text-primary hover:text-accent-primary transition mr-2"
          onClick={() => setShowAttachMenu(!showAttachMenu)}
        >
          <RiAttachmentLine size={22} />
        </button>
        
        {/* Attachment Button */}
        {/* <div className="relative">
          <button 
            className="text-text-primary hover:text-accent-primary transition"
            onClick={() => setShowAttachMenu(!showAttachMenu)}
          >
            <RiAttachmentLine size={22} />
          </button>
          
          {showAttachMenu && (
            <div className="absolute bottom-full left-0 mb-2 bg-bg-tertiary/90 backdrop-blur-md rounded-lg shadow-lg p-2 flex flex-col space-y-2 border border-white/5">
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-white/10 text-text-primary"
                onClick={() => {
                  setShowAttachMenu(false);
                  handleFileClick();
                }}
              >
                <Image size={18} />
                <span>Image</span>
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-white/10 text-text-primary"
                onClick={() => {
                  setShowAttachMenu(false);
                  handleFileClick();
                }}
              >
                <PaperclipIcon size={18} />
                <span>File</span>
              </button>
            </div>
          )}
        </div> */}
        
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        />
        
        {/* Text Input */}
        <div className="flex-1 border-2 border-bg-tertiary rounded-lg px-4 py-2 transition duration-300">
          <input 
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            onKeyDown={handleKeyDown}
            placeholder="Type a message..." 
            className="w-full bg-transparent outline-none border-none text-text-primary placeholder:text-text-primary-30"
          />
        </div>
        
        {/* Voice/Send Button */}
        {message.trim() ? (
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full text-text-primary hover:shadow-glow-sm transition"
            onClick={handleSend}
          >
            <PiPaperPlaneTiltFill size={18} />
          </button>
        ) : (
          <button 
            className={`
              w-10 h-10 flex items-center justify-center rounded-full
              ${isRecording 
                ? 'bg-accent-tertiary text-text-primary-30 animate-pulse' 
                : 'text-text-primary hover:text-accent-primary'
              }
              transition
            `}
            onClick={handleVoiceClick}
          >
            <Mic size={22} />
          </button>
        )}
      </div>
      
      {/* Recording Indicator */}
      {isRecording && (
        <div className="mt-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-tertiary animate-pulse"></span>
          <span className="text-sm text-accent-tertiary">Recording...</span>
          <span className="text-sm text-text-secondary">0:05</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;