import type { MeusAgendamentosReservation } from '../../mocks/meus-agendamentos-mock'
import { ReservationCard } from '../ReservationCard/reservation-card'
import { EmptySchedule } from '../empty-schedule/empty-schedule'

interface ReservationsListProps {
  reservations: MeusAgendamentosReservation[]
  onCancel: (reservation: MeusAgendamentosReservation) => void
}

export function ReservationsList({
  reservations,
  onCancel,
}: ReservationsListProps) {
  if (reservations.length === 0) {
    return (
      <div className="mt-8">
        <EmptySchedule />
      </div>
    )
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservationName={reservation.reservationName}
          date={reservation.date}
          startTime={reservation.startTime}
          endTime={reservation.endTime}
          onCancel={() => onCancel(reservation)}
        />
      ))}
    </div>
  )
}
