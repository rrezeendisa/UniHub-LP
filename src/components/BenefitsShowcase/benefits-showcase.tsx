import { BenefitItem } from '../BenefitItem/benefit-item'

export interface Benefit {
  id: string
  label: string
  highlight: string
  description: string
  fullWidth?: boolean
}

interface BenefitsShowcaseProps {
  benefits: Benefit[]
}

export function BenefitsShowcase({ benefits }: BenefitsShowcaseProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-[var(--color-gray-light)] bg-[var(--color-bg)] p-4 sm:grid-cols-2">
      {benefits.map((benefit) => (
        <div
          key={benefit.id}
          className={benefit.fullWidth ? 'sm:col-span-2' : ''}
        >
          <BenefitItem
            label={benefit.label}
            highlight={benefit.highlight}
            description={benefit.description}
          />
        </div>
      ))}
    </div>
  )
}
