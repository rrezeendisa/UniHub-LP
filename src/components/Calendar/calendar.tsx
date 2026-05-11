// src/components/Calendar/calendar.tsx
import { useCallback } from 'react'
import DatePicker from 'react-datepicker'
import { registerLocale } from 'react-datepicker'
import { ptBR } from 'date-fns/locale/pt-BR'
import 'react-datepicker/dist/react-datepicker.css'
import './calendar.css'

registerLocale('pt-BR', ptBR)

interface CalendarProps {
  selected: Date | null
  onChange: (date: Date | null) => void
  label?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  placeholderText?: string
  isObrigatorie?: boolean
}

export function Calendar({
  selected,
  onChange,
  label = 'Selecione uma data',
  disabled = false,
  minDate,
  maxDate,
  placeholderText = 'dd/mm/yyyy',
  isObrigatorie = false,
}: CalendarProps) {
  const handleChange = useCallback(
    (date: Date | null) => {
      onChange(date)
    },
    [onChange]
  )

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    e.preventDefault()
  }, [])

  return (
    <div className="calendar-container">
      {label && (
        <label className="calendar-label">
          {label}
          {isObrigatorie && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <DatePicker
        selected={selected}
        onChange={handleChange}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText={placeholderText}
        dateFormat="dd/MM/yyyy"
        locale="pt-BR"
        className="calendar-input"
        wrapperClassName="calendar-wrapper"
        calendarClassName="calendar-popup"
        popperClassName="calendar-popper"
        popperPlacement="bottom-start"
        showPopperArrow={false}
        todayButton="Hoje"
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
