import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, useState } from 'react'
import { awards, certifications } from '@/content/site'
import { img } from '@/lib/img'
import { Lightbox } from '@/components/site/Lightbox'
import { SectionHeading } from '@/components/site/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

function FanCard({ i, n, progress, onOpen, c }: { i: number; n: number; progress: MotionValue<number>; onOpen: () => void; c: (typeof certifications)[number] }) {
  const mid = (n - 1) / 2
  const offset = i - mid
  const rotate = useTransform(progress, [0, 1], [offset * 2, offset * 9])
  const x = useTransform(progress, [0, 1], [`${offset * 6}%`, `${offset * 50}%`])
  const y = useTransform(progress, [0, 1], [offset * -6, Math.abs(offset) * 26])

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      data-cursor="View"
      className="absolute left-1/2 top-1/2 w-[46vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-2 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.45)] outline-offset-4 sm:w-[30vw]"
      style={{ rotate, x, y, zIndex: n - Math.abs(Math.round(offset)) }}
      whileHover={{ y: -24, scale: 1.06, zIndex: 20, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      aria-label={`View certificate: ${c.title}`}
    >
      <img src={img(c.img, 720)} alt="" loading="lazy" className="aspect-[1.42] w-full rounded-lg object-contain" />
    </motion.button>
  )
}

/** A deck of certificates that fans open as the section scrolls into view. */
export function Certifications() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const [open, setOpen] = useState<number | null>(null)
  const photos = certifications.map((c) => ({ src: c.img, alt: c.title, caption: `${c.title} · ${c.issuer} · ${c.date}`, contain: true }))

  return (
    <section className="relative overflow-hidden py-24" aria-labelledby="cert-title">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div id="cert-title">
          <SectionHeading index="05" eyebrow="Proof of work" title="Certifications" accent="& awards.">
            Tap any certificate to see it in full.
          </SectionHeading>
        </div>
      </div>

      <div ref={ref} className="relative mx-auto h-[46vw] max-h-[460px] min-h-[260px] max-w-content">
        {certifications.map((c, i) => (
          <FanCard key={c.id} c={c} i={i} n={certifications.length} progress={scrollYProgress} onOpen={() => setOpen(i)} />
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-content gap-4 px-4 sm:px-6 md:grid-cols-3">
        {awards.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.1} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6">
            <span aria-hidden className="absolute -right-6 -top-6 size-24 rounded-full bg-accent/15 transition-transform duration-700 group-hover:scale-[5]" />
            <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-accent">{a.when}</p>
            <p className="relative mt-3 font-display text-2xl font-extrabold leading-tight">{a.title}</p>
            <p className="relative mt-2 text-sm text-muted-foreground">{a.by}</p>
          </Reveal>
        ))}
      </div>

      <Lightbox photos={photos} index={open} onChange={setOpen} />
    </section>
  )
}
