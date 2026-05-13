import { useState } from 'react'
import { InputBase } from './input-base'
import { EyeIcon } from '../../icons/lib/eye-icon'
import { EyeSlashIcon } from '../../icons/lib/eye-slash-icon'

export function PasswordInput({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}) {
  const [show, setShow] = useState(false)

  return (
    <InputBase
      isObrigatorie
      label={label}
      value={value}
      onChange={onChange}
      type={show ? 'text' : 'password'}
      disabled={disabled}
      rightElement={
        <span onClick={() => setShow(!show)}>
          {show ? <EyeIcon /> : <EyeSlashIcon />}
        </span>
      }
    />
  )
}
