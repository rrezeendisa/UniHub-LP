export interface LoadingSpinnerProps {
  message?: string
  fullScreen?: boolean
}

export function LoadingSpinner({
  message = 'Carregando...',
  fullScreen = false,
}: LoadingSpinnerProps) {
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/20'
    : 'flex items-center justify-center py-12'

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <svg
            className="absolute inset-0 h-full w-full animate-spin text-[var(--color-primary)]"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.2"
            />
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="31.4 125.6"
              opacity="1"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-[var(--color-text)]">
          {message}
        </p>
      </div>
    </div>
  )
}
