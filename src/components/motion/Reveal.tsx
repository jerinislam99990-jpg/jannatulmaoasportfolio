import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  x?: number
  scale?: number
  blur?: boolean
  className?: string
  as?: 'div' | 'li' | 'section' | 'article' | 'p' | 'span'
} & Omit<HTMLMotionProps<'div'>, 'children'>

/** Fades, lifts and un-blurs its children the first time they scroll into view. */
export function Reveal({ children, delay = 0, y = 40, x = 0, scale = 1, blur = true, className, as = 'div', ...rest }: RevealProps) {
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x, scale, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Staggers direct children that use `revealItem` variants. */
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export const revealItem = {
  hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
}
