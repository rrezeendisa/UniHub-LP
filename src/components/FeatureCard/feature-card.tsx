import React from 'react'

export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-transform duration-200 group-hover:scale-105">
        {icon}
      </div>
      <h3 className="text-base font-bold text-[var(--color-text)]">{title}</h3>
      <p className="text-sm leading-6 text-[var(--color-text-muted)]">
        {description}
      </p>
    </article>
  )
}
