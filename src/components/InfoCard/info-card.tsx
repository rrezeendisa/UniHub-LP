import React from 'react'

interface InfoCardProps {
  children: React.ReactNode
  className?: string
}

interface InfoCardHeaderProps {
  badge?: string
  badgeColor?: 'primary' | 'neutral' | 'success' | 'error' | 'warning'
  badgeClassName?: string
  children?: React.ReactNode
  className?: string
}

interface InfoCardTitleProps {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  className?: string
}

interface InfoCardContentProps {
  children: React.ReactNode
  className?: string
}

interface InfoCardItemProps {
  icon?: React.ReactNode
  label: string
  value?: string | React.ReactNode
  children?: React.ReactNode
  className?: string
}

/* 🎨 Badge usando tokens */
const badgeColors: Record<
  NonNullable<InfoCardHeaderProps['badgeColor']>,
  string
> = {
  primary: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  neutral: 'bg-[var(--color-surface)] text-[var(--color-text-muted)]',
  success: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  error: 'bg-[var(--color-error)]/10 text-[var(--color-error)]',
  warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
}

/* 📏 Tipografia consistente */
const titleSizes: Record<NonNullable<InfoCardTitleProps['size']>, string> = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-xl',
}

export function InfoCard({ children, className = '' }: InfoCardProps) {
  return (
    <div
      className={[
        'rounded-2xl border p-6 shadow-sm',
        'border-[var(--color-gray-light)]',
        'bg-[var(--color-surface)]',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export function InfoCardHeader({
  badge,
  badgeColor = 'primary',
  badgeClassName = '',
  children,
  className = '',
}: InfoCardHeaderProps) {
  return (
    <div className={['mb-4 flex flex-col gap-2', className].join(' ')}>
      {badge && (
        <span
          className={[
            'inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold',
            badgeColors[badgeColor],
            badgeClassName,
          ].join(' ')}
        >
          {badge}
        </span>
      )}
      {children}
    </div>
  )
}

export function InfoCardTitle({
  children,
  size = 'medium',
  className = '',
}: InfoCardTitleProps) {
  return (
    <h3
      className={[
        'font-semibold',
        'text-[var(--color-text)]',
        titleSizes[size],
        className,
      ].join(' ')}
    >
      {children}
    </h3>
  )
}

export function InfoCardContent({
  children,
  className = '',
}: InfoCardContentProps) {
  return (
    <div className={['text-[var(--color-text-muted)]', className].join(' ')}>
      {children}
    </div>
  )
}

export function InfoCardItem({
  icon,
  label,
  value,
  children,
  className = '',
}: InfoCardItemProps) {
  return (
    <div className={['flex items-start gap-3', className].join(' ')}>
      {icon && <div className="mt-1 flex-shrink-0">{icon}</div>}

      <div className="flex-1">
        <p className="text-sm font-medium text-[var(--color-text)]">{label}</p>

        {value && (
          <p className="text-sm text-[var(--color-text-muted)]">{value}</p>
        )}

        {children && <div className="mt-1">{children}</div>}
      </div>
    </div>
  )
}
