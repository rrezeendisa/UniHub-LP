import { useState } from 'react'
import { PersonIcon } from '@radix-ui/react-icons'
import { MenuCard } from '../../components/Menu/menu-card'
import { Toast } from '../../components/Toast/toast'
import { InfoCard, InfoCardHeader } from '../../components/InfoCard/info-card'
import { ReservationRoomModal } from '../../components/Modal/reservation-room-modal'
import { roomsMock, type RoomReservation } from '../../mocks/agendar-sala-mock'
import {
  getRoomsByBuilding,
  sortRoomsByClassName,
} from '../../utils/agendar-sala-utils'
import { Badge } from '../../components/Badge/badge'
import { openFeedbackForm } from '../../utils/forms-redirect-utils'
import { Button } from '../../components/Button/button'

function RoomCard({
  room,
  onSelect,
}: {
  room: RoomReservation
  onSelect: (roomName: string) => void
}) {
  const hasResources = room.resources.length > 0

  return (
    <button
      type="button"
      onClick={() => onSelect(room.className)}
      className="group h-full w-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
      aria-label={`Reservar sala ${room.className}`}
    >
      <InfoCard className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
        <InfoCardHeader badge={room.className} className="mb-5" />

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-muted)]">
              Recursos
            </p>

            {hasResources ? (
              <ul className="mt-2 flex flex-col gap-1.5">
                {room.resources.map((resource) => (
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
                places
              </span>
              <span className="text-[var(--color-text-muted)]">
                {`: ${room.places}`}
              </span>
            </p>
          </div>
        </div>
      </InfoCard>
    </button>
  )
}

export function AgendarSalaPage() {
  const [selectedRoom, setSelectedRoom] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const rooms = sortRoomsByClassName(getRoomsByBuilding(roomsMock, 'L'))

  const handleRoomSelect = (roomName: string) => {
    setSelectedRoom(roomName)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedRoom('')
  }

  const handleReservationSubmit = async (data: {
    name: string
    date: string
    time: string
    justification: string
  }) => {
    const roomName = selectedRoom

    console.log('Reservation data:', {
      ...data,
      room: roomName,
    })

    setIsModalOpen(false)
    setSelectedRoom('')
    setToastMessage(`Sala ${roomName} reservada com sucesso!`)
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
            <div className="mx-auto max-w-4xl text-center">
              <div className="flex-col gap-4">
                <div className="mb-4">
                  <Badge>Reserva de sala</Badge>
                </div>

                <div className="space-y-3">
                  <p className="text-[20px] leading-8 text-[var(--color-text)] sm:text-[22px]">
                    <strong>
                      Reserve uma sala para aulas, estudos, reuniões ou
                      mentorias.
                    </strong>
                  </p>
                  <p className="text-[20px] leading-8 text-[var(--color-text)] sm:text-[22px]">
                    Por enquanto, o sistema permite o agendamento apenas para
                    salas localizadas no <strong>prédio L</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onSelect={handleRoomSelect}
                  />
                ))}
              </div>
            </div>
          </section>

          <ReservationRoomModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            roomName={selectedRoom}
            onSubmit={handleReservationSubmit}
          />
        </main>
      </div>
    </div>
  )
}
