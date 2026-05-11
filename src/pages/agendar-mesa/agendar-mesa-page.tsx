import { useState } from 'react'
import { MenuCard } from '../../components/Menu/menu-card'
import { ReservationTableModal } from '../../components/Modal/reservation-table-modal'
import { Toast } from '../../components/Toast/toast'
import { tablesMock } from '../../mocks/agendar-mesa-mock'
import { getAvailableTablesBySide } from '../../utils/agendar-mesa-utils'
import { Badge } from '../../components/Badge/badge'
import { Button } from '../../components/Button/button'
import { openFeedbackForm } from '../../utils/forms-redirect-utils'

interface TableSectionProps {
  side: 'left' | 'right'
  tables: typeof tablesMock
  onTableSelect: (tableName: string) => void
}

function TableSection({ side, tables, onTableSelect }: TableSectionProps) {
  const availableTables = getAvailableTablesBySide(tables, side)
  const sideLabel = side === 'left' ? 'esquerda' : 'direita'
  const firstAvailable = availableTables.find((table) => table.isAvailable)

  return (
    <button
      type="button"
      onClick={() => {
        if (firstAvailable) {
          onTableSelect(firstAvailable.name)
        }
      }}
      className={[
        'group flex min-h-[260px] w-full items-center justify-center rounded-2xl border-2 border-transparent',
        'bg-[var(--color-hover-menu)]/60 p-5 transition-all duration-200',
        'hover:-translate-y-0.5 hover:border-[var(--color-hover-menu)] hover:bg-opacity-70 hover:shadow-md',
        'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
        'sm:min-h-[320px] lg:min-h-[380px]',
        firstAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-70',
      ].join(' ')}
      aria-label={`Selecionar mesa do lado ${sideLabel}`}
      disabled={!firstAvailable}
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

interface TableContainerProps {
  tables: typeof tablesMock
  onTableSelect: (tableName: string) => void
}

function TableContainer({ tables, onTableSelect }: TableContainerProps) {
  return (
    <div className="rounded-2xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
        <TableSection
          side="left"
          tables={tables}
          onTableSelect={onTableSelect}
        />
        <div className="flex min-h-[72px] items-center justify-center rounded-2xl border border-dashed border-[var(--color-gray-light)] bg-[var(--color-bg)] px-4 py-3">
          <span className="text-sm font-medium text-[var(--color-text-muted)] sm:text-base">
            Recepção
          </span>
        </div>
        <TableSection
          side="right"
          tables={tables}
          onTableSelect={onTableSelect}
        />
      </div>
    </div>
  )
}

interface HeaderProps {
  children: React.ReactNode
}

function Header({ children }: HeaderProps) {
  return <div className="text-center">{children}</div>
}

export function AgendarMesaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTable, setSelectedTable] = useState<string>('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleTableSelect = (tableName: string) => {
    setSelectedTable(tableName)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedTable('')
  }

  const handleReservationSubmit = (data: {
    name: string
    date: Date | null
    time: string
  }) => {
    const tableName = selectedTable

    console.log('Reservation data:', {
      ...data,
      table: tableName,
    })

    setIsModalOpen(false)
    setSelectedTable('')
    setToastMessage(`${tableName} agendada com sucesso!`)
  }

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {toastMessage && (
        <Toast type="success" onClose={() => setToastMessage(null)}>
          {toastMessage}
        </Toast>
      )}

      <div className="mb-4">
        <Button variant="primary" size="medium" onClick={openFeedbackForm}>
          Dê o seu feedback
        </Button>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row lg:gap-8">
        <aside className="w-full flex-shrink-0 lg:w-72 lg:min-w-[18rem]">
          <MenuCard />
        </aside>

        <main className="flex-1">
          <section className="rounded-3xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] p-6 shadow-sm sm:p-8 lg:p-6">
            <Header>
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
            </Header>

            <div className="mt-8 sm:mt-10">
              <TableContainer
                tables={tablesMock}
                onTableSelect={handleTableSelect}
              />
            </div>
          </section>

          <ReservationTableModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            tableName={selectedTable}
            onSubmit={handleReservationSubmit}
          />
        </main>
      </div>
    </div>
  )
}
