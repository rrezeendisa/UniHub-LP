import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  CheckCircledIcon,
  Cross2Icon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons'

type ToastType = 'success' | 'warning' | 'error'

interface ToastProps {
  type: ToastType
  children: ReactNode
  onClose?: () => void
  duration?: number
}

const toastConfig: Record<
  ToastType,
  {
    icon: ReactNode
    tone: string
  }
> = {
  success: {
    icon: <CheckCircledIcon className="h-5 w-5 shrink-0" />,
    tone: 'var(--color-success)',
  },
  warning: {
    icon: <ExclamationTriangleIcon className="h-5 w-5 shrink-0" />,
    tone: 'var(--color-warning)',
  },
  error: {
    icon: <CrossCircledIcon className="h-5 w-5 shrink-0" />,
    tone: 'var(--color-error)',
  },
}

export function Toast({
  type,
  children,
  onClose,
  duration = 3000,
}: ToastProps) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setOpen(false)
    }, duration)

    return () => window.clearTimeout(timeoutId)
  }, [duration])

  useEffect(() => {
    if (!open) {
      onClose?.()
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  const { icon, tone } = toastConfig[type]
  const backgroundColor = `color-mix(in srgb, ${tone} 20%, transparent)`

  return (
    <div className="fixed left-1/2 top-4 z-[9999] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 px-4">
      <div
        role={type === 'error' ? 'alert' : 'status'}
        aria-live={type === 'error' ? 'assertive' : 'polite'}
        className="pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-200"
        style={{
          borderColor: tone,
          color: tone,
          backgroundColor,
        }}
      >
        <div className="shrink-0">{icon}</div>

        <div className="min-w-0 flex-1 text-sm font-semibold leading-5 text-current">
          {children}
        </div>

        <button
          type="button"
          aria-label="Fechar notificação"
          onClick={() => setOpen(false)}
          className="ml-2 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-current transition-colors duration-200 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-current/30"
        >
          <Cross2Icon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
