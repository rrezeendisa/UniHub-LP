import { FeatureCard } from '../FeatureCard/feature-card'
import React from 'react'

export interface Feature {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

interface FeaturesGridProps {
  features: Feature[]
}

export function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  )
}
