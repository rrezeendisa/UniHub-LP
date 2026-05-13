import { InfoCard, InfoCardHeader, InfoCardTitle } from '../InfoCard/info-card'
import { Badge } from '../Badge/badge'
import { ScheduleCardItem } from '../ScheduleCardItem/schedule-card-item'
import type { ScheduleItem } from '../../mocks/cronograma-mocks'
import type { ScheduleCardItemConfig } from '../../constants/schedule-card-items'

interface ScheduleCardProps {
  schedule: ScheduleItem
  itemsConfig: ScheduleCardItemConfig[]
}

export function ScheduleCard({ schedule, itemsConfig }: ScheduleCardProps) {
  return (
    <InfoCard className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <InfoCardHeader className="items-center">
        <Badge>{schedule.classCode}</Badge>
      </InfoCardHeader>

      <InfoCardTitle className="mb-4 text-base font-bold text-[var(--color-text)]">
        {schedule.className}
      </InfoCardTitle>

      <div className="flex flex-col gap-3">
        {itemsConfig.map((config) => {
          const { key, ...rest } = config
          return (
            <ScheduleCardItem
              key={key}
              {...(rest as typeof rest)}
              value={schedule[key as keyof typeof schedule]}
            />
          )
        })}
      </div>
    </InfoCard>
  )
}
