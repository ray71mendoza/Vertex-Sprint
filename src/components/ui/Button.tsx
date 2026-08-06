import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-vertex-prismBlue/50 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer tracking-tight';

  const sizeStyles = {
    sm: 'h-[40px] text-xs px-4 gap-2',
    md: 'h-[48px] text-sm px-6 gap-2.5',
    lg: 'h-[52px] text-base px-8 gap-3',
  };

  const variantStyles = {
    primary: 'bg-vertex-apexTeal hover:bg-vertex-facetDeep text-white dark:bg-vertex-prismBlue dark:hover:bg-vertex-facetLight dark:text-vertex-ink shadow-md border border-transparent',
    secondary: 'bg-vertex-lightSurfaceSubtle hover:bg-vertex-quartzGrey/30 text-vertex-ink dark:bg-vertex-darkSurfaceElevated dark:hover:bg-vertex-darkSurfaceHover dark:text-vertex-polarWhite border border-vertex-quartzGrey/60 dark:border-vertex-facetIce/20',
    outline: 'bg-transparent hover:bg-vertex-apexTeal/5 text-vertex-apexTeal dark:text-vertex-prismBlue dark:hover:bg-vertex-prismBlue/10 border border-vertex-apexTeal/40 dark:border-vertex-prismBlue/40',
    ghost: 'bg-transparent hover:bg-vertex-quartzGrey/20 dark:hover:bg-vertex-darkSurfaceHover text-vertex-ink dark:text-vertex-polarWhite',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-md border border-transparent',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};
