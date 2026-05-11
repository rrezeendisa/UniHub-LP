import { useState } from 'react'
import { PersonIcon, HomeIcon, TimerIcon } from '@radix-ui/react-icons'
import { Button } from '../../components/Button/button'
import { MenuCard } from '../../components/Menu/menu-card'
import { Select } from '../../components/Select/select'
import { SelectItem } from '../../components/Select/select-item'
import {
  InfoCard,
  InfoCardHeader,
  InfoCardTitle,
} from '../../components/InfoCard/info-card'
import { Badge } from '../../components/Badge/badge'
import { openFeedbackForm } from '../../utils/forms-redirect-utils'
import { schedulesMock, weekDays } from '../../mocks/cronograma-mocks'

function ScheduleCardItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
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

function ScheduleCard({
  classCode,
  className,
  teacher,
  location,
  schedule,
}: {
  classCode: string
  className: string
  teacher: string
  location: string
  schedule: string
}) {
  return (
    <InfoCard className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <InfoCardHeader className="items-center">
        <Badge>{classCode}</Badge>
      </InfoCardHeader>

      <InfoCardTitle className="mb-4 text-base font-bold text-[var(--color-text)]">
        {className}
      </InfoCardTitle>

      <div className="flex flex-col gap-3">
        <ScheduleCardItem
          icon={<PersonIcon />}
          label="Professor"
          value={teacher}
        />
        <ScheduleCardItem icon={<HomeIcon />} label="Sala" value={location} />
        <ScheduleCardItem
          icon={<TimerIcon />}
          label="Horário"
          value={schedule}
        />
      </div>
    </InfoCard>
  )
}

export function CronogramaPage() {
  const [selectedDay, setSelectedDay] = useState('')

  return (
    <>
      <div className="mb-4 px-8">
        <Button variant="primary" size="medium" onClick={openFeedbackForm}>
          Dê o seu feedback
        </Button>
      </div>
      <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row lg:gap-8">
          <aside className="w-full flex-shrink-0 lg:w-72 lg:min-w-[18rem]">
            <MenuCard />
          </aside>

          <main className="flex-1">
            <section className="rounded-3xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] p-6 shadow-sm sm:p-8 lg:p-6">
              <div className="mx-auto max-w-4xl text-center">
                <Badge>Cronograma</Badge>

                <h1 className="mt-4 text-xl! font-bold leading-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl">
                  Veja a agenda dos professores de forma clara e organizada.
                </h1>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base">
                  Escolha um dia da semana para filtrar a visualização e
                  encontre rapidamente sala, horário e professor.
                </p>
              </div>

              <div className="mt-8 mx-auto max-w-2xl">
                <Select
                  label="Selecione o dia"
                  value={selectedDay}
                  onChange={setSelectedDay}
                  placeholder="Escolha um dia da semana"
                  isObrigatorie
                >
                  {weekDays.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {schedulesMock.map((schedule) => (
                  <ScheduleCard
                    key={schedule.classCode}
                    classCode={schedule.classCode}
                    className={schedule.className}
                    teacher={schedule.teacher}
                    location={schedule.location}
                    schedule={schedule.schedule}
                  />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}
