import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { moments, type Photo } from '@/content/site'
import { img, srcSet } from '@/lib/img'
import { SplitText } from '@/components/motion/SplitText'
import { Reveal } from '@/components/motion/Reveal'
import { ParallaxImage } from '@/components/motion/ParallaxImage'
import { Lightbox } from '@/components/site/Lightbox'
import { MomentCard } from '@/components/site/MomentCard'

export const Route = createFileRoute('/moments/$slug')({
  loader: ({ params }) => {
    const moment = moments.find((m) => m.slug === params.slug)
    if (!moment) throw notFound()
    return { moment }
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.moment.title} · Jannatul Maoa` }, { name: 'description', content: loaderData.moment.summary }] : [],
  }),
  component: MomentPage,
})

function Cover({ photo, stamp }: { photo: Photo; stamp?: [string, string] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const coverY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const coverScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2])
  return (
        <div ref={ref} className="relative mx-4 h-[70svh] overflow-hidden rounded-[2rem] sm:mx-6">
          <motion.img
            src={img(photo.src, 1800)}
            srcSet={srcSet(photo.src, [800, 1200, 1800, 2400])}
            sizes="100vw"
            alt={photo.alt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ y: coverY, scale: coverScale, objectPosition: photo.focus }}
            initial={{ clipPath: 'inset(20% 20% 20% 20% round 2rem)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 0rem)' }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          />
          {stamp && (
            <motion.div
              className="absolute bottom-6 right-6 grid size-32 place-items-center rounded-full bg-accent text-center font-display font-extrabold leading-none text-accent-foreground shadow-2xl sm:size-40"
              initial={{ scale: 0, rotate: -120 }}
              animate={{ scale: 1, rotate: -8 }}
              transition={{ type: 'spring', stiffness: 140, damping: 12, delay: 1.2 }}
            >
              <span>
                <span className="block text-5xl">{stamp[0]}</span>
                <span className="block text-xs uppercase tracking-widest">{stamp[1]}</span>
              </span>
            </motion.div>
          )}
        </div>
  )
}

function MomentPage() {
  const { moment: m } = Route.useLoaderData()
  const [open, setOpen] = useState<number | null>(null)
  const photos = m.photos ?? []
  const others = moments.filter((x) => x.slug !== m.slug).slice(0, 3)
  const cover = m.cover && !m.cover.contain ? m.cover : undefined

  return (
    <article>
      <header className="relative px-4 pb-12 pt-36 sm:px-6 sm:pt-44">
        <div className="mx-auto max-w-content">
          <Reveal y={10}>
            <Link to="/moments" className="link-underline inline-flex items-center gap-2 text-sm font-bold">
              <ArrowLeft className="size-4" /> All moments
            </Link>
          </Reveal>
          <Reveal y={10} delay={0.1} className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
            <span className="rounded-full bg-accent px-3 py-1 text-accent-foreground">{m.tag}</span>
            {m.when}
          </Reveal>
          <h1 className="mt-6 max-w-5xl font-display text-4xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
            <SplitText text={m.title} immediate delay={0.15} />
          </h1>
        </div>
      </header>

      {cover && <Cover photo={cover} stamp={m.stamp} />}

      <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-reading space-y-6 text-lg leading-relaxed sm:text-xl">
          <Reveal>
            <p className="font-serif text-2xl italic leading-snug text-accent sm:text-3xl">{m.summary}</p>
          </Reveal>
          {m.body.map((para, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="text-muted-foreground">{para}</p>
            </Reveal>
          ))}
        </div>

        {photos.length > 0 && (
          <div className="mt-16 grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[280px] md:grid-cols-4">
            {photos.map((p, i) => (
              <button
                key={p.src + i}
                type="button"
                onClick={() => setOpen(i)}
                data-cursor="View"
                aria-label={`View photo: ${p.caption ?? p.alt}`}
                className={`group text-left ${photos.length > 1 && i === 0 ? 'col-span-2 row-span-2' : ''} ${p.contain ? 'bg-white' : ''} rounded-3xl`}
              >
                <ParallaxImage photo={p} className="h-full rounded-3xl border border-border" amount={6} sizes="(min-width: 768px) 50vw, 100vw" />
              </button>
            ))}
          </div>
        )}
      </div>

      <section className="mx-auto max-w-content px-4 pb-24 sm:px-6">
        <h2 className="mb-8 font-display text-3xl font-extrabold">
          More <span className="font-serif font-normal italic text-accent">moments</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {others.map((o, i) => (
            <Reveal key={o.slug} delay={i * 0.1}>
              <MomentCard m={o} i={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>
      <Lightbox photos={photos} index={open} onChange={setOpen} />
    </article>
  )
}
