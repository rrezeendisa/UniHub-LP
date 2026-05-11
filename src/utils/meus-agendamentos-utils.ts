import type { MeusAgendamentosReservation } from '../../../mocks/meus-agendamentos-mock'

export const formatTimeRange = (startTime: string, endTime: string): string => {
  const [startHour] = startTime.split(':')
  const [endHour] = endTime.split(':')
  return `${startHour}h-${endHour}h`
}

export const sortReservationsByDate = (
  reservations: MeusAgendamentosReservation[]
): MeusAgendamentosReservation[] => {
  return [...reservations].sort((a, b) => {
    const [da, ma, ya] = a.date.split('/')
    const [db, mb, yb] = b.date.split('/')
    const daObj = new Date(Number(ya), Number(ma) - 1, Number(da))
    const dbObj = new Date(Number(yb), Number(mb) - 1, Number(db))
    return daObj.getTime() - dbObj.getTime()
  })
}
