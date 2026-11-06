import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { SectionHeading } from './SectionHeading'

/** Shared opening for inner pages: giant outlined word behind a split-text title. */
export function PageHero({ eyebrow, title, accent, ghost, children }: { eyebrow: string; title: string; accent?: string; ghost: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-36 sm:px-6 sm:pt-44">
      <motion.p
        aria-hidden
        className="text-outline-fg pointer-events-none absolute -right-4 top-16 select-none whitespace-nowrap font-display text-[26vw] font-extrabold leading-none opacity-[0.12]"
        initial={{ x: '20%', opacity: 0 }}
        animate={{ x: '0%', opacity: 0.12 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {ghost}
      </motion.p>
      <div aria-hidden className="blob absolute -left-20 top-10 size-[30vmax] bg-accent/20" />
      <div className="relative mx-auto max-w-content">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} accent={accent}>
          {children}
        </SectionHeading>
      </div>
    </section>
  )
}
