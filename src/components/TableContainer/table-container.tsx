import { TableSection } from '../TableSection/table-section'
import { getAvailableTablesBySide } from '../../utils/agendar-mesa-utils'
import type { TableReservation } from '../../mocks/agendar-mesa-mock'

interface TableContainerProps {
  tables: TableReservation[]
  onTableSelect: (tableName: string) => void
}

export function TableContainer({ tables, onTableSelect }: TableContainerProps) {
  const leftAvailable = getAvailableTablesBySide(tables, 'left').some(
    (t) => t.isAvailable
  )
  const rightAvailable = getAvailableTablesBySide(tables, 'right').some(
    (t) => t.isAvailable
  )

  const leftFirstAvailable = getAvailableTablesBySide(tables, 'left').find(
    (t) => t.isAvailable
  )
  const rightFirstAvailable = getAvailableTablesBySide(tables, 'right').find(
    (t) => t.isAvailable
  )

  return (
    <div className="rounded-2xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
        <TableSection
          side="left"
          isAvailable={leftAvailable}
          onSelect={() =>
            leftFirstAvailable && onTableSelect(leftFirstAvailable.name)
          }
        />

        <div className="flex min-h-[72px] items-center justify-center rounded-2xl border border-dashed border-[var(--color-gray-light)] bg-[var(--color-bg)] px-4 py-3">
          <span className="text-sm font-medium text-[var(--color-text-muted)] sm:text-base">
            Recepção
          </span>
        </div>

        <TableSection
          side="right"
          isAvailable={rightAvailable}
          onSelect={() =>
            rightFirstAvailable && onTableSelect(rightFirstAvailable.name)
          }
        />
      </div>
    </div>
  )
}
