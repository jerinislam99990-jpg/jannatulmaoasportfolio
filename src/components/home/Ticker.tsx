import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ticker } from '@/content/site'
import { Marquee } from '@/components/motion/Marquee'

/** Two crossing ribbons of skills that tilt with the scroll. */
export function Ticker() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const r1 = useTransform(scrollYProgress, [0, 1], [-1, -5])
  const r2 = useTransform(scrollYProgress, [0, 1], [3, 1])

  return (
    <div ref={ref} className="relative overflow-hidden py-20" aria-label="Skills">
      <motion.div style={{ rotate: r1 }} className="relative z-10 -mx-10 bg-foreground py-5 text-background">
        <Marquee speed={35}>
          {ticker.map((t) => (
            <span key={t} className="flex items-center gap-8 pr-8 font-display text-3xl font-extrabold uppercase sm:text-5xl">
              {t}
              <span className="text-accent">✺</span>
            </span>
          ))}
        </Marquee>
      </motion.div>
      <motion.div style={{ rotate: r2 }} className="-mx-10 -mt-4 bg-accent py-4 text-accent-foreground">
        <Marquee speed={45} reverse>
          {ticker.map((t) => (
            <span key={t} className="flex items-center gap-8 pr-8 font-serif text-2xl italic sm:text-4xl">
              {t}
              <span>✦</span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </div>
  )
}
