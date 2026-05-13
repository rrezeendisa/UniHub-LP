import { ScheduleCard } from '../ScheduleCard/schedule-card'
import type { ScheduleItem } from '../../mocks/cronograma-mocks'
import type { ScheduleCardItemConfig } from '../../constants/schedule-card-items'

interface SchedulesGridProps {
  schedules: ScheduleItem[]
  itemsConfig: ScheduleCardItemConfig[]
}

export function SchedulesGrid({ schedules, itemsConfig }: SchedulesGridProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {schedules.map((schedule) => (
        <ScheduleCard
          key={schedule.classCode}
          schedule={schedule}
          itemsConfig={itemsConfig}
        />
      ))}
    </div>
  )
}
