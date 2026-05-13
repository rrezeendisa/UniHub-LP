import { Select } from '../Select/select'
import { SelectItem } from '../Select/select-item'

interface DaySelectorProps {
  selectedDay: string
  onDayChange: (day: string) => void
  weekDays: string[]
}

export function DaySelector({
  selectedDay,
  onDayChange,
  weekDays,
}: DaySelectorProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <Select
        label="Selecione o dia"
        value={selectedDay}
        onChange={onDayChange}
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
  )
}
