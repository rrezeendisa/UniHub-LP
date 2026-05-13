import { Modal } from './modal'
import { TextInput } from '../Input/text-input'
import { Calendar } from '../Calendar/calendar'
import { Select } from '../Select/select'
import { SelectItem } from '../Select/select-item'
import { Button } from '../Button/button'
import { ButtonSpinner } from '../ButtonSpinner/button-spinner'
import {
  useReservationTableForm,
  type ReservationData,
} from '../../hooks/useReservationTableForm'

interface ReservationTableModalProps {
  isOpen: boolean
  onClose: () => void
  tableName: string
  onSubmit: (data: ReservationData) => void | Promise<void>
  availableTimes?: string[]
}

export function ReservationTableModal({
  isOpen,
  onClose,
  tableName,
  onSubmit,
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
}: ReservationTableModalProps) {
  const {
    name,
    setName,
    date,
    setDate,
    time,
    setTime,
    isSubmitting,
    canSubmit,
    handleSubmit,
  } = useReservationTableForm({
    isOpen,
    onClose,
    onSubmit,
  })

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
        <TextInput
          label="Nome"
          value={name}
          onChange={setName}
          isObrigatorie
          disabled={isSubmitting}
        />

        <div>
          <Calendar
            selected={date}
            onChange={setDate}
            label="Data"
            isObrigatorie
            disabled={isSubmitting}
          />
        </div>

        <div className={isSubmitting ? 'pointer-events-none opacity-60' : ''}>
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
        </div>

        <div className="flex justify-center">
          <Button
            variant="primary"
            size="large"
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="min-w-[160px]"
          >
            {isSubmitting ? <ButtonSpinner /> : 'Reservar mesa'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
