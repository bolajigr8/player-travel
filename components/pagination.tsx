'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Pagination({
  page,
  totalPages,
  onPage,
}: {
  page: number
  totalPages: number
  onPage: (p: number) => void
}) {
  if (totalPages <= 1) return null

  const pages: (number | '…')[] = []
  const add = (n: number) => {
    if (!pages.includes(n)) pages.push(n)
  }

  add(1)
  if (page > 3) pages.push('…')
  if (page > 2) add(page - 1)
  add(page)
  if (page < totalPages - 1) add(page + 1)
  if (page < totalPages - 2) pages.push('…')
  add(totalPages)

  return (
    <div className='flex items-center justify-center gap-1.5 pt-4'>
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        className='grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-40'
      >
        <ChevronLeft className='size-4' />
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span
            key={`ellipsis-${i}`}
            className='px-1 text-[12px] text-muted-foreground'
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPage(p as number)}
            className={cn(
              'grid size-8 place-items-center rounded-lg border text-[12px] font-bold transition-colors',
              p === page
                ? 'border-primary bg-primary/10 text-primary shadow-[0_0_8px_rgba(183,255,0,0.2)]'
                : 'border-border text-muted-foreground hover:border-primary/40 hover:text-primary',
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        className='grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-40'
      >
        <ChevronRight className='size-4' />
      </button>
    </div>
  )
}
