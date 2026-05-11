import { InputBase } from './input-base'

interface TextInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
  isObrigatorie?: boolean
}

export function TextInput({
  label,
  value,
  onChange,
  icon,
  isObrigatorie,
}: TextInputProps) {
  return (
    <InputBase
      label={label}
      value={value}
      onChange={onChange}
      leftIcon={icon}
      isObrigatorie={isObrigatorie}
    />
  )
}
