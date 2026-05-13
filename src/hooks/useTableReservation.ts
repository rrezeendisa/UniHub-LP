import { useState } from 'react'
import { addReservation } from '../utils/persistence'

interface ReservationData {
  name: string
  date: Date | null
  time: string
}

interface ReservationHandlers {
  onSuccess?: (tableName: string) => void
  onError?: (error: Error) => void
}

export function useTableReservation(
  tableName: string,
  handlers?: ReservationHandlers
) {
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (
    data: ReservationData,
    formatDateFn: (date: Date) => string,
    addHourFn: (time: string) => string
  ) => {
    try {
      setIsLoading(true)

      const dateStr = data.date ? formatDateFn(data.date) : ''

      addReservation({
        reservationName: tableName || data.name || 'Mesa',
        type: 'mesa',
        date: dateStr,
        startTime: data.time,
        endTime: addHourFn(data.time),
      })

      handlers?.onSuccess?.(tableName)
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      handlers?.onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }

  return { submit, isLoading }
}
