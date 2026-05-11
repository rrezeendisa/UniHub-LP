import React from 'react'

interface ALinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  href: string
  className?: string
}

export function ALink({ children, href, className = '', ...props }: ALinkProps) {
  return (
    <a
      href={href}
      className={[
        'text-lg font-semibold underline underline-offset-4',
        'text-[var(--color-primary)]',
        'hover:text-[var(--color-primary-hover)]',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </a>
  )
}
