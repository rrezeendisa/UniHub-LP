import { useState } from 'react'
import type { MeusAgendamentosReservation } from '../mocks/meus-agendamentos-mock'
import {
  loadPersistedReservations,
  savePersistedReservations,
  addCanceledMockId,
} from '../utils/persistence'

interface CancelReservationHandler {
  onSuccess?: (reservation: MeusAgendamentosReservation) => void
  onError?: (error: Error) => void
}

export function useCancelReservation(handlers?: CancelReservationHandler) {
  const [isLoading, setIsLoading] = useState(false)

  const execute = async (reservation: MeusAgendamentosReservation) => {
    try {
      setIsLoading(true)
      await new Promise((r) => setTimeout(r, 500))

      const isMockReservation = reservation.id < 100000

      if (isMockReservation) {
        addCanceledMockId(reservation.id)
      } else {
        const persisted = loadPersistedReservations().filter(
          (p) => p.id !== reservation.id
        )
        savePersistedReservations(persisted)
      }

      window.dispatchEvent(new Event('meus-agendamentos:changed'))
      handlers?.onSuccess?.(reservation)
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      handlers?.onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }

  return { execute, isLoading }
}
