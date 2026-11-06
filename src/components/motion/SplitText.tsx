import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type Props = {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  by?: 'word' | 'char'
  /** animate on mount instead of when scrolled into view */
  immediate?: boolean
  stagger?: number
}

/** Rises words (or letters) out of a clipping mask, one after another. */
export function SplitText({ text, className, wordClassName, delay = 0, by = 'word', immediate = false, stagger }: Props) {
  const words = text.split(' ')
  const step = stagger ?? (by === 'char' ? 0.03 : 0.07)
  let i = 0
  const trigger = immediate
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: { once: true, margin: '0px 0px -10% 0px' } }

  return (
    <motion.span className={cn('inline', className)} initial="hidden" {...trigger}>
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          {by === 'word' ? (
            <motion.span
              className={cn('inline-block', wordClassName)}
              variants={{
                hidden: { y: '110%', rotate: 6 },
                show: { y: '0%', rotate: 0, transition: { duration: 0.9, delay: delay + i++ * step, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {word}
            </motion.span>
          ) : (
            word.split('').map((ch, ci) => (
              <motion.span
                key={ci}
                className={cn('inline-block', wordClassName)}
                variants={{
                  hidden: { y: '115%', rotate: 10 },
                  show: { y: '0%', rotate: 0, transition: { duration: 0.85, delay: delay + i++ * step, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {ch}
              </motion.span>
            ))
          )}
          {wi < words.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  )
}
