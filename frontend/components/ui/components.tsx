"use client";

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-teal-500 text-slate-950 hover:bg-teal-400 shadow-md hover:shadow-lg hover:shadow-teal-500/20',
      secondary: 'bg-orange-500 text-white hover:bg-orange-400 shadow-md hover:shadow-lg',
      outline: 'border-2 border-teal-500 text-teal-400 hover:bg-teal-950/30',
      ghost: 'text-slate-400 hover:bg-slate-800 hover:text-slate-200',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-8 py-4 text-lg font-semibold',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-800 overflow-hidden", className)} {...props}>
    {children}
  </div>
);

export const Badge = ({ className, variant = 'default', children }: { className?: string, variant?: 'default' | 'success' | 'warning' | 'outline', children: React.ReactNode }) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300',
    success: 'bg-teal-900/30 text-teal-300 border border-teal-800',
    warning: 'bg-orange-900/30 text-orange-300 border border-orange-800',
    outline: 'border border-slate-700 text-slate-400'
  };
  
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
};

