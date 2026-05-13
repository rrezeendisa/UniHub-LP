import { useState, useEffect } from 'react'
import { MenuCard } from '../../components/Menu/menu-card'
import { Toast } from '../../components/Toast/toast'
import { Button } from '../../components/Button/button'
import { CancelationModal } from '../../components/Modal/cancelation-modal'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'
import type { MeusAgendamentosReservation } from '../../mocks/meus-agendamentos-mock'
import { Badge } from '../../components/Badge/badge'
import { openFeedbackForm } from '../../utils/forms-redirect-utils'
import { useMeusAgendamentos } from '../../hooks/useMeusAgendamentos'
import { useCancelReservation } from '../../hooks/useCancelReservation'
import { sortReservationsByDate } from '../../utils/meus-agendamentos-utils'
import { ReservationsList } from '../../components/ReservationsList/reservations-list'

function PageHeader() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="mb-4">
        <Badge>Meus agendamentos</Badge>
      </div>

      <h1 className="mt-4 text-xl! font-bold leading-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl">
        Veja seus agendamentos disponíveis.
      </h1>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base">
        Se organize e cancele quando quiser. Cada cancelamento é imediato e
        libera o espaço para outros usuários.
      </p>
    </div>
  )
}

export function MeusAgendamentosPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { reservations, removeReservation } = useMeusAgendamentos()
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] =
    useState<MeusAgendamentosReservation | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const { execute: cancelReservation, isLoading: isLoadingCancel } =
    useCancelReservation({
      onSuccess: (reservation) => {
        removeReservation(reservation.id)
        setToastMessage(
          `Reserva ${reservation.reservationName} cancelada com sucesso!`
        )
        setIsCancelModalOpen(false)
        setSelectedReservation(null)
      },
    })

  const sortedReservations = sortReservationsByDate(reservations)

  const handleCancelClick = (reservation: MeusAgendamentosReservation) => {
    setSelectedReservation(reservation)
    setIsCancelModalOpen(true)
  }

  const handleCancelConfirm = async () => {
    if (!selectedReservation) return
    await cancelReservation(selectedReservation)
  }

  const handleCancelClose = () => {
    setIsCancelModalOpen(false)
    setSelectedReservation(null)
  }

  if (isLoading) {
    return (
      <LoadingSpinner fullScreen message="Carregando..." />
    )
  }

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {toastMessage && (
        <Toast type="success" onClose={() => setToastMessage(null)}>
          {toastMessage}
        </Toast>
      )}

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row lg:gap-8">
        <aside className="w-full flex-shrink-0 lg:w-72 lg:min-w-[18rem]">
          <div className="mb-4">
            <Button variant="primary" size="medium" onClick={openFeedbackForm}>
              Dê o seu feedback
            </Button>
          </div>

          <MenuCard />
        </aside>

        <main className="flex-1">
          <section className="rounded-3xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] p-6 shadow-sm sm:p-8 lg:p-6">
            <PageHeader />

            <ReservationsList
              reservations={sortedReservations}
              onCancel={handleCancelClick}
            />
          </section>

          <CancelationModal
            isOpen={isCancelModalOpen}
            onClose={handleCancelClose}
            onConfirm={handleCancelConfirm}
            isLoading={isLoadingCancel}
          />
        </main>
      </div>
    </div>
  )
}
