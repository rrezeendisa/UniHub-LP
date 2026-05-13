import { useState, useEffect } from 'react'
import { MenuCard } from '../../components/Menu/menu-card'
import { ReservationTableModal } from '../../components/Modal/reservation-table-modal'
import { Toast } from '../../components/Toast/toast'
import { Button } from '../../components/Button/button'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'
import { openFeedbackForm } from '../../utils/forms-redirect-utils'
import { useTableAvailability } from '../../hooks/useTableAvailability'
import { useTimeFormatting } from '../../hooks/useTimeFormatting'
import { useTableReservation } from '../../hooks/useTableReservation'
import { TableContainer } from '../../components/TableContainer/table-container'
import { PageTableHeader } from '../../components/PageTableHeader/page-table-header'

export function AgendarMesaPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTable, setSelectedTable] = useState<string>('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const { tables, refreshTables } = useTableAvailability()
  const { formatDateToPtBr, addHourToTime } = useTimeFormatting()
  const { submit: submitReservation } = useTableReservation(selectedTable, {
    onSuccess: () => {
      refreshTables()
      setIsModalOpen(false)
      setSelectedTable('')
      setToastMessage(`${selectedTable} agendada com sucesso!`)
    },
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 250)
    return () => clearTimeout(timer)
  }, [])

  const handleTableSelect = (tableName: string) => {
    setSelectedTable(tableName)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedTable('')
  }

  const handleReservationSubmit = async (data: {
    name: string
    date: Date | null
    time: string
  }) => {
    await submitReservation(data, formatDateToPtBr, addHourToTime)
  }

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Carregando..." />
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
            <PageTableHeader />

            <div className="mt-8 sm:mt-10">
              <TableContainer
                tables={tables}
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
