interface Props {
  label: string
}

export function DateSeparator({ label }: Props) {
  return (
    <div className="flex items-center justify-center py-2">
      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-muted shadow-sm">
        {label}
      </span>
    </div>
  )
}
