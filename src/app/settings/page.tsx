'use client';

import React, { useState, useEffect } from 'react';
import SideNav from '@/components/layout/SideNav';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { 
  User, Lock, Bell, Palette, Smartphone, Globe, Shield, LogOut, 
  Moon, Sun, LifeBuoy, Eye, EyeOff 
} from 'lucide-react';

type SettingsTab = 'profile' | 'security' | 'notifications' | 'appearance' | 'language' | 'devices';

// Initialize darkMode based on localStorage (or default to light mode)
const getInitialTheme = (): boolean => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  }
  return false;
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [darkMode, setDarkMode] = useState<boolean>(getInitialTheme);

  // Update the document's class and persist theme change when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // 示例设备数据
  const devices = [
    { id: '1', name: 'Windows PC', lastActive: '现在', current: true, location: '北京', browser: 'Chrome' },
    { id: '2', name: 'iPhone 13', lastActive: '10分钟前', current: false, location: '北京', browser: 'Safari' },
    { id: '3', name: 'MacBook Pro', lastActive: '昨天 14:30', current: false, location: '上海', browser: 'Firefox' },
  ];

  // 渲染特定标签页内容
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">个人资料</h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="text-center">
                <Avatar size="xl" text="李明" glow />
                <Button variant="outline" size="sm" className="mt-4">更换头像</Button>
              </div>
              
              <div className="flex-1 space-y-4 w-full max-w-md">
                <div>
                  <label className="block text-text-secondary mb-1 text-sm">用户名</label>
                  <input 
                    type="text" 
                    value="李明" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition"
                  />
                </div>
                
                <div>
                  <label className="block text-text-secondary mb-1 text-sm">邮箱</label>
                  <input 
                    type="email" 
                    value="liming@example.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition"
                  />
                </div>
                
                <div>
                  <label className="block text-text-secondary mb-1 text-sm">个人简介</label>
                  <textarea 
                    rows={4}
                    placeholder="介绍一下自己..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-text-primary resize-none focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition"
                  ></textarea>
                </div>
                
                <Button variant="primary">保存更改</Button>
              </div>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">隐私与安全</h2>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">修改密码</h3>
              
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-text-secondary mb-1 text-sm">当前密码</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition pr-10"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                      <EyeOff size={18} />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-text-secondary mb-1 text-sm">新密码</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition pr-10"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-text-secondary mb-1 text-sm">确认新密码</label>
                  <input 
                    type="password" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition"
                  />
                </div>
                
                <Button variant="primary">更新密码</Button>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">两步验证</h3>
              <p className="text-text-secondary mb-4">启用两步验证，增强账户安全性</p>
              
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-text-primary">两步验证</p>
                  <p className="text-text-secondary text-sm">当前状态：未启用</p>
                </div>
                <Button variant="outline">启用</Button>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">隐私设置</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-primary">在线状态</p>
                    <p className="text-text-secondary text-sm">允许其他人看到你的在线状态</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-primary">已读回执</p>
                    <p className="text-text-secondary text-sm">允许发送方知道你已读取他们的消息</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-primary">朋友圈可见性</p>
                    <p className="text-text-secondary text-sm">谁可以看到你的朋友圈动态</p>
                  </div>
                  <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition">
                    <option>所有人</option>
                    <option>仅好友</option>
                    <option>自定义</option>
                  </select>
                </div>
              </div>
            </GlassCard>
          </div>
        );
        
      case 'devices':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">设备管理</h2>
            <p className="text-text-secondary">管理当前登录的设备</p>
            
            <GlassCard className="overflow-hidden">
              {devices.map((device, index) => (
                <div 
                  key={device.id}
                  className={`p-6 ${index !== devices.length - 1 ? 'border-b border-white/10' : ''} ${device.current ? 'bg-accent-primary/5' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-text-primary">{device.name}</h3>
                        {device.current && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent-primary/20 text-accent-primary">
                            当前设备
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-2 text-sm text-text-secondary">
                        <p>最后活动：{device.lastActive}</p>
                        <p>位置：{device.location}</p>
                        <p>浏览器：{device.browser}</p>
                      </div>
                    </div>
                    
                    {!device.current && (
                      <Button variant="outline" size="sm">退出登录</Button>
                    )}
                  </div>
                </div>
              ))}
            </GlassCard>
            
            <Button variant="primary">
              <LogOut size={16} className="mr-2" />
              退出所有设备
            </Button>
          </div>
        );
        
      case 'appearance':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">外观</h2>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">主题</h3>
              
              <div className="flex gap-4 mb-6">
                <div 
                  className={`w-32 h-24 rounded-lg bg-bg-primary border-2 flex flex-col justify-between p-3 cursor-pointer ${
                    darkMode ? 'border-accent-primary' : 'border-white/10'
                  }`}
                  onClick={() => setDarkMode(true)}
                >
                  <Moon size={18} className="text-text-primary" />
                  <p className="text-text-primary text-sm">深色模式</p>
                </div>
                
                <div 
                  className={`w-32 h-24 rounded-lg bg-white border-2 flex flex-col justify-between p-3 cursor-pointer ${
                    !darkMode ? 'border-accent-primary' : 'border-white/10'
                  }`}
                  onClick={() => setDarkMode(false)}
                >
                  <Sun size={18} className="text-gray-800" />
                  <p className="text-gray-800 text-sm">浅色模式</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-4">主题颜色</h3>
              
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white cursor-pointer"></div>
                <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-white/10 cursor-pointer"></div>
                <div className="w-10 h-10 rounded-full bg-pink-500 border-2 border-white/10 cursor-pointer"></div>
                <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-white/10 cursor-pointer"></div>
              </div>
              
              <h3 className="text-lg font-semibold mb-4">字体大小</h3>
              
              <div className="max-w-md">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value="50"
                  className="w-full bg-white/10 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-primary"
                />
                <div className="flex justify-between mt-2 text-sm text-text-secondary">
                  <span>小</span>
                  <span>中</span>
                  <span>大</span>
                </div>
              </div>
            </GlassCard>
          </div>
        );
        
      default:
        return <div>内容加载中...</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 侧边导航 */}
      <SideNav userName={''} />
      
      <div className="flex-1 bg-bg-primary overflow-auto">
        <div className="max-w-6xl mx-auto p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold font-orbitron mb-2 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">设置</h1>
            <p className="text-text-secondary">管理你的账户和应用偏好</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* 设置导航 */}
            <div className="md:col-span-1">
              <GlassCard className="overflow-hidden">
                <button 
                  className={`flex items-center gap-3 w-full p-4 text-left ${activeTab === 'profile' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-primary hover:bg-white/5'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User size={18} />
                  <span>个人资料</span>
                </button>
                
                <button 
                  className={`flex items-center gap-3 w-full p-4 text-left ${activeTab === 'security' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-primary hover:bg-white/5'}`}
                  onClick={() => setActiveTab('security')}
                >
                  <Shield size={18} />
                  <span>隐私与安全</span>
                </button>
                
                <button 
                  className={`flex items-center gap-3 w-full p-4 text-left ${activeTab === 'notifications' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-primary hover:bg-white/5'}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell size={18} />
                  <span>通知设置</span>
                </button>
                
                <button 
                  className={`flex items-center gap-3 w-full p-4 text-left ${activeTab === 'appearance' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-primary hover:bg-white/5'}`}
                  onClick={() => setActiveTab('appearance')}
                >
                  <Palette size={18} />
                  <span>外观</span>
                </button>
                
                <button 
                  className={`flex items-center gap-3 w-full p-4 text-left ${activeTab === 'language' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-primary hover:bg-white/5'}`}
                  onClick={() => setActiveTab('language')}
                >
                  <Globe size={18} />
                  <span>语言</span>
                </button>
                
                <button 
                  className={`flex items-center gap-3 w-full p-4 text-left ${activeTab === 'devices' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-primary hover:bg-white/5'}`}
                  onClick={() => setActiveTab('devices')}
                >
                  <Smartphone size={18} />
                  <span>设备管理</span>
                </button>
              </GlassCard>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <LifeBuoy size={18} />
                  帮助中心
                </Button>
                
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 mt-3 text-red-400 hover:text-red-300">
                  <LogOut size={18} />
                  退出登录
                </Button>
              </div>
            </div>
            
            {/* 设置内容 */}
            <div className="md:col-span-3">
              <GlassCard className="p-6">
                {renderTabContent()}
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
