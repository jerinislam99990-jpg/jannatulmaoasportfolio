import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/content/site'
import { Reveal } from '@/components/motion/Reveal'
import { TiltCard } from '@/components/motion/TiltCard'
import { SectionHeading } from '@/components/site/SectionHeading'
import { ProjectCover } from '@/components/site/ProjectCover'

export function ProjectsPreview() {
  return (
    <section className="mx-auto max-w-content px-4 py-24 sm:px-6" aria-labelledby="proj-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div id="proj-title">
          <SectionHeading index="07" eyebrow="Work on paper" title="Projects" accent="& reports." />
        </div>
        <Reveal>
          <Link to="/projects" className="link-underline inline-flex items-center gap-2 font-bold">
            All projects <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1} y={60} className={i % 2 ? 'lg:mt-16' : ''}>
            <TiltCard className="rounded-[1.75rem]">
              <Link to="/projects" hash={p.id} className="group block overflow-hidden rounded-[1.75rem] border border-border bg-card" data-cursor="Open">
                <ProjectCover p={p} className="aspect-[4/5]" />
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    {p.kind} · {p.date}
                  </p>
                  <h3 className="mt-2 line-clamp-2 font-display text-lg font-bold leading-snug">{p.title}</h3>
                </div>
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
