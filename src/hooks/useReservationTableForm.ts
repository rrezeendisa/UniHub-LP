import { useCallback, useEffect, useMemo, useState } from 'react'

export interface ReservationData {
  name: string
  date: Date | null
  time: string
}

interface UseReservationTableFormParams {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ReservationData) => void | Promise<void>
}

export function useReservationTableForm({
  isOpen,
  onClose,
  onSubmit,
}: UseReservationTableFormParams) {
  const [name, setName] = useState('')
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const clearForm = useCallback(() => {
    setName('')
    setDate(null)
    setTime('')
  }, [])

  useEffect(() => {
    if (!isOpen) {
      clearForm()
      setIsSubmitting(false)
    }
  }, [isOpen, clearForm])

  const canSubmit = useMemo(
    () => Boolean(name.trim() && date && time && !isSubmitting),
    [date, isSubmitting, name, time]
  )

  const handleSubmit = useCallback(
    async (event?: React.SyntheticEvent) => {
      event?.preventDefault()

      if (!canSubmit) return

      setIsSubmitting(true)

      try {
        await Promise.resolve(onSubmit({ name: name.trim(), date, time }))
        clearForm()
        onClose()
      } finally {
        setIsSubmitting(false)
      }
    },
    [canSubmit, clearForm, date, name, onClose, onSubmit, time]
  )

  return {
    name,
    setName,
    date,
    setDate,
    time,
    setTime,
    isSubmitting,
    canSubmit,
    handleSubmit,
  }
}
