import React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

interface SelectItemProps {
  children: React.ReactNode
  value: string
}

export function SelectItem({ children, value }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      value={value}
      className="
        relative flex items-center px-8 py-2.5
        rounded-md
        text-[var(--color-text)]
        outline-none
        cursor-pointer
        transition-colors duration-150

        hover:bg-[var(--color-primary)]/10
        focus:bg-[var(--color-primary)]/10

        data-[state=checked]:bg-[var(--color-primary)]/20
        data-[state=checked]:text-[var(--color-primary)]
        data-[state=checked]:font-medium
      "
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}
