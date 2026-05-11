interface BadgeProps {
  children: React.ReactNode
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-block text-center px-2 py-1 rounded-3xl border border-[#1D4ED8]/80 bg-[#2563EB]/30 text-[#2563EB] font-bold text-sm">
      {children}
    </span>
  )
}
