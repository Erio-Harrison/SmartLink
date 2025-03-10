import React from 'react';

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
  text?: string;
  className?: string;
  glow?: boolean;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User avatar',
  size = 'md',
  status = 'none',
  text,
  className = '',
  glow = false
}) => {
  // Size mapping
  const sizeMap = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-xl',
  };
  
  // Status color mapping
  const statusColorMap = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    none: ''
  };
  
  // Extract first letter for text fallback
  const firstLetter = text?.[0] || alt?.[0] || '?';
  
  // Glow effect class
  // const glowClass = glow ? 'ring-2 ring-accent-primary ring-opacity-50 shadow-glow-sm' : '';

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`
          ${sizeMap[size]} flex items-center justify-center rounded-xl
          bg-gradient-to-br from-accent-primary to-accent-secondary
          font-semibold text-white
        `}
      >
        {src ? (
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span>{firstLetter.toUpperCase()}</span>
        )}
      </div>
      
      {/* Status indicator */}
      {status !== 'none' && (
        <span 
          className={`absolute bottom-0 right-0 block rounded-full 
            ${statusColorMap[status]} border-2 border-bg-primary
            ${size === 'xs' ? 'w-2 h-2' : 'w-3 h-3'}`}
        />
      )}
    </div>
  );
};

export default Avatar;