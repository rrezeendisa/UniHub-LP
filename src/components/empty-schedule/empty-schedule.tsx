import { useMemo } from 'react'
import { IconEmpty } from '../IconEmpty/icon-empty'
import { ActionButton, type Action } from '../ActionButton/action-button'

export interface EmptyScheduleProps {
  title?: string
  subtitle?: string
  description?: string
  primaryAction?: Action
  secondaryAction?: Action
  className?: string
  showIcon?: boolean
}

export function EmptySchedule({
  title = 'Sem agendamentos',
  subtitle = 'Você não possui agendamentos no momento.',
  description = 'Para criar um agendamento, acesse a página de agendar sala ou agendar mesa.',
  primaryAction,
  secondaryAction,
  className = '',
  showIcon = true,
}: EmptyScheduleProps) {
  const primary = useMemo<Action>(
    () =>
      primaryAction ?? {
        label: 'Agendar Sala',
        href: '/agendar-sala',
        variant: 'primary',
      },
    [primaryAction]
  )

  const secondary = useMemo<Action>(
    () =>
      secondaryAction ?? {
        label: 'Agendar Mesa',
        href: '/agendar-mesa',
        variant: 'secondary',
      },
    [secondaryAction]
  )

  return (
    <section
      role="status"
      aria-live="polite"
      className={[
        'rounded-2xl border border-dashed border-[var(--color-gray-light)] bg-[var(--color-bg)] px-6 py-12 text-center',
        'sm:px-10 sm:py-16',
        className,
      ].join(' ')}
    >
      <div className="mx-auto max-w-2xl">
        {showIcon && (
          <div className="mx-auto mb-6 flex w-fit items-center justify-center rounded-full bg-[var(--color-surface)] p-4 text-[var(--color-text-muted)]">
            <IconEmpty />
          </div>
        )}

        <h2 className="mb-2 text-xl font-semibold text-[var(--color-text)]">
          {title}
        </h2>

        <p className="mb-3 text-sm text-[var(--color-text-muted)]">
          {subtitle}
        </p>

        <p className="mx-auto mb-6 max-w-xl text-xs text-[var(--color-text-muted)]">
          {description}
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <ActionButton a={primary} />
          <ActionButton a={secondary} />
        </div>

        <p className="mt-6 text-[11px] text-[var(--color-text-muted)]">
          Dica: você pode cancelar ou alterar agendamentos em Meus Agendamentos.
        </p>
      </div>
    </section>
  )
}
