import type { ReactNode } from 'react'
import { SplitText } from '@/components/motion/SplitText'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

type Props = {
  index?: string
  eyebrow: string
  title: string
  accent?: string
  children?: ReactNode
  className?: string
  as?: 'h1' | 'h2'
}

/** Numbered eyebrow, a split-text title with an italic serif accent, and optional intro. */
export function SectionHeading({ index, eyebrow, title, accent, children, className, as = 'h2' }: Props) {
  const H = as
  return (
    <div className={cn('max-w-4xl', className)}>
      <Reveal y={16} className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
        {index && <span className="text-accent">{index}</span>}
        <span className="h-px w-10 bg-current opacity-40" />
        {eyebrow}
      </Reveal>
      <H className={cn('font-display font-extrabold leading-[0.95]', as === 'h1' ? 'text-5xl sm:text-7xl lg:text-8xl' : 'text-4xl sm:text-6xl')}>
        <SplitText text={title} immediate={as === 'h1'} />
        {accent && (
          <>
            {' '}
            <SplitText text={accent} className="font-serif font-normal italic text-accent" delay={0.2} immediate={as === 'h1'} />
          </>
        )}
      </H>
      {children && (
        <Reveal delay={0.25} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {children}
        </Reveal>
      )}
    </div>
  )
}
