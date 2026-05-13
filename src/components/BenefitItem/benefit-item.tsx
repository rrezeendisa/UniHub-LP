export interface BenefitItemProps {
  label: string
  highlight: string
  description: string
}

export function BenefitItem({
  label,
  highlight,
  description,
}: BenefitItemProps) {
  return (
    <div className="rounded-2xl bg-[var(--color-surface)] p-5 shadow-sm">
      <p className="text-sm font-semibold text-[var(--color-text-muted)]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-[var(--color-text)]">
        {highlight}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
        {description}
      </p>
    </div>
  )
}
