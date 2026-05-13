import { FeaturesGrid, type Feature } from '../FeaturesGrid/features-grid'

interface FeaturesSectionProps {
  features: Feature[]
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section className="mt-14">
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
          O que você pode fazer
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)] sm:text-base">
          Recursos organizados para acesso rápido, leitura fácil e foco na
          tarefa.
        </p>
      </div>

      <FeaturesGrid features={features} />
    </section>
  )
}
