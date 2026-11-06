import { motion } from 'motion/react'
import { useState } from 'react'
import type { Role } from '@/content/site'
import { img } from '@/lib/img'
import { Reveal } from '@/components/motion/Reveal'
import { ParallaxImage } from '@/components/motion/ParallaxImage'
import { Lightbox } from './Lightbox'

/** One timeline entry: dot on the spine, role card, and its photos. */
export function RoleBlock({ r, i }: { r: Role; i: number }) {
  const [open, setOpen] = useState<number | null>(null)
  const photos = r.photos ?? []

  return (
    <article id={r.id} className="relative scroll-mt-32 pb-20 pl-10 sm:pl-20">
      <motion.span
        aria-hidden
        className="absolute left-0 top-2 grid size-[22px] -translate-x-1/2 place-items-center rounded-full border-2 border-foreground bg-background sm:left-0"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <span className="size-2 rounded-full bg-accent" />
      </motion.span>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal y={20}>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
              <span className="text-accent">{String(i + 1).padStart(2, '0')}</span> · {r.when}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-5xl">{r.role}</h3>
          </Reveal>
          <Reveal delay={0.1} className="mt-3 flex items-center gap-3">
            {r.logo && (
              <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-white p-1.5">
                <img src={img(r.logo, 120)} alt="" className="max-h-full max-w-full object-contain" />
              </span>
            )}
            <span className="font-serif text-2xl italic text-accent">{r.org}</span>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-reading text-lg leading-relaxed text-muted-foreground">{r.summary}</p>
          </Reveal>
          <ul className="mt-6 max-w-reading space-y-3">
            {r.points.map((pt, k) => (
              <Reveal as="li" key={k} delay={0.2 + k * 0.06} x={-20} y={0} className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-accent" />
                <span>{pt}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        {photos.length > 0 && (
          <div className="grid gap-4 lg:col-span-5">
            {photos.map((p, k) => (
              <button key={p.src} type="button" onClick={() => setOpen(k)} className="group block text-left" data-cursor="View" aria-label={`View photo: ${p.caption ?? p.alt}`}>
                <ParallaxImage photo={p} className={`rounded-3xl border border-border ${p.contain ? 'aspect-[1.42] bg-white' : 'aspect-[4/5]'}`} sizes="(min-width: 1024px) 35vw, 90vw" />
                {p.caption && <p className="mt-2 text-sm text-muted-foreground">{p.caption}</p>}
              </button>
            ))}
          </div>
        )}
      </div>
      <Lightbox photos={photos} index={open} onChange={setOpen} />
    </article>
  )
}
