import { useState, useEffect } from 'react'
import { MenuCard } from '../../components/Menu/menu-card'
import { Toast } from '../../components/Toast/toast'
import { Button } from '../../components/Button/button'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'
import { ReservationRoomModal } from '../../components/Modal/reservation-room-modal'
import { openFeedbackForm } from '../../utils/forms-redirect-utils'
import { useRoomAvailability } from '../../hooks/useRoomAvailability'
import { useTimeFormatting } from '../../hooks/useTimeFormatting'
import { useRoomReservation } from '../../hooks/useRoomReservation'
import { RoomsGrid } from '../../components/RoomsGrid/rooms-grid'
import { RoomPageHeader } from '../../components/RoomPageHeader/room-page-header'
import { roomsMock } from '../../mocks/agendar-sala-mock'

export function AgendarSalaPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRoom, setSelectedRoom] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const { refreshRooms, getAvailabilityMap } = useRoomAvailability()
  const { addHourToTime } = useTimeFormatting()
  const { submit: submitReservation } = useRoomReservation(selectedRoom, {
    onSuccess: () => {
      refreshRooms()
      setIsModalOpen(false)
      setSelectedRoom('')
      setToastMessage(`Sala ${selectedRoom} reservada com sucesso!`)
    },
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 250)
    return () => clearTimeout(timer)
  }, [])

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
    await submitReservation(data, addHourToTime)
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
            <RoomPageHeader />

            <div className="mt-8 sm:mt-10">
              <RoomsGrid
                rooms={roomsMock}
                availabilityMap={getAvailabilityMap()}
                onRoomSelect={handleRoomSelect}
              />
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
