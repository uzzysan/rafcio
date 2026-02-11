"use client";

import { ReactNode, ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    href?: string;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    external?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    href,
    icon,
    iconPosition = 'right',
    fullWidth = false,
    external = false,
    disabled,
    type = 'button',
    ...props
}: ButtonProps) {
    const baseStyles = clsx(
        'inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius-button)] transition-all duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
        disabled && 'opacity-60 cursor-not-allowed',
        fullWidth && 'w-full'
    );

    const variants = {
        primary: clsx(
            'gradient-bg text-white shadow-lg shadow-[var(--accent)]/25',
            'hover:shadow-xl hover:shadow-[var(--accent)]/30 hover:scale-[1.02]',
            'active:scale-[0.98]',
            disabled && 'hover:scale-100 active:scale-100'
        ),
        secondary: clsx(
            'bg-[var(--muted)] text-[var(--foreground)]',
            'hover:bg-[var(--border)]',
            'active:scale-[0.98]'
        ),
        outline: clsx(
            'bg-transparent border border-[var(--border)] text-[var(--foreground)]',
            'hover:border-[var(--accent)] hover:text-[var(--accent)]',
            'active:scale-[0.98]'
        ),
        ghost: clsx(
            'bg-transparent text-[var(--muted-foreground)]',
            'hover:text-[var(--foreground)] hover:bg-[var(--muted)]',
            'active:scale-[0.98]'
        )
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    if (href) {
        return (
            <a
                href={href}
                className={clsx(baseStyles, variants[variant], sizes[size], className)}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
            >
                {icon && iconPosition === 'left' && icon}
                {children}
                {icon && iconPosition === 'right' && icon}
            </a>
        );
    }

    return (
        <button
            type={type}
            disabled={disabled}
            className={clsx(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
        </button>
    );
}
