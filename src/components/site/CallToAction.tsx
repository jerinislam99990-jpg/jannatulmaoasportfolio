import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Magnetic } from '@/components/motion/Magnetic'
import { SplitText } from '@/components/motion/SplitText'

/** Big closing line with a magnetic, spinning contact button. */
export function CallToAction() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1])

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-32 sm:px-6">
      <div aria-hidden className="blob absolute left-1/2 top-1/2 size-[50vmax] -translate-x-1/2 -translate-y-1/2 bg-accent/25" />
      <div className="relative mx-auto flex max-w-content flex-col items-center text-center">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">Open to internships, clubs & collaborations</p>
        <h2 className="font-display text-[13vw] font-extrabold leading-[0.85] sm:text-[9vw] lg:text-[8rem]">
          <SplitText text="Have an idea?" />
          <br />
          <SplitText text="Let’s talk." className="font-serif font-normal italic text-accent" delay={0.25} />
        </h2>
        <motion.div className="mt-14" style={{ scale }}>
          <Magnetic strength={0.5}>
            <Link to="/contact" className="relative grid size-40 place-items-center rounded-full bg-foreground text-background sm:size-48" data-cursor="Hello">
              <motion.svg viewBox="0 0 100 100" className="absolute inset-2" style={{ rotate }} aria-hidden>
                <defs>
                  <path id="cta-c" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
                </defs>
                <text className="fill-current text-[8px] font-bold uppercase tracking-[0.2em]">
                  <textPath href="#cta-c" textLength="248">Get in touch · Get in touch · Get in touch ·</textPath>
                </text>
              </motion.svg>
              <span className="font-display text-xl font-extrabold">Say hi ↗</span>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
