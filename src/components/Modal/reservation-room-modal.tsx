import { useCallback, useEffect, useState } from 'react'
import { Modal } from './modal'
import { TextInput } from '../Input/text-input'
import { Calendar } from '../Calendar/calendar'
import { Select } from '../Select/select'
import { SelectItem } from '../Select/select-item'
import { Button } from '../Button/button'

interface ReservationData {
  name: string
  date: string
  time: string
  justification: string
}

interface ReservationRoomModalProps {
  isOpen: boolean
  onClose: () => void
  roomName: string
  onSubmit: (data: ReservationData) => void | Promise<void>
  isLoading?: boolean
  availableTimes?: string[]
}

function formatDateToPtBr(date: Date) {
  return date.toLocaleDateString('pt-BR')
}

export function ReservationRoomModal({
  isOpen,
  onClose,
  roomName,
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
  const [justification, setJustification] = useState('')

  const clearForm = useCallback(() => {
    setName('')
    setDate(null)
    setTime('')
    setJustification('')
  }, [])

  useEffect(() => {
    if (!isOpen) {
      clearForm()
    }
  }, [isOpen, clearForm])

  const canSubmit =
    !!name.trim() && !!date && !!time && !!justification.trim() && !isLoading

  const handleSubmit = useCallback(
    async (e?: React.SyntheticEvent) => {
      e?.preventDefault()

      if (!canSubmit || !date) return

      await Promise.resolve(
        onSubmit({
          name: name.trim(),
          date: formatDateToPtBr(date),
          time,
          justification: justification.trim(),
        })
      )

      clearForm()
      onClose()
    },
    [canSubmit, clearForm, date, justification, name, onClose, onSubmit, time]
  )

  return (
    <Modal
      title={`Reserva da sala ${roomName}`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput label="Nome" value={name} onChange={setName} isObrigatorie />

        <div>
          <Calendar
            selected={date}
            onChange={setDate}
            label="Data"
            isObrigatorie
          />
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

        <TextInput
          label="Justificativa"
          value={justification}
          onChange={setJustification}
          isObrigatorie
        />

        <div className="flex justify-center">
          <Button
            variant="primary"
            size="large"
            type="submit"
            disabled={!canSubmit}
          >
            Reservar mesa
          </Button>
        </div>
      </form>
    </Modal>
  )
}
