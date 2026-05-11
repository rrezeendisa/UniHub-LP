import { Link } from 'react-router-dom'
import { type ReactNode } from 'react'

interface MenuItemProps {
  icon: ReactNode
  label: string
  href: string
  isActive: boolean
}

export function MenuItem({ icon, label, href, isActive }: MenuItemProps) {
  return (
    <Link
      to={href}
      className={`
        flex items-center gap-4 px-5 py-3 rounded-lg transition-all duration-200
        ${
          isActive
            ? 'bg-[var(--color-hover-menu)]/30'
            : 'hover:bg-[var(--color-hover-menu)]/20'
        }
      `}
    >
      <div className="flex shrink-0 items-center justify-center w-5 h-5 text-[var(--color-primary)]">
        {icon}
      </div>
      <span className="text-base font-medium text-[var(--color-text)]">
        {label}
      </span>
    </Link>
  )
}
