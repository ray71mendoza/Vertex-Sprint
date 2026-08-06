import React from 'react';

interface VertexLogoProps {
  variant?: 'full' | 'symbol';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showDescriptor?: boolean;
}

export const VertexLogo: React.FC<VertexLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  showDescriptor = true,
}) => {
  const sizeMap = {
    sm: { symbolHeight: 'h-6', textClass: 'text-base', badgeClass: 'text-[9px] px-1.5 py-0.5' },
    md: { symbolHeight: 'h-8', textClass: 'text-xl', badgeClass: 'text-[10px] px-2 py-0.5' },
    lg: { symbolHeight: 'h-10', textClass: 'text-2xl', badgeClass: 'text-xs px-2.5 py-1' },
  };

  const currentSize = sizeMap[size];

  if (variant === 'symbol') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img 
          src="/logo.png" 
          alt="Vertex Logo" 
          className={`${currentSize.symbolHeight} w-auto object-contain transition-transform hover:scale-105`} 
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Vertex Faceted V Symbol */}
      <img 
        src="/logo.png" 
        alt="Vertex Symbol" 
        className={`${currentSize.symbolHeight} w-auto object-contain flex-shrink-0`}
      />

      {/* Brand Lockup: Wordmark + Sprint Product Descriptor */}
      <div className="flex items-baseline gap-1.5">
        <span className={`font-bold tracking-tight text-vertex-ink dark:text-white ${currentSize.textClass} font-sans`}>
          Vertex
        </span>
        {showDescriptor && (
          <span className={`font-semibold uppercase tracking-wider rounded-md bg-vertex-apexTeal/10 dark:bg-vertex-prismBlue/20 text-vertex-apexTeal dark:text-vertex-prismBlue border border-vertex-apexTeal/20 dark:border-vertex-prismBlue/30 ${currentSize.badgeClass}`}>
            Sprint
          </span>
        )}
      </div>
    </div>
  );
};
