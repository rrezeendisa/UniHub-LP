import { useState } from 'react'
import { CalendarIcon, ClockIcon } from '@radix-ui/react-icons'
import { MenuCard } from '../../components/Menu/menu-card'
import { Toast } from '../../components/Toast/toast'
import { Button } from '../../components/Button/button'
import { InfoCard, InfoCardHeader } from '../../components/InfoCard/info-card'
import { CancelationModal } from '../../components/Modal/cancelation-modal'
import {
  meusAgendamentosMock,
  type MeusAgendamentosReservation,
} from '../../mocks/meus-agendamentos-mock'
import {
  formatTimeRange,
  sortReservationsByDate,
} from '../../utils/meus-agendamentos-utils'
import { Badge } from '../../components/Badge/badge'
import { openFeedbackForm } from '../../utils/forms-redirect-utils'

function ReservationCard({
  reservation,
  onCancelClick,
}: {
  reservation: MeusAgendamentosReservation
  onCancelClick: (reservation: MeusAgendamentosReservation) => void
}) {
  return (
    <InfoCard className="group h-full flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <InfoCardHeader
          badge={reservation.reservationName}
          badgeClassName="mx-auto"
          className="mb-5"
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]" />
            <div className="min-w-0 text-xs sm:text-sm text-[var(--color-text-muted)]">
              <span className="font-semibold text-[var(--color-text)]">
                Data:
              </span>
              <span className="ml-1 text-[var(--color-text-muted)]">
                {reservation.date}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]" />
            <div className="min-w-0 text-xs sm:text-sm text-[var(--color-text-muted)]">
              <span className="font-semibold text-[var(--color-text)]">
                Horário:
              </span>
              <span className="ml-1 text-[var(--color-text-muted)]">
                {formatTimeRange(reservation.startTime, reservation.endTime)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <Button
          variant="outline"
          size="medium"
          onClick={() => onCancelClick(reservation)}
        >
          Cancelar
        </Button>
      </div>
    </InfoCard>
  )
}

export function MeusAgendamentosPage() {
  const [reservations, setReservations] =
    useState<MeusAgendamentosReservation[]>(meusAgendamentosMock)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] =
    useState<MeusAgendamentosReservation | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const sortedReservations = sortReservationsByDate(reservations)

  const handleCancelClick = (reservation: MeusAgendamentosReservation) => {
    setSelectedReservation(reservation)
    setIsCancelModalOpen(true)
  }

  const handleCancelConfirm = async () => {
    if (!selectedReservation) return
    try {
      setIsLoading(true)
      await new Promise((r) => setTimeout(r, 500))
      setReservations((prev) =>
        prev.filter((res) => res.id !== selectedReservation.id)
      )
      setToastMessage(
        `Reserva ${selectedReservation.reservationName} cancelada com sucesso!`
      )
    } finally {
      setIsLoading(false)
      setIsCancelModalOpen(false)
      setSelectedReservation(null)
    }
  }

  const handleCancelClose = () => {
    setIsCancelModalOpen(false)
    setSelectedReservation(null)
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
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4">
                <Badge>Meus agendamentos</Badge>
              </div>

              <h1 className="mt-4 text-xl! font-bold leading-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl">
                Veja seus agendamentos disponíveis.
              </h1>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base">
                Se organize e cancele quando quiser. Cada cancelamento é
                imediato e libera o espaço para outros usuários.
              </p>
            </div>

            {sortedReservations.length === 0 ? (
              <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-gray-light)] bg-[var(--color-bg)] px-6 py-12 sm:py-16 text-center">
                <CalendarIcon className="mb-3 h-12 w-12 text-[var(--color-text-muted)]/50" />
                <p className="text-lg font-semibold text-[var(--color-text)]">
                  Nenhum agendamento no momento
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Comece a reservar mesas e salas para organizar seus
                  compromissos.
                </p>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {sortedReservations.map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                    onCancelClick={handleCancelClick}
                  />
                ))}
              </div>
            )}
          </section>

          <CancelationModal
            isOpen={isCancelModalOpen}
            onClose={handleCancelClose}
            onConfirm={handleCancelConfirm}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  )
}
