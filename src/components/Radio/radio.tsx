import React from 'react'

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Radio({ label, id, className = '', ...props }: RadioProps) {
  const radioId = id || `radio-${Math.random().toString(36).slice(2, 9)}`

  return (
    <label
      htmlFor={radioId}
      className={`inline-flex items-center gap-3 cursor-pointer select-none ${className}`}
    >
      <input id={radioId} type="radio" className="peer sr-only" {...props} />

      <div
        className="
          relative w-5 h-5 rounded-full
          border border-[#cdcdcd] bg-[#d9d9d9]

          after:content-['']
          after:absolute
          after:top-1/2 after:left-1/2
          after:w-2.5 after:h-2.5
          after:rounded-full
          after:bg-[var(--color-primary)]
          after:-translate-x-1/2 after:-translate-y-1/2
          after:scale-0
          after:transition-transform

          peer-checked:after:scale-100
        "
      />

      <span className="text-base font-semibold text-[var(--color-primary)]">
        {label}
      </span>
    </label>
  )
}
