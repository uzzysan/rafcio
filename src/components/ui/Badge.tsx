"use client";

import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'soft' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '',
  icon
}: BadgeProps) {
  const variants = {
    default: 'bg-[var(--accent)] text-[var(--accent-foreground)]',
    outline: 'bg-transparent border border-[var(--accent)] text-[var(--accent)]',
    soft: 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20',
    gradient: 'gradient-bg text-white'
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-300',
      variants[variant],
      sizes[size],
      className
    )}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
