import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { nav, profile } from '@/content/site'
import { Marquee } from '@/components/motion/Marquee'

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-30%', '0%'])

  return (
    <footer ref={ref} className="relative overflow-hidden bg-foreground text-background">
      <motion.div style={{ y }} className="pt-20">
        <Marquee speed={30} className="border-y border-background/15 py-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 pr-8 font-display text-[12vw] font-extrabold leading-none sm:text-[8vw]">
              <span>{profile.firstName}</span>
              <span className="font-serif font-normal italic text-accent">{profile.lastName}</span>
              <span className="text-outline">✦</span>
            </span>
          ))}
        </Marquee>

        <div className="mx-auto grid max-w-content gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="font-display text-3xl font-bold leading-tight">
              Let’s build something <span className="font-serif font-normal italic text-accent">worth presenting.</span>
            </p>
            <a href={`mailto:${profile.email}`} className="link-underline inline-flex items-center gap-1 text-lg">
              {profile.email} <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] opacity-50">Explore</p>
            <ul className="space-y-2">
              {nav.slice(1).map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="link-underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] opacity-50">Follow</p>
            <ul className="space-y-2">
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-underline">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.cv} target="_blank" rel="noreferrer" className="link-underline">
                  Download CV
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] opacity-50">Reach</p>
            <ul className="space-y-2">
              <li>
                <a href={profile.phoneHref} className="link-underline">
                  {profile.phone}
                </a>
              </li>
              <li className="opacity-70">{profile.location}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 border-t border-background/15 px-4 py-6 text-xs opacity-60 sm:px-6">
          <span>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <button type="button" className="link-underline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top ↑
          </button>
        </div>
      </motion.div>
    </footer>
  )
}
