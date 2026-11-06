import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { moments } from '@/content/site'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/site/SectionHeading'
import { MomentCard } from '@/components/site/MomentCard'

export function MomentsPreview() {
  const list = [...moments].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  return (
    <section className="mx-auto max-w-content px-4 py-24 sm:px-6" aria-labelledby="mom-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div id="mom-title">
          <SectionHeading index="08" eyebrow="Latest" title="Moments" accent="worth sharing." />
        </div>
        <Reveal>
          <Link to="/moments" className="link-underline inline-flex items-center gap-2 font-bold">
            All moments <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {list.map((m, i) => (
          <Reveal key={m.slug} delay={i * 0.12} y={60}>
            <MomentCard m={m} i={i} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
