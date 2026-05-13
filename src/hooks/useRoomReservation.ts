import { useState } from 'react'
import { addReservation } from '../utils/persistence'

interface RoomReservationData {
  name: string
  date: string
  time: string
  justification: string
}

interface RoomReservationHandlers {
  onSuccess?: (roomName: string) => void
  onError?: (error: Error) => void
}

export function useRoomReservation(
  roomName: string,
  handlers?: RoomReservationHandlers
) {
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (
    data: RoomReservationData,
    addHourFn: (time: string) => string
  ) => {
    try {
      setIsLoading(true)

      addReservation({
        reservationName: roomName || data.name || 'Sala',
        type: 'sala',
        date: data.date,
        startTime: data.time,
        endTime: addHourFn(data.time),
      })

      handlers?.onSuccess?.(roomName)
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      handlers?.onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }

  return { submit, isLoading }
}
