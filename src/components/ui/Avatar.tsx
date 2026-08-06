import React from 'react';
import { User } from '../../types';

interface AvatarProps {
  user?: Partial<User> | null;
  name?: string;
  avatarUrl?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  user,
  name,
  avatarUrl,
  size = 'md',
  className = '',
  showTooltip = true,
}) => {
  const displayName = user ? `${user.name || ''} ${user.lastName || ''}`.trim() : (name || 'Usuario');
  const url = user?.avatar || avatarUrl;

  const getInitials = (n: string) => {
    const parts = n.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  const sizeClasses = {
    xs: 'w-5 h-5 text-[10px]',
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const initials = getInitials(displayName);

  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-full font-semibold select-none flex-shrink-0 border border-vertex-quartzGrey/50 dark:border-vertex-facetIce/20 shadow-xs ${sizeClasses[size]} ${className}`}
      title={showTooltip ? displayName : undefined}
    >
      {url ? (
        <img 
          src={url} 
          alt={displayName} 
          className="w-full h-full rounded-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      ) : null}

      <div className="w-full h-full rounded-full bg-gradient-to-br from-vertex-apexTeal to-vertex-facetMedium text-white dark:from-vertex-facetDeep dark:to-vertex-facetTeal flex items-center justify-center">
        {initials}
      </div>

      {user?.status && (
        <span 
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-vertex-darkSurface ${
            user.status === 'active' ? 'bg-emerald-500' : user.status === 'busy' ? 'bg-amber-500' : 'bg-slate-400'
          }`} 
        />
      )}
    </div>
  );
};

export const AvatarGroup: React.FC<{ users: User[]; max?: number; size?: 'xs' | 'sm' | 'md' }> = ({
  users,
  max = 4,
  size = 'sm',
}) => {
  const visible = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((user) => (
        <Avatar key={user.id} user={user} size={size} />
      ))}
      {remaining > 0 && (
        <div className={`relative inline-flex items-center justify-center rounded-full font-bold bg-vertex-quartzGrey/40 dark:bg-vertex-darkSurfaceElevated text-vertex-ink dark:text-vertex-facetIce border border-vertex-quartzGrey dark:border-vertex-facetIce/20 ${size === 'xs' ? 'w-5 h-5 text-[9px]' : size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'}`}>
          +{remaining}
        </div>
      )}
    </div>
  );
};
