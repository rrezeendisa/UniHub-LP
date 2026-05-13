import type { ScheduleCardItemConfig } from '../../constants/schedule-card-items'

interface ScheduleCardItemProps extends ScheduleCardItemConfig {
  value: string
}

export function ScheduleCardItem({
  icon,
  label,
  value,
}: ScheduleCardItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-3 w-3 flex-shrink-0 text-[var(--color-text-muted)]">
        {icon}
      </div>
      <div className="min-w-0 flex flex-col">
        <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
        <p className="truncate text-xs font-medium text-[var(--color-text-muted)]">
          {value}
        </p>
      </div>
    </div>
  )
}
