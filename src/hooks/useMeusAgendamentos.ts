import { useState, useEffect } from 'react'
import type { MeusAgendamentosReservation } from '../mocks/meus-agendamentos-mock'
import { getAllReservations } from '../utils/persistence'

export function useMeusAgendamentos() {
  const [reservations, setReservations] = useState<
    MeusAgendamentosReservation[]
  >(() => getAllReservations())

  useEffect(() => {
    const handler = () => setReservations(getAllReservations())
    window.addEventListener('meus-agendamentos:changed', handler)
    return () =>
      window.removeEventListener('meus-agendamentos:changed', handler)
  }, [])

  const removeReservation = (id: number) => {
    setReservations((prev) => prev.filter((res) => res.id !== id))
  }

  return { reservations, removeReservation }
}
