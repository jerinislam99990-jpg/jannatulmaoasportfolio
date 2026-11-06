import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** An endless horizontal loop. Content is duplicated so the seam never shows. */
export function Marquee({ children, speed = 40, reverse = false, className }: { children: ReactNode; speed?: number; reverse?: boolean; className?: string }) {
  return (
    <div className={cn('marquee-wrap overflow-hidden', className)}>
      <div className="marquee" data-reverse={reverse} style={{ ['--marquee-speed' as string]: `${speed}s` }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
