export function useTimeFormatting() {
  const formatDateToPtBr = (date: Date): string => {
    return date.toLocaleDateString('pt-BR')
  }

  const addHourToTime = (time: string): string => {
    const [h, m] = time.split(':').map(Number)
    const d = new Date()
    d.setHours(h + 1, m || 0, 0, 0)

    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')

    return `${hh}:${mm}`
  }

  return { formatDateToPtBr, addHourToTime }
}
