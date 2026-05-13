interface TableSectionProps {
  side: 'left' | 'right'
  isAvailable: boolean
  onSelect: () => void
}

export function TableSection({
  side,
  isAvailable,
  onSelect,
}: TableSectionProps) {
  const sideLabel = side === 'left' ? 'esquerda' : 'direita'

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!isAvailable}
      className={[
        'group flex min-h-[260px] w-full items-center justify-center rounded-2xl border-2 border-transparent',
        'bg-[var(--color-hover-menu)]/60 p-5 transition-all duration-200',
        'hover:-translate-y-0.5 hover:border-[var(--color-hover-menu)] hover:bg-opacity-70 hover:shadow-md',
        'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
        'sm:min-h-[320px] lg:min-h-[380px]',
        isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-70',
      ].join(' ')}
      aria-label={`Selecionar mesa do lado ${sideLabel}`}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-sm font-semibold text-[var(--color-text)] sm:text-base">
          Mesa de estudos
        </span>
        <span className="text-sm font-semibold text-[var(--color-text)] sm:text-base">
          individuais
        </span>
        <span className="text-sm font-semibold text-[var(--color-text)] sm:text-base">
          {sideLabel}
        </span>
      </div>
    </button>
  )
}
