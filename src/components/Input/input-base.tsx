import React from 'react'

interface InputBaseProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  leftIcon?: React.ReactNode
  rightElement?: React.ReactNode
  isObrigatorie?: boolean
}

export function InputBase({
  label,
  value,
  onChange,
  type = 'text',
  leftIcon,
  rightElement,
  isObrigatorie = false,
}: InputBaseProps) {
  return (
    <div className="input-container">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {leftIcon}
        </div>
      )}

      <input
        type={type}
        value={value}
        placeholder=" "
        onChange={(e) => onChange(e.target.value)}
        className={[
          'input-field',
          leftIcon ? 'pl-10' : '',
          rightElement ? 'pr-10' : '',
        ].join(' ')}
      />

      <label className="input-label">
        {label}
        {isObrigatorie && <span className="text-red-600 ml-1">*</span>}
      </label>

      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
          {rightElement}
        </div>
      )}
    </div>
  )
}
