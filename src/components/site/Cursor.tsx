import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

/**
 * A soft ink blob that trails the pointer and swells over links,
 * buttons and anything marked with data-cursor="label".
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-cursor]')
      setHover(!!t)
      setLabel(t?.dataset.cursor ?? '')
    }
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null
  const size = label ? 96 : hover ? 56 : 14

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] grid place-items-center rounded-full bg-accent text-[11px] font-bold uppercase tracking-widest text-accent-foreground mix-blend-difference dark:mix-blend-normal"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: size, height: size, opacity: hover && !label ? 0.55 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {label && (
        <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
          {label}
        </motion.span>
      )}
    </motion.div>
  )
}
