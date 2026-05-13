import { useState, useMemo } from 'react'
import type { ScheduleItem } from '../mocks/cronograma-mocks'

interface UseScheduleFilterResult {
  selectedDay: string
  setSelectedDay: (day: string) => void
  filteredSchedules: ScheduleItem[]
}

export function useScheduleFilter(
  schedules: ScheduleItem[]
): UseScheduleFilterResult {
  const [selectedDay, setSelectedDay] = useState('')

  const filteredSchedules = useMemo(() => {
    if (!selectedDay) return schedules
    return schedules
  }, [schedules, selectedDay])

  return {
    selectedDay,
    setSelectedDay,
    filteredSchedules,
  }
}
