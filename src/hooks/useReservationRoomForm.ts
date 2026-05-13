import { useCallback, useEffect, useMemo, useState } from 'react'

export interface ReservationData {
  name: string
  date: string
  time: string
  justification: string
}

interface UseReservationRoomFormParams {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ReservationData) => void | Promise<void>
}

function formatDateToPtBr(date: Date) {
  return date.toLocaleDateString('pt-BR')
}

export function useReservationRoomForm({
  isOpen,
  onClose,
  onSubmit,
}: UseReservationRoomFormParams) {
  const [name, setName] = useState('')
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')
  const [justification, setJustification] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const clearForm = useCallback(() => {
    setName('')
    setDate(null)
    setTime('')
    setJustification('')
  }, [])

  useEffect(() => {
    if (!isOpen) {
      clearForm()
      setIsSubmitting(false)
    }
  }, [isOpen, clearForm])

  const canSubmit = useMemo(
    () =>
      !!name.trim() &&
      !!date &&
      !!time &&
      !!justification.trim() &&
      !isSubmitting,
    [date, isSubmitting, justification, name, time]
  )

  const handleSubmit = useCallback(
    async (event?: React.SyntheticEvent) => {
      event?.preventDefault()

      if (!date || !canSubmit) return

      setIsSubmitting(true)

      try {
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
      } finally {
        setIsSubmitting(false)
      }
    },
    [canSubmit, clearForm, date, justification, name, onClose, onSubmit, time]
  )

  return {
    name,
    setName,
    date,
    setDate,
    time,
    setTime,
    justification,
    setJustification,
    isSubmitting,
    canSubmit,
    handleSubmit,
    clearForm,
  }
}
