import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { moments } from '@/content/site'
import { img, srcSet } from '@/lib/img'

/**
 * Pinned spotlight: the Gen-Train photo starts as a small tilted card and
 * opens into a full-bleed frame while the headline slides across it.
 */
export function Spotlight() {
  const story = moments.find((m) => m.featured)!
  const pitch = story.photos![0]
  const stage = story.photos![1]
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const scale = useTransform(scrollYProgress, [0, 0.55], [0.42, 1])
  const radius = useTransform(scrollYProgress, [0, 0.55], [48, 0])
  const rotate = useTransform(scrollYProgress, [0, 0.55], [-6, 0])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.35, 1])
  const titleX = useTransform(scrollYProgress, [0.15, 0.9], ['40%', '-30%'])
  const veil = useTransform(scrollYProgress, [0.35, 0.65], [0, 0.55])
  const copyOpacity = useTransform(scrollYProgress, [0.55, 0.72], [0, 1])
  const copyY = useTransform(scrollYProgress, [0.55, 0.72], [40, 0])
  const secondY = useTransform(scrollYProgress, [0.5, 1], ['110%', '0%'])
  const secondRotate = useTransform(scrollYProgress, [0.5, 1], [14, 4])

  return (
    <section ref={ref} className="relative h-[280vh]" aria-labelledby="spotlight-title">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <p className="absolute left-4 top-24 z-0 text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground sm:left-6">
          <span className="text-accent">01</span> · Spotlight
        </p>

        <motion.div className="relative h-full w-full overflow-hidden" style={{ scale, borderRadius: radius, rotate }}>
          <motion.img
            src={img(pitch.src, 1600)}
            srcSet={srcSet(pitch.src, [800, 1200, 1600, 2400])}
            sizes="100vw"
            alt={pitch.alt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale: imgScale, objectPosition: pitch.focus }}
            loading="lazy"
          />
          <motion.div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" style={{ opacity: veil }} />
        </motion.div>

        <motion.h2
          id="spotlight-title"
          className="pointer-events-none absolute top-[16%] whitespace-nowrap font-display text-[16vw] font-extrabold leading-none text-white mix-blend-difference"
          style={{ x: titleX }}
        >
          Gen-Train <span className="font-serif font-normal italic">4.0</span> grand final
        </motion.h2>

        {/* second photo slides up like a polaroid */}
        <motion.figure
          className="absolute bottom-[8%] right-[5%] hidden w-[22vw] max-w-xs rounded-lg bg-white p-2 pb-8 shadow-2xl md:block"
          style={{ y: secondY, rotate: secondRotate }}
        >
          <div className="aspect-[4/5] overflow-hidden rounded">
            <img src={img(stage.src, 600, { h: 750 })} alt={stage.alt} className="h-full w-full object-cover" style={{ objectPosition: stage.focus }} loading="lazy" />
          </div>
          <figcaption className="mt-2 text-center font-serif text-sm italic text-neutral-700">on stage with the 1st runner-up board</figcaption>
        </motion.figure>

        <motion.div className="absolute bottom-[8%] left-4 max-w-lg text-white sm:left-[5%]" style={{ opacity: copyOpacity, y: copyY }}>
          <div className="mb-5 inline-grid size-24 place-items-center rounded-full bg-accent text-center font-display font-extrabold leading-none text-accent-foreground shadow-xl">
            <span>
              <span className="block text-3xl">{story.stamp![0]}</span>
              <span className="block text-[10px] uppercase tracking-widest">{story.stamp![1]}</span>
            </span>
          </div>
          <p className="text-lg text-white/85 sm:text-xl">{story.summary}</p>
          <Link
            to="/moments/$slug"
            params={{ slug: story.slug }}
            className="group mt-6 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 font-bold text-black"
            data-cursor="Read"
          >
            Read the story
            <span className="grid size-10 place-items-center rounded-full bg-accent text-white transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="size-5" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
