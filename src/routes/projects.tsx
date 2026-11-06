import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight, Download, FileText } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { projects, type Project } from '@/content/site'
import { PageHero } from '@/components/site/PageHero'
import { ProjectCover } from '@/components/site/ProjectCover'
import { TiltCard } from '@/components/motion/TiltCard'
import { CallToAction } from '@/components/site/CallToAction'

export const Route = createFileRoute('/projects')({
  head: () => ({ meta: [{ title: 'Projects & Reports · Jannatul Maoa' }, { name: 'description', content: 'Term papers, group reports and competition pitches by Jannatul Maoa.' }] }),
  component: ProjectsPage,
})

const filters = ['All', 'Term paper', 'Group report', 'Case pitch'] as const

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const flip = i % 2 === 1
  return (
    <motion.article
      id={p.id}
      layout
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group grid scroll-mt-32 items-center gap-8 border-t border-border py-12 md:grid-cols-12"
    >
      <div className={`md:col-span-5 ${flip ? 'md:order-2 md:col-start-8' : ''}`}>
        <TiltCard className="rounded-[2rem]">
          <ProjectCover p={p} className="aspect-[4/5] rounded-[2rem]" />
        </TiltCard>
      </div>
      <div className={`md:col-span-6 ${flip ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
          <span className="text-accent">{String(i + 1).padStart(2, '0')}</span> · {p.kind} · {p.date}
        </p>
        <p className="mt-4 font-display text-7xl font-extrabold leading-none" style={{ color: p.hue }}>
          {p.course}
        </p>
        {p.courseName && <p className="mt-1 font-serif text-xl italic text-muted-foreground">{p.courseName}</p>}
        <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight sm:text-4xl">{p.title}</h2>
        <p className="mt-4 max-w-reading text-lg leading-relaxed text-muted-foreground">{p.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {p.file ? (
            <>
              <a href={p.file} target="_blank" rel="noreferrer" className="group/btn inline-flex items-center gap-3 rounded-full bg-foreground py-2 pl-6 pr-2 font-bold text-background" data-cursor="Read">
                Read the report
                <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground transition-transform duration-500 group-hover/btn:rotate-45">
                  <ArrowUpRight className="size-5" />
                </span>
              </a>
              <a href={p.file} download className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-5 py-3 font-semibold transition-colors hover:border-accent hover:text-accent">
                <Download className="size-4" /> PDF{p.pages ? ` · ${p.pages} pages` : ''}
              </a>
            </>
          ) : (
            <Link to="/moments/$slug" params={{ slug: 'gen-train-4-first-runner-up' }} className="group/btn inline-flex items-center gap-3 rounded-full bg-foreground py-2 pl-6 pr-2 font-bold text-background">
              See the pitch story
              <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground transition-transform duration-500 group-hover/btn:rotate-45">
                <ArrowUpRight className="size-5" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const list = projects.filter((p) => filter === 'All' || p.kind === filter)

  return (
    <>
      <PageHero eyebrow="Projects" title="Reports, papers" accent="& pitches." ghost="Projects">
        Group term papers and reports from my BBA in Finance, plus the case I pitched at Gen-Train 4.0. Every report opens as a PDF.
      </PageHero>
      <section className="mx-auto max-w-content px-4 pb-16 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${filter === f ? 'text-background' : 'text-foreground/70 hover:text-foreground'}`}
            >
              {filter === f && <motion.span layoutId="proj-filter" className="absolute inset-0 rounded-full bg-foreground" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span className="relative z-10 inline-flex items-center gap-2">
                {f !== 'All' && f !== 'Case pitch' && <FileText className="size-4" />}
                {f}
              </span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <ProjectRow key={p.id} p={p} i={i} />
          ))}
        </AnimatePresence>
      </section>
      <CallToAction />
    </>
  )
}
