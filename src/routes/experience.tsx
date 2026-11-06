import { createFileRoute } from '@tanstack/react-router'
import { motion, useScroll } from 'motion/react'
import { useRef } from 'react'
import { education, experience, extracurricular } from '@/content/site'
import { PageHero } from '@/components/site/PageHero'
import { RoleBlock } from '@/components/site/RoleBlock'
import { SectionHeading } from '@/components/site/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { CallToAction } from '@/components/site/CallToAction'
import { img } from '@/lib/img'
import type { Role } from '@/content/site'

export const Route = createFileRoute('/experience')({
  head: () => ({ meta: [{ title: 'Experience · Jannatul Maoa' }, { name: 'description', content: 'Professional experience, extracurricular leadership and education of Jannatul Maoa.' }] }),
  component: ExperiencePage,
})

function Timeline({ roles }: { roles: Role[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  return (
    <div ref={ref} className="relative mt-16 ml-3 sm:ml-6">
      <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-border" />
      <motion.span aria-hidden className="absolute left-0 top-0 h-full w-[3px] -translate-x-px origin-top bg-gradient-to-b from-accent via-cobalt to-saffron" style={{ scaleY: scrollYProgress }} />
      {roles.map((r, i) => (
        <RoleBlock key={r.id} r={r} i={i} />
      ))}
    </div>
  )
}

function ExperiencePage() {
  return (
    <>
      <PageHero eyebrow="Experience" title="Where I’ve" accent="shown up." ghost="Journey">
        Online storefronts, student clubs, a Red Crescent unit and the Gen-Train stage. Each one taught me something I still use.
      </PageHero>

      <section className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <SectionHeading index="01" eyebrow="Work" title="Professional" accent="experience." />
        <Timeline roles={experience} />
      </section>

      <section className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <SectionHeading index="02" eyebrow="Leadership & clubs" title="Extra" accent="curricular." />
        <Timeline roles={extracurricular} />
      </section>

      <section className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <SectionHeading index="03" eyebrow="Study" title="Education" accent="path." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {education.map((e, i) => (
            <Reveal key={e.org} delay={i * 0.1} y={50}>
              <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-border bg-card p-8">
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100" />
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-6xl font-extrabold text-accent">{e.score.split(' ')[1]}</span>
                  {e.logo && <img src={img(e.logo, 120)} alt="" className="size-14 object-contain" />}
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{e.score.split(' ')[0]}</p>
                <h3 className="mt-6 font-display text-2xl font-extrabold leading-tight">{e.org}</h3>
                <p className="mt-2 text-muted-foreground">{e.degree}</p>
                <p className="mt-4 text-sm font-semibold">{e.when}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CallToAction />
    </>
  )
}
