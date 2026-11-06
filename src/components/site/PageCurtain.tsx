import { AnimatePresence, motion } from 'motion/react'
import { useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { nav } from '@/content/site'

/** A two-tone curtain sweeps across the screen on every route change. */
export function PageCurtain() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const first = useRef(true)
  const [key, setKey] = useState<string | null>(null)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setKey(pathname + Date.now())
    const t = setTimeout(() => setKey(null), 1100)
    return () => clearTimeout(t)
  }, [pathname])

  const label = nav.find((n) => n.to !== '/' && pathname.startsWith(n.to))?.label ?? 'Home'

  return (
    <AnimatePresence>
      {key && (
        <motion.div key={key} aria-hidden className="pointer-events-none fixed inset-0 z-[110]">
          <motion.div
            className="absolute inset-0 bg-accent"
            initial={{ y: '0%' }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          />
          <motion.div
            className="absolute inset-0 grid place-items-center bg-foreground"
            initial={{ y: '0%' }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          >
            <motion.span
              className="font-display text-5xl font-extrabold text-background sm:text-7xl"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              {label}
              <span className="text-accent">.</span>
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
