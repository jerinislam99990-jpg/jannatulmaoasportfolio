import { motion } from 'motion/react'
import { stats } from '@/content/site'
import { CountUp } from '@/components/motion/CountUp'
import { revealItem, staggerParent } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/site/SectionHeading'

export function Stats() {
  return (
    <section className="mx-auto max-w-content px-4 py-24 sm:px-6" aria-labelledby="momentum">
      <div id="momentum">
        <SectionHeading index="02" eyebrow="Momentum" title="Small numbers," accent="big stories." />
      </div>
      <motion.ul
        className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
      >
        {stats.map((s, i) => (
          <motion.li key={s.label} variants={revealItem} className="group relative overflow-hidden bg-background p-8">
            <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
            <div className="relative transition-colors duration-500 group-hover:text-background">
              <span className="text-xs font-bold text-accent">0{i + 1}</span>
              <p className="mt-6 font-display text-6xl font-extrabold tracking-tight sm:text-7xl">
                <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-4 text-sm text-muted-foreground transition-colors duration-500 group-hover:text-background/70">{s.label}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
