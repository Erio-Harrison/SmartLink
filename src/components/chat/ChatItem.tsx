import React from 'react';
import Avatar from '../ui/Avatar';
import { Pin } from 'lucide-react';
import { IoNotificationsOff } from "react-icons/io5";


type Chat = {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  pinned?: boolean;
  muted?: boolean;
};

type ChatItemProps = {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
};

const ChatItem: React.FC<ChatItemProps> = ({ chat, isSelected, onClick }) => {
  return (
    <div 
      className={`
        flex items-center gap-3 p-3 mx-2 rounded-xl cursor-pointer relative
        ${isSelected ? 'bg-accent-primary-10' : 'hover:bg-text-primary-5'}
        transition-colors duration-300
      `}
      onClick={onClick}
    >
      <Avatar text={chat.name} src={chat.avatar} status={chat.online ? 'online' : 'offline'} />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-text-primary truncate">{chat.name}</p>
            {chat.pinned && <Pin size={12} className="text-accent-primary" />}
          </div>
          <span className="text-xs text-text-primary-30">{chat.time}</span>
        </div>
        <div className="flex justify-between">
          <p className={"text-sm truncate text-text-primary-30"}>
            {chat.lastMessage}
          </p>
          {chat.unread > 0 && !chat.muted ? (
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary text-xs text-bg-primary font-semibold min-w-5 h-5 flex items-center justify-center rounded-full px-1.5">
              {chat.unread}
            </span>
          ) : chat.muted ? (
            <span className="w-5 h-5 flex items-center justify-center text-text-primary-30">
              <IoNotificationsOff />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
