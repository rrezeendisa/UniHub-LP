import { InputBase } from './input-base'

interface TextInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
  isObrigatorie?: boolean
  disabled?: boolean
}

export function TextInput({
  label,
  value,
  onChange,
  icon,
  isObrigatorie,
  disabled,
}: TextInputProps) {
  return (
    <InputBase
      label={label}
      value={value}
      onChange={onChange}
      leftIcon={icon}
      isObrigatorie={isObrigatorie}
      disabled={disabled}
    />
  )
}
