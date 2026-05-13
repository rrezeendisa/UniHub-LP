import { Badge } from '../Badge/badge'

export function PageTableHeader() {
  return (
    <div className="text-center">
      <div className="mx-auto max-w-3xl space-y-4">
        <Badge>Agendar mesa</Badge>

        <h1 className="text-xl! font-bold leading-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl">
          Reserve sua mesa de estudo e organize seu tempo.
        </h1>

        <p className="text-sm leading-6 text-[var(--color-text-muted)] sm:text-base">
          Por enquanto, o sistema permite o agendamento apenas de mesas
          individuais.
        </p>
      </div>
    </div>
  )
}
