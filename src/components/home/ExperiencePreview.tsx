import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { experience, education } from '@/content/site'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/site/SectionHeading'

/** Professional experience as big hover rows that flood with colour. */
export function ExperiencePreview() {
  const rows = [
    ...experience.map((e) => ({ key: e.id, title: e.role, org: e.org, when: e.when, tag: 'Work' })),
    { key: 'du', title: education[0].degree, org: education[0].org, when: education[0].when, tag: 'Study' },
  ]
  return (
    <section className="mx-auto max-w-content px-4 py-24 sm:px-6" aria-labelledby="xp-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div id="xp-title">
          <SectionHeading index="03" eyebrow="Chapters" title="Professional" accent="experience." />
        </div>
        <Reveal>
          <Link to="/experience" className="link-underline inline-flex items-center gap-2 font-bold">
            Full timeline <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </div>

      <ul className="mt-14 border-t border-foreground/15">
        {rows.map((r, i) => (
          <Reveal as="li" key={r.key} delay={i * 0.08} className="border-b border-foreground/15">
            <Link to="/experience" hash={r.key} className="group relative grid grid-cols-12 items-center gap-4 overflow-hidden py-8" data-cursor="Open">
              <span aria-hidden className="absolute inset-0 -z-0 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
              <span className="relative col-span-2 text-sm font-bold text-muted-foreground transition-colors group-hover:text-accent-foreground sm:col-span-1">0{i + 1}</span>
              <span className="relative col-span-10 font-display text-3xl font-extrabold transition-all duration-500 group-hover:translate-x-4 group-hover:text-accent-foreground sm:col-span-6 sm:text-5xl">
                {r.title}
              </span>
              <span className="relative col-span-12 text-muted-foreground transition-colors group-hover:text-accent-foreground sm:col-span-3">
                {r.org}
                <span className="block text-xs uppercase tracking-widest opacity-70">{r.when}</span>
              </span>
              <motion.span className="relative col-span-2 hidden justify-self-end sm:block">
                <span className="grid size-12 place-items-center rounded-full border border-foreground/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-accent-foreground group-hover:bg-accent-foreground group-hover:text-accent">
                  <ArrowUpRight className="size-5" />
                </span>
              </motion.span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
