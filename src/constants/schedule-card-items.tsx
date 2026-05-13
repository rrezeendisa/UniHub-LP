import { PersonIcon, HomeIcon, TimerIcon } from '@radix-ui/react-icons'

export interface ScheduleCardItemConfig {
  icon: React.ReactNode
  label: string
  key: 'teacher' | 'location' | 'schedule'
}

export const SCHEDULE_CARD_ITEMS: ScheduleCardItemConfig[] = [
  {
    icon: <PersonIcon />,
    label: 'Professor',
    key: 'teacher',
  },
  {
    icon: <HomeIcon />,
    label: 'Sala',
    key: 'location',
  },
  {
    icon: <TimerIcon />,
    label: 'Horário',
    key: 'schedule',
  },
]