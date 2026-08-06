import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label 
          htmlFor={inputId} 
          className="text-xs font-bold uppercase tracking-wider text-vertex-ink/80 dark:text-vertex-facetIce/90 select-none"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-4 text-vertex-facetMedium dark:text-vertex-facetIce pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          className={`
            w-full h-[48px] rounded-xl text-sm px-4 outline-none transition-all duration-200
            bg-vertex-lightSurface dark:bg-vertex-darkSurface
            text-vertex-ink dark:text-vertex-polarWhite
            placeholder:text-vertex-facetMedium/60 dark:placeholder:text-vertex-facetIce/40
            border ${error ? 'border-rose-500 focus:ring-rose-500/30' : 'border-vertex-quartzGrey/60 dark:border-vertex-facetIce/20 focus:border-vertex-prismBlue focus:ring-2 focus:ring-vertex-prismBlue/20'}
            ${leftIcon ? 'pl-11' : ''}
            ${rightIcon ? 'pr-11' : ''}
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-4 text-vertex-facetMedium dark:text-vertex-facetIce">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <span className="text-xs text-rose-500 font-semibold">{error}</span>
      )}
      {!error && helperText && (
        <span className="text-xs text-vertex-facetMedium dark:text-vertex-facetIce/70">{helperText}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
