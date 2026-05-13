import { Button } from "../Button/button"

export type Action = {
  label: string
  href?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'secondary'
}

export function ActionButton({ a }: { a: Action }) {
  const mappedVariant = a.variant === 'secondary' ? 'outline' : 'primary'

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    try {
      a.onClick?.(e)
    } finally {
      if (a.href) {
        window.location.href = a.href
      }
    }
  }

  return (
    <Button variant={mappedVariant} size="medium" onClick={handleClick}>
      {a.label}
    </Button>
  )
}