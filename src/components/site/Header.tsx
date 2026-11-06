import { Link, useRouterState } from '@tanstack/react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { nav, profile } from '@/content/site'
import { ThemeToggle } from './ThemeToggle'
import { Magnetic } from '@/components/motion/Magnetic'

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 240 && !open)
    setScrolled(y > 24)
  })

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to))
  const active = nav.find((n) => isActive(n.to))?.to

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
        animate={{ y: hidden ? '-120%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`mx-auto flex max-w-content items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 sm:px-4 ${
            scrolled ? 'border-border bg-background/75 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.35)] backdrop-blur-xl' : 'border-transparent'
          }`}
        >
          <Link to="/" className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
            <span className="relative grid size-10 place-items-center overflow-hidden rounded-full bg-foreground font-display text-sm font-extrabold text-background">
              <span className="transition-transform duration-500 group-hover:-translate-y-10">{profile.initials}</span>
              <span className="absolute translate-y-10 text-accent transition-transform duration-500 group-hover:translate-y-0">{profile.initials}</span>
            </span>
            <span className="hidden font-display text-base font-bold sm:block">
              {profile.firstName} <span className="font-serif text-lg font-normal italic">{profile.lastName}</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full bg-muted/70 p-1" onPointerLeave={() => setHovered(null)}>
              {nav.map((item) => {
                const on = (hovered ?? active) === item.to
                return (
                  <li key={item.to} className="relative">
                    <Link
                      to={item.to}
                      onPointerEnter={() => setHovered(item.to)}
                      className={`relative z-10 block rounded-full px-4 py-2 text-sm font-semibold transition-colors ${on ? 'text-background' : 'text-foreground/75 hover:text-foreground'}`}
                    >
                      {item.label}
                    </Link>
                    {on && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-foreground" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Magnetic className="hidden sm:inline-block">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition-transform hover:scale-[1.04]"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-foreground/70" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent-foreground" />
                </span>
                Let’s talk
              </Link>
            </Magnetic>
            <button
              type="button"
              className="relative grid size-10 place-items-center rounded-full bg-foreground text-background lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <motion.span className="absolute h-[2px] w-4 bg-current" animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} />
              <motion.span className="absolute h-[2px] w-4 bg-current" animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-foreground px-6 pb-10 pt-28 text-background lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <li key={item.to} className="overflow-hidden">
                    <motion.div initial={{ y: '110%' }} animate={{ y: '0%' }} exit={{ y: '110%' }} transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}>
                      <Link to={item.to} className={`flex items-baseline gap-4 font-display text-5xl font-extrabold sm:text-6xl ${isActive(item.to) ? 'text-accent' : ''}`}>
                        <span className="font-sans text-xs font-medium opacity-50">0{i + 1}</span>
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-70" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.5 }}>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
