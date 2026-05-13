import { useState, useEffect } from 'react'
import { Button } from '../../components/Button/button'
import { MenuCard } from '../../components/Menu/menu-card'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'
import { SchedulePageHeader } from '../../components/SchedulePageHeader/schedule-page-header'
import { DaySelector } from '../../components/DaySelector/day-selector'
import { SchedulesGrid } from '../../components/SchedulesGrid/schedules-grid'
import { openFeedbackForm } from '../../utils/forms-redirect-utils'
import { schedulesMock, weekDays } from '../../mocks/cronograma-mocks'
import { SCHEDULE_CARD_ITEMS } from '../../constants/schedule-card-items'
import { useScheduleFilter } from '../../hooks/useScheduleFilter'

function FeedbackButton() {
  return (
    <div className="mb-4">
      <Button variant="primary" size="medium" onClick={openFeedbackForm}>
        Dê o seu feedback
      </Button>
    </div>
  )
}

export function CronogramaPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { selectedDay, setSelectedDay, filteredSchedules } =
    useScheduleFilter(schedulesMock)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 250)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Carregando..." />
  }

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row lg:gap-8">
        <aside className="w-full flex-shrink-0 lg:w-72 lg:min-w-[18rem]">
          <FeedbackButton />
          <MenuCard />
        </aside>

        <main className="flex-1">
          <section className="rounded-3xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] p-6 shadow-sm sm:p-8 lg:p-6">
            <SchedulePageHeader />

            <div className="mt-8">
              <DaySelector
                selectedDay={selectedDay}
                onDayChange={setSelectedDay}
                weekDays={weekDays}
              />
            </div>

            <SchedulesGrid
              schedules={filteredSchedules}
              itemsConfig={SCHEDULE_CARD_ITEMS}
            />
          </section>
        </main>
      </div>
    </div>
  )
}
