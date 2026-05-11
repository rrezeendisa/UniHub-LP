import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/button'
import { DeskIcon } from '../../icons/lib/desk-icon'
import { ScheduleIcon } from '../../icons/lib/schedule-icon'
import { BlackboardIcon } from '../../icons/lib/blackboard-icon'
import { CalendarIcon } from '../../icons/lib/calendar-icon'
import { Badge } from '../../components/Badge/badge'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
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

const features: FeatureCardProps[] = [
  {
    icon: <DeskIcon height={32} width={32} transform="" />,
    title: 'Reserve mesas',
    description:
      'Encontre mesas disponíveis na biblioteca e reserve rapidamente para estudar.',
  },
  {
    icon: <ScheduleIcon height={32} width={32} />,
    title: 'Agende salas',
    description:
      'Reserve salas para mentorias ou estudos em grupo com visualização clara de disponibilidade.',
  },
  {
    icon: <BlackboardIcon height={32} width={32} />,
    title: 'Solicite recursos',
    description:
      'Professores podem solicitar projetores, notebooks e outros recursos para as aulas.',
  },
  {
    icon: <CalendarIcon height={32} width={32} />,
    title: 'Cronogramas',
    description:
      'Visualize onde cada professor estará, com dia, horário e sala de forma organizada.',
  },
]

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <main className="mx-auto flex w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] shadow-sm">
          <div className="grid items-center gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-14">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <div className="mx-auto max-w-xl lg:mx-0">
                <Badge>UniHub</Badge>
              </div>

              <div className="space-y-4">
                <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-[var(--color-text)] sm:text-4xl lg:mx-0 lg:text-5xl">
                  Gerencie salas e espaços da sua faculdade com facilidade e
                  organização.
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg lg:mx-0">
                  Centralize reservas, cronogramas e agendamentos em uma
                  experiência simples, rápida e clara para o dia a dia.
                </p>
              </div>

              <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => navigate('/login')}
                >
                  Começar agora
                </Button>
              </div>
            </div>

            <div className="grid gap-4 rounded-2xl border border-[var(--color-gray-light)] bg-[var(--color-bg)] p-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[var(--color-surface)] p-5 shadow-sm">
                <p className="text-sm font-semibold text-[var(--color-text-muted)]">
                  Reservas rápidas
                </p>
                <p className="mt-2 text-2xl font-bold text-[var(--color-text)]">
                  Menos cliques
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  Fluxo direto para agendar e acompanhar suas reservas.
                </p>
              </div>

              <div className="rounded-2xl bg-[var(--color-surface)] p-5 shadow-sm">
                <p className="text-sm font-semibold text-[var(--color-text-muted)]">
                  Disponibilidade
                </p>
                <p className="mt-2 text-2xl font-bold text-[var(--color-text)]">
                  Em tempo real
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  Evite conflitos e encontre horários com mais confiança.
                </p>
              </div>

              <div className="rounded-2xl bg-[var(--color-surface)] p-5 shadow-sm sm:col-span-2">
                <p className="text-sm font-semibold text-[var(--color-text-muted)]">
                  Experiência guiada
                </p>
                <p className="mt-2 text-2xl font-bold text-[var(--color-text)]">
                  Interface clara e consistente
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  Navegação previsível, feedback visual e informação organizada
                  para reduzir erros.
                </p>
              </div>
            </div>
          </div>
        </section>

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

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
