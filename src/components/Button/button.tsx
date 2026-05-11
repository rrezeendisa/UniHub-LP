import React from 'react'

type ButtonVariant = 'primary' | 'outline'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const sizeStyles: Record<ButtonSize, string> = {
  small: 'px-3 py-2 text-sm',
  medium: 'px-4 py-2.5 text-base',
  large: 'px-6 py-3 text-lg',
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-[var(--color-primary)]',
    'border-[var(--color-primary)]',
    'text-white',
    'hover:bg-[var(--color-primary-hover)]',
    'hover:border-[var(--color-primary-hover)]',
  ].join(' '),
  outline: [
    'bg-transparent',
    'border-[var(--color-primary)]',
    'text-[var(--color-primary)]',
    'hover:bg-[var(--color-primary)]',
    'hover:text-white',
  ].join(' '),
}

export function Button({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center rounded-lg border font-semibold',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        !disabled ? 'cursor-pointer' : '',
        sizeStyles[size],
        variantStyles[variant],
      ].join(' ')}
    >
      {children}
    </button>
  )
}
