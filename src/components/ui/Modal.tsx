import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
  showCloseButton = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-6xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-vertex-ink/70 dark:bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      />

      {/* Dialog Window */}
      <div 
        className={`
          relative w-full ${maxWidthClasses[maxWidth]} 
          bg-vertex-lightSurface dark:bg-vertex-darkSurface 
          border border-vertex-quartzGrey/60 dark:border-vertex-facetIce/20 
          rounded-2xl shadow-2xl overflow-hidden z-10 
          animate-in zoom-in-95 duration-200
        `}
      >
        {/* Top Geometric Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-vertex-apexTeal via-vertex-prismBlue to-vertex-facetLight" />

        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-5 pb-4 border-b border-vertex-quartzGrey/40 dark:border-vertex-facetIce/15">
            <div>
              {typeof title === 'string' ? (
                <h3 className="text-lg font-bold text-vertex-ink dark:text-vertex-polarWhite tracking-tight">
                  {title}
                </h3>
              ) : (
                title
              )}
              {subtitle && (
                <p className="text-xs text-vertex-facetMedium dark:text-vertex-facetIce/70 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-vertex-facetMedium hover:text-vertex-ink dark:text-vertex-facetIce dark:hover:text-white hover:bg-vertex-quartzGrey/30 dark:hover:bg-vertex-darkSurfaceHover transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
