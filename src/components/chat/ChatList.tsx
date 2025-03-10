import React, { useState } from 'react';
import Avatar from '../ui/Avatar';
import { Search, Plus, Settings, ChevronDown, Pin, Filter } from 'lucide-react';
import { MdAdd } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import ChatItem from './ChatItem';

type ChatGroup = {
  id: string;
  name: string;
  collapsed?: boolean;
};

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
  groupId?: string; // 关联的分组ID
};

type ChatListProps = {
  chats: Chat[];
  groups?: ChatGroup[];
  onSelectChat: (chatId: string) => void;
  selectedChatId?: string;
};

const ChatList: React.FC<ChatListProps> = ({
  chats,
  groups = [],
  onSelectChat,
  selectedChatId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groupCollapse, setGroupCollapse] = useState<Record<string, boolean>>({});
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'pinned'>('all');

  const totalUnread = chats.reduce((acc, chat) => {
    if (chat.muted) return acc;   // Skip if muted
    return acc + chat.unread;
  }, 0);
  
  // 按分组整理聊天
  const getChatsInGroup = (groupId?: string) => {
    return chats.filter(chat => 
      (!groupId && !chat.groupId) || chat.groupId === groupId
    );
  };
  
  // 应用筛选器和搜索
  const filterChats = (chats: Chat[]) => {
    return chats.filter(chat => {
      // 先应用搜索
      if (searchTerm && !chat.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // 再应用筛选器
      if (filter === 'unread' && chat.unread === 0) return false;
      if (filter === 'pinned' && !chat.pinned) return false;
      
      return true;
    });
  };
  
  // 切换分组折叠状态
  const toggleGroupCollapse = (groupId: string) => {
    setGroupCollapse(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // 获取置顶的聊天
  const pinnedChats = filterChats(chats.filter(chat => chat.pinned));
  
  return (
    <div className="w-80 h-full bg-bg-primary flex flex-col border-r-[1.5px] border-text-primary-5">
      {/* Header */}
      <div className="p-5 h-20 border-b border-text-primary-5 flex justify-between items-center shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
        <h2 className="flex items-center text-lg font-semibold text-text-primary">
          Messages
          {totalUnread > 0 && (
            <span className="ml-2 flex items-center justify-center h-5 p-2 rounded-full bg-accent-primary-10 text-xs font-medium text-text-primary">
              {totalUnread}
            </span>
          )}
        </h2>
        <div className="flex space-x-2">
          {/* <button 
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-text-primary hover:bg-accent-primary/10 hover:text-accent-primary transition"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <Filter size={18} />
          </button> */}
          <button className="group relative w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-transparent bg-gradient-to-br from-accent-primary-80 to-accent-secondary-80">
            <MdAdd size={26} className='text-white'/>
          </button>
          {/* <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-text-primary hover:bg-accent-primary/10 hover:text-accent-primary transition">
            <Settings size={18} />
          </button> */}
        </div>
        
        {/* Filter Menu */}
        {/* {showFilterMenu && (
          <div className="absolute top-16 right-4 w-40 bg-bg-tertiary/90 backdrop-blur-md rounded-lg shadow-lg border border-white/5 z-50">
            <div className="py-2">
              <button
                className={`flex items-center w-full px-4 py-2 hover:bg-white/5 text-left ${filter === 'all' ? 'text-accent-primary' : 'text-text-primary'}`}
                onClick={() => {
                  setFilter('all');
                  setShowFilterMenu(false);
                }}
              >
                所有消息
              </button>
              <button
                className={`flex items-center w-full px-4 py-2 hover:bg-white/5 text-left ${filter === 'unread' ? 'text-accent-primary' : 'text-text-primary'}`}
                onClick={() => {
                  setFilter('unread');
                  setShowFilterMenu(false);
                }}
              >
                未读消息
              </button>
              <button
                className={`flex items-center w-full px-4 py-2 hover:bg-white/5 text-left ${filter === 'pinned' ? 'text-accent-primary' : 'text-text-primary'}`}
                onClick={() => {
                  setFilter('pinned');
                  setShowFilterMenu(false);
                }}
              >
                置顶消息
              </button>
            </div>
          </div>
        )} */}
      </div>
      
      {/* Search */}
      <div className="p-4">
        <div className="flex items-center gap-2 bg-bg-tertiary-80 rounded-xl px-3 py-3">
          <IoSearch size={26} className="text-text-primary" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="bg-transparent w-full outline-none border-none text-text-primary placeholder:text-text-primary-30" 
          />
        </div>
      </div>
      
      {/* Filter indicator */}
      {/* {filter !== 'all' && (
        <div className="px-4 py-2 bg-accent-primary/5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-accent-primary">
              {filter === 'unread' ? '仅显示未读消息' : '仅显示置顶消息'}
            </span>
            <button 
              className="text-accent-primary text-sm"
              onClick={() => setFilter('all')}
            >
              清除
            </button>
          </div>
        </div>
      )} */}
      
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-accent-primary/30 scrollbar-track-transparent">
        {/* No results message */}
        {filterChats(chats).length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-text-primary-30 p-4 text-center">
            <span className="text-lg mb-2">No chats found</span>
            <span className="text-sm">Try a different search term or start a new conversation</span>
          </div>
        )}
        
        {/* Pinned chats */}
        {pinnedChats.length > 0 && (
          <div className="mb-2">
            <div className="px-4 py-2 flex items-center">
              <Pin size={14} className="text-accent-primary mr-2" />
              <span className="text-xs text-text-secondary font-medium">Pinned Conversations</span>
            </div>
            
            {pinnedChats.map((chat) => (
              <ChatItem 
                key={chat.id}
                chat={chat}
                isSelected={selectedChatId === chat.id}
                onClick={() => onSelectChat(chat.id)}
              />
            ))}
          </div>
        )}
        
        {/* Chats without groups */}
        {!searchTerm && filter === 'all' && (
          <>
            {getChatsInGroup().length > 0 && (
              <div className="mb-2">
                {filterChats(getChatsInGroup()).map((chat) => (
                  <ChatItem 
                    key={chat.id}
                    chat={chat}
                    isSelected={selectedChatId === chat.id}
                    onClick={() => onSelectChat(chat.id)}
                  />
                ))}
              </div>
            )}
            
            {/* Grouped chats */}
            {groups.map((group) => {
              const groupChats = filterChats(getChatsInGroup(group.id));
              if (groupChats.length === 0) return null;
              
              return (
                <div key={group.id} className="mb-2">
                  <button 
                    className="w-full px-4 py-2 flex items-center justify-between text-text-secondary hover:text-text-primary transition-colors"
                    onClick={() => toggleGroupCollapse(group.id)}
                  >
                    <span className="text-xs font-medium">{group.name}</span>
                    <ChevronDown 
                      size={14} 
                      className={`transform transition-transform ${groupCollapse[group.id] ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {!groupCollapse[group.id] && groupChats.map((chat) => (
                    <ChatItem 
                      key={chat.id}
                      chat={chat}
                      isSelected={selectedChatId === chat.id}
                      onClick={() => onSelectChat(chat.id)}
                    />
                  ))}
                </div>
              );
            })}
          </>
        )}
        
        {/* Filtered or searched chats */}
        {(searchTerm || filter !== 'all') && 
          filterChats(chats)
            .filter(chat => !chat.pinned || filter !== 'pinned')
            .map((chat) => (
              <ChatItem 
                key={chat.id}
                chat={chat}
                isSelected={selectedChatId === chat.id}
                onClick={() => onSelectChat(chat.id)}
              />
            ))
        }
      </div>
    </div>
  );
};

export default ChatList;