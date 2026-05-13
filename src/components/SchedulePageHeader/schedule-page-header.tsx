import { Badge } from '../Badge/badge'

export function SchedulePageHeader() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <Badge>Cronograma</Badge>

      <h1 className="mt-4 text-xl! font-bold leading-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl">
        Veja a agenda dos professores de forma clara e organizada.
      </h1>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base">
        Escolha um dia da semana para filtrar a visualização e encontre
        rapidamente sala, horário e professor.
      </p>
    </div>
  )
}
