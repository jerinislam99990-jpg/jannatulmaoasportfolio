import { AnimatePresence, animate, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '@/content/site'

/** First-visit intro: a counter fills, the name writes in, the curtain lifts. */
export function Preloader() {
  const [show, setShow] = useState(true)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (sessionStorage.getItem('jm-intro') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShow(false)
      return
    }
    sessionStorage.setItem('jm-intro', '1')
    const c = animate(0, 100, { duration: 1.6, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => setN(Math.round(v)) })
    const t = setTimeout(() => setShow(false), 1900)
    return () => {
      c.stop()
      clearTimeout(t)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="pre"
          className="fixed inset-0 z-[120] flex flex-col justify-between bg-foreground p-6 text-background sm:p-10"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] opacity-70">
            <span>Portfolio</span>
            <span>Dhaka · {new Date().getFullYear()}</span>
          </div>
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-[14vw] font-extrabold leading-[0.85] sm:text-[11vw]"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              {profile.firstName}
              <span className="font-serif font-normal italic text-accent"> {profile.lastName}</span>
            </motion.p>
          </div>
          <div className="flex items-end justify-between">
            <div className="h-[2px] w-1/2 overflow-hidden bg-background/20">
              <div className="h-full bg-accent" style={{ width: `${n}%` }} />
            </div>
            <span className="font-display text-6xl font-bold tabular-nums sm:text-8xl">{n}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
