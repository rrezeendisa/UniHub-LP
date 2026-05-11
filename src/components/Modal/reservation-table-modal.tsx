import { useCallback, useMemo, useState } from 'react'
import { Modal } from './modal'
import { TextInput } from '../Input/text-input'
import { Calendar } from '../Calendar/calendar'
import { Select } from '../Select/select'
import { SelectItem } from '../Select/select-item'
import { Button } from '../Button/button'

interface ReservationData {
  name: string
  date: Date | null
  time: string
}

interface ReservationRoomModalProps {
  isOpen: boolean
  onClose: () => void
  tableName: string
  onSubmit: (data: ReservationData) => void | Promise<void>
  isLoading?: boolean
  availableTimes?: string[]
}

export function ReservationTableModal({
  isOpen,
  onClose,
  tableName,
  onSubmit,
  isLoading = false,
  availableTimes = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
  ],
}: ReservationRoomModalProps) {
  const [name, setName] = useState('')
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isBusy = isLoading || isSubmitting
  const canSubmit = !!name && !!date && !!time && !isBusy

  const clearForm = useCallback(() => {
    setName('')
    setDate(null)
    setTime('')
  }, [])

  const handleSubmit = useCallback(
    async (e?: React.SyntheticEvent) => {
      e?.preventDefault()
      if (!canSubmit) return

      try {
        setIsSubmitting(true)
        await Promise.resolve(onSubmit({ name, date, time }))
        clearForm()
      } finally {
        setIsSubmitting(false)
      }
    },
    [canSubmit, onSubmit, name, date, time, clearForm]
  )

  const buttonLabel = useMemo(
    () => (isBusy ? 'Enviando...' : 'Reservar mesa'),
    [isBusy]
  )

  return (
    <Modal
      title={
        <span className="flex flex-col items-center leading-tight">
          <span>Reserva da Mesa de estudos individual</span>
          <span>{tableName}</span>
        </span>
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput label="Nome" value={name} onChange={setName}  isObrigatorie/>
        <div>
          <Calendar selected={date} onChange={setDate} label="Data" isObrigatorie />
        </div>
        <Select
          label="Horário"
          value={time}
          onChange={setTime}
          placeholder="Selecione um horário"
          isObrigatorie
        >
          {availableTimes.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </Select>
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="large"
            disabled={!canSubmit}
            onClick={() => handleSubmit()}
          >
            {buttonLabel}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
