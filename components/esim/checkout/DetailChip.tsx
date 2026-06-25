export function DetailChip({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType
  value: string
  label: string
}) {
  return (
    <div className='flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3'>
      <div className='grid size-8 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary'>
        <Icon className='size-4' />
      </div>
      <div>
        <p className='text-sm font-bold leading-tight'>{value}</p>
        <p className='font-mono text-[9px] uppercase tracking-wider text-muted-foreground'>
          {label}
        </p>
      </div>
    </div>
  )
}
