"use client"

import React, { useState } from 'react';
import Avatar from '../ui/Avatar';
import { useRouter, usePathname } from 'next/navigation';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { BsFillCameraFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { RiSettings3Fill } from "react-icons/ri";
import { FaCompass } from "react-icons/fa";


type NavItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: number;
};

type UserStatus = 'online' | 'away' | 'busy' | 'offline';

type SideNavProps = {
  userName: string;
  userAvatar?: string;
}

const SideNav: React.FC<SideNavProps> = ({ userName, userAvatar }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [userStatus, setUserStatus] = useState<UserStatus>('online');
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { icon: <IoChatbubbleEllipses size={22} />, label: 'Chat', path: '/chat', badge: 3 },
    { icon: <HiUsers size={22} />, label: 'Contacts', path: '/contacts' },
    { icon: <FaCompass size={22} />, label: 'Discover', path: '/discovery' },
    { icon: <BsFillCameraFill size={22} />, label: 'Moments', path: '/moments' },
    { icon: <IoNotifications size={22} />, label: 'Notifications', path: '/notifications', badge: 2 },
  ];

  // Status display text
  const statusText = {
    online: 'Online',
    away: 'Away',
    busy: 'Busy',
    offline: 'Invisible'
  };

  // Status color mapping
  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    offline: 'bg-gray-500'
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="relative z-10 w-20 p-4 h-screen bg-bg-secondary flex flex-col items-center pt-titlebar shadow-[4px_0_10px_rgba(0,0,0,0.1)]">
      {/* User avatar and status */}
      <div className="mb-10 relative">
        <div className="relative">
          <Avatar 
            text={userName} 
            src={userAvatar}
            size="md" 
            status={userStatus}
            glow
          />
        </div>
        
        {/* Status selection menu */}
        {statusMenuOpen && (
          <div className="absolute top-full mt-2 right-0 w-40 bg-bg-tertiary/90 backdrop-blur-md rounded-lg shadow-lg border border-white/5 z-50">
            <div className="py-2">
              {(Object.keys(statusText) as UserStatus[]).map(status => (
                <button
                  key={status}
                  className="flex items-center w-full px-4 py-2 hover:bg-white/5 text-left"
                  onClick={() => {
                    setUserStatus(status);
                    setStatusMenuOpen(false);
                  }}
                >
                  <span className={`w-2 h-2 rounded-full ${statusColors[status]} mr-2`}></span>
                  <span className="text-text-primary">{statusText[status]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation items */}
      <div className="flex-1 flex flex-col items-center gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.label}
              className={`group relative w-10 h-10 m-1 flex items-center justify-center rounded-xl transition-colors ${
                isActive
                  ? 'bg-gradient-to-br from-accent-primary-80 to-accent-secondary-80'
                  : 'hover:bg-gradient-to-br hover:from-accent-primary-80 hover:to-accent-secondary-80'
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <span className={`text-text-primary transition-colors ${
                isActive ? 'text-text-secondary' : 'group-hover:text-text-secondary'
              }`}>
                {item.icon}
              </span>
              
              {/* Badge */}
              {item.badge && (
                <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-accent-tertiary text-xs flex items-center justify-center text-white font-medium">
                  {item.badge}
                </span>
              )}
              
              {/* Tooltip */}
              <span className="absolute left-full ml-2 px-2 py-1 bg-bg-tertiary/90 backdrop-blur-md rounded text-sm text-text-primary whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Bottom settings button */}
      <button
        className={`group relative w-10 h-10 m-1 flex items-center justify-center rounded-xl transition-colors ${
          pathname === '/settings'
            ? 'bg-gradient-to-br from-accent-primary-80 to-accent-secondary-80'
            : 'hover:bg-gradient-to-br hover:from-accent-primary-80 hover:to-accent-secondary-80'
        }`}
        onClick={() => handleNavigation('/settings')}
      >
        <RiSettings3Fill
          size={22}
          className={`transition-colors ${
            pathname === '/settings'
              ? 'text-text-secondary'
              : 'text-text-primary group-hover:text-text-secondary'
          }`}
        />
      </button>
    </div>
  );
};

export default SideNav;
