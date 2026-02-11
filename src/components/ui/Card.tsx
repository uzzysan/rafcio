"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  gradient = false
}: CardProps) {
  return (
    <div className={clsx(
      'relative rounded-[var(--radius-card)] bg-[var(--card)] border border-[var(--border)] overflow-hidden',
      hover && 'transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--accent)]/20',
      glow && 'hover:shadow-[0_0_40px_-10px_var(--accent)]',
      gradient && 'gradient-border',
      className
    )}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

interface AnimatedCardProps extends CardProps {
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function AnimatedCard({ 
  children, 
  delay = 0,
  direction = 'up',
  ...props 
}: AnimatedCardProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <Card {...props}>
        {children}
      </Card>
    </motion.div>
  );
}
