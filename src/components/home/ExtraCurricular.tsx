import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { extracurricular } from '@/content/site'
import { img } from '@/lib/img'

/**
 * Pinned horizontal gallery: scrolling down slides the club cards
 * sideways. Falls back to a swipeable row on small screens.
 */
export function ExtraCurricular() {
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 48))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section ref={ref} className="relative bg-foreground text-background" style={{ height: `calc(100svh + ${distance}px)` }} aria-labelledby="eca-title">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-content items-end justify-between gap-6 px-4 sm:px-6">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-background/60">
              <span className="text-accent">04</span> · Beyond the classroom
            </p>
            <h2 id="eca-title" className="font-display text-4xl font-extrabold leading-[0.95] sm:text-6xl">
              Extra<span className="font-serif font-normal italic text-accent">curricular</span>
            </h2>
          </div>
          <div className="hidden h-1 w-48 overflow-hidden rounded-full bg-background/15 sm:block">
            <motion.div className="h-full bg-accent" style={{ width: progress }} />
          </div>
        </div>

        <motion.div ref={track} className="flex gap-6 px-4 sm:px-6" style={{ x }}>
          {extracurricular.map((e, i) => {
            const photo = e.photos?.find((p) => !p.contain)
            const cert = e.photos?.find((p) => p.contain)
            return (
              <Link
                key={e.id}
                to="/experience"
                hash={e.id}
                data-cursor="View"
                className="group relative flex h-[62svh] w-[78vw] shrink-0 flex-col overflow-hidden rounded-[2rem] bg-background text-foreground sm:w-[420px]"
              >
                <div className="relative h-[58%] overflow-hidden" style={{ background: e.logoBg ?? 'var(--card)' }}>
                  {photo ? (
                    <img
                      src={img(photo.src, 840, { h: 720 })}
                      alt={photo.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                      style={{ objectPosition: photo.focus }}
                    />
                  ) : e.logo ? (
                    <div className="grid h-full place-items-center bg-white p-10">
                      <img src={img(e.logo, 600)} alt={`${e.org} logo`} loading="lazy" className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  ) : cert ? (
                    <div className="grid h-full place-items-center bg-accent p-6">
                      <img src={img(cert.src, 700)} alt={cert.alt} loading="lazy" className="max-h-full max-w-full -rotate-3 rounded-md object-contain shadow-2xl transition-transform duration-700 group-hover:rotate-0 group-hover:scale-105" />
                    </div>
                  ) : null}
                  {e.logo && photo && (
                    <span className="absolute bottom-3 left-3 grid size-14 place-items-center overflow-hidden rounded-xl bg-white p-1.5 shadow-lg">
                      <img src={img(e.logo, 120)} alt="" className="max-h-full max-w-full object-contain" />
                    </span>
                  )}
                  <span className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-bold">0{i + 1}</span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{e.role}</p>
                    <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight">{e.org}</h3>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{e.summary}</p>
                </div>
              </Link>
            )
          })}
          <div className="flex w-[60vw] shrink-0 items-center sm:w-[360px]">
            <Link to="/experience" className="font-display text-4xl font-extrabold leading-tight">
              See every <span className="font-serif font-normal italic text-accent">role</span> →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
