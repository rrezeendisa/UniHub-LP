import { PersonIcon } from '@radix-ui/react-icons'
import { InfoCard, InfoCardHeader } from '../InfoCard/info-card'

export interface RoomCardProps {
  className: string
  resources: Array<{ type: string; amount: number }>
  places: number
  isAvailable: boolean
  onSelect: () => void
}

export function RoomCard({
  className,
  resources,
  places,
  isAvailable,
  onSelect,
}: RoomCardProps) {
  const hasResources = resources.length > 0

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!isAvailable}
      className={[
        'group h-full w-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 transition',
        isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60',
      ].join(' ')}
      aria-label={`Reservar sala ${className}`}
    >
      <InfoCard className="h-full relative transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
        <InfoCardHeader badge={className} className="mb-5" />

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-muted)]">
              Recursos
            </p>

            {hasResources ? (
              <ul className="mt-2 flex flex-col gap-1.5">
                {resources.map((resource) => (
                  <li
                    key={resource.type}
                    className="text-sm text-[var(--color-text-muted)]"
                  >
                    <span className="font-semibold text-[var(--color-text)]">
                      {resource.type}
                    </span>
                    <span className="text-[var(--color-text-muted)]">
                      {`: ${resource.amount}`}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Sem recursos cadastrados.
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
            <PersonIcon className="h-4 w-4 shrink-0" />
            <p className="text-sm">
              <span className="font-semibold text-[var(--color-text)]">
                lugares
              </span>
              <span className="text-[var(--color-text-muted)]">{`: ${places}`}</span>
            </p>
          </div>
        </div>

        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 text-white text-sm font-semibold">
            Indisponível
          </div>
        )}
      </InfoCard>
    </button>
  )
}
