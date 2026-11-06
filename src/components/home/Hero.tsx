import { Link } from '@tanstack/react-router'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '@/content/site'
import { SplitText } from '@/components/motion/SplitText'
import { Magnetic } from '@/components/motion/Magnetic'

const ease = [0.22, 1, 0.36, 1] as const

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          className="inline-block whitespace-nowrap font-semibold text-foreground"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease }}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const nameX = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const lastX = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // portrait leans toward the pointer
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-1, 1], [6, -6]), { stiffness: 120, damping: 16 })
  const ry = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 120, damping: 16 })
  const blobX = useSpring(useTransform(mx, [-1, 1], [-40, 40]), { stiffness: 60, damping: 20 })
  const blobY = useSpring(useTransform(my, [-1, 1], [-30, 30]), { stiffness: 60, damping: 20 })

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden px-4 pb-10 pt-28 sm:px-6 lg:pb-14"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
        my.set(((e.clientY - r.top) / r.height) * 2 - 1)
      }}
    >
      {/* colour blobs */}
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ x: blobX, y: blobY }}>
        <div className="blob absolute right-[8%] top-[14%] size-[38vmax] bg-accent/40" />
        <div className="blob absolute right-[28%] top-[40%] size-[26vmax] bg-cobalt/30 [animation-delay:-6s]" />
        <div className="blob absolute left-[-8%] top-[-10%] size-[24vmax] bg-saffron/30 [animation-delay:-11s]" />
      </motion.div>

      {/* ruled paper lines */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:100%_44px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="relative mx-auto grid w-full max-w-content items-end gap-8 lg:grid-cols-12">
        {/* copy */}
        <motion.div className="relative z-10 lg:col-span-7" style={{ opacity: fade }}>
          <motion.p
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-card/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            <span className="size-2 rounded-full bg-accent" /> Hello, and welcome
          </motion.p>

          <h1 className="font-display font-extrabold leading-[0.82] tracking-[-0.055em]">
            <motion.span className="block text-[19vw] sm:text-[15vw] lg:text-[10.5rem]" style={{ x: nameX }}>
              <SplitText text={profile.firstName} by="char" immediate delay={0.35} stagger={0.045} />
            </motion.span>
            <motion.span className="block pl-[8vw] text-[19vw] sm:text-[15vw] lg:pl-24 lg:text-[10.5rem]" style={{ x: lastX }}>
              <SplitText text={profile.lastName} by="char" immediate delay={0.6} stagger={0.05} wordClassName="font-serif font-normal italic text-accent" />
            </motion.span>
          </h1>

          <motion.div
            className="mt-8 max-w-xl space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
          >
            <p className="text-lg text-muted-foreground sm:text-xl">
              <RotatingRole />
              <br />
              {profile.intro}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  to="/experience"
                  className="group inline-flex items-center gap-3 rounded-full bg-foreground py-2 pl-6 pr-2 font-bold text-background"
                >
                  See my journey
                  <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="size-5" />
                  </span>
                </Link>
              </Magnetic>
              <Magnetic>
                <a href={profile.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground/30 px-6 py-4 font-bold transition-colors hover:border-accent hover:text-accent">
                  Download CV
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        {/* portrait */}
        <motion.div className="relative mx-auto w-[78%] max-w-[460px] lg:col-span-5 lg:w-full" style={{ y: portraitY }}>
          <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }} className="relative">
            {/* arch frame */}
            <motion.div
              aria-hidden
              className="absolute inset-x-[6%] bottom-0 top-[6%] rounded-t-full border-2 border-foreground/80 bg-card"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-x-[10%] bottom-[-14px] top-[10%] -z-10 translate-x-4 rounded-t-full bg-accent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ originY: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />
            {/* the sketch draws itself in from the top */}
            <motion.div
              role="img"
              aria-label={`Hand-drawn sketch portrait of ${profile.name}`}
              className="ink-sketch ink-flow relative aspect-[584/750] w-full"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              transition={{ duration: 2.2, delay: 0.9, ease: [0.65, 0, 0.35, 1] }}
            />

            {/* rotating stamp */}
            <motion.div
              className="absolute -left-6 top-[18%] sm:-left-12"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 2 }}
            >
              <div className="relative grid size-28 place-items-center sm:size-32">
                <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 size-full" aria-hidden>
                  <defs>
                    <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                  </defs>
                  <circle cx="50" cy="50" r="49" className="fill-saffron" />
                  <text className="fill-foreground text-[8px] font-bold uppercase tracking-[0.15em]">
                    <textPath href="#circ" textLength="236">BBA Finance · Dhaka University ·</textPath>
                  </text>
                </svg>
                <span className="relative font-display text-2xl font-extrabold">3.75</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-2 bottom-[16%] rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur sm:-right-8"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.2, ease }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Gen-Train 4.0</p>
              <p className="font-display text-lg font-extrabold">
                1st <span className="font-serif font-normal italic text-accent">Runner-up</span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground lg:flex"
        style={{ opacity: fade }}
      >
        Scroll
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.div>
    </section>
  )
}
