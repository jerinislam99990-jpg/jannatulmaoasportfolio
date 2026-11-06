import { createFileRoute } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { about, education, profile } from '@/content/site'
import { PageHero } from '@/components/site/PageHero'
import { SectionHeading } from '@/components/site/SectionHeading'
import { Reveal, revealItem, staggerParent } from '@/components/motion/Reveal'
import { CallToAction } from '@/components/site/CallToAction'

export const Route = createFileRoute('/about')({
  head: () => ({ meta: [{ title: 'About · Jannatul Maoa' }, { name: 'description', content: about.lede }] }),
  component: AboutPage,
})

function StoryWithPortrait() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6])
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 220])

  return (
    <section ref={ref} className="mx-auto grid max-w-content gap-14 px-4 py-12 sm:px-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <motion.div className="relative mx-auto max-w-sm" style={{ rotate }}>
            <motion.svg viewBox="0 0 200 200" className="absolute -inset-8 size-[calc(100%+4rem)] text-accent" style={{ rotate: ringRotate }} aria-hidden>
              <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
            </motion.svg>
            <div className="relative overflow-hidden rounded-[45%_55%_50%_50%/55%_45%_55%_45%] border-2 border-foreground bg-card p-6">
              <div role="img" aria-label={`Sketch portrait of ${profile.name}`} className="ink-sketch ink-flow aspect-[584/750] w-full" />
            </div>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-5 py-2 font-serif text-lg italic text-background">
              {profile.name}
            </span>
          </motion.div>
        </div>
      </div>
      <div className="space-y-8 lg:col-span-7">
        <Reveal>
          <p className="font-display text-3xl font-bold leading-tight sm:text-4xl">{about.lede}</p>
        </Reveal>
        {about.story.map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className="text-lg leading-relaxed text-muted-foreground">{p}</p>
          </Reveal>
        ))}
        <Reveal>
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
            {about.howIWork.map(([t, d]) => (
              <li key={t} className="bg-card p-6">
                <p className="font-display text-xl font-extrabold">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="mx-auto max-w-content px-4 py-24 sm:px-6">
      <SectionHeading index="02" eyebrow="Toolkit" title="Skills" accent="snapshot." />
      {(['technical', 'soft'] as const).map((k, row) => (
        <div key={k} className="mt-12">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">{k === 'technical' ? 'Technical skills' : 'Soft skills'}</p>
          <motion.ul className="flex flex-wrap gap-3" variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }}>
            {about.skills[k].map((s, i) => (
              <motion.li
                key={s}
                variants={revealItem}
                whileHover={{ y: -6, rotate: i % 2 ? 3 : -3, transition: { type: 'spring', stiffness: 400, damping: 12 } }}
                className={`cursor-default rounded-full border-2 px-6 py-3 font-display text-lg font-bold sm:text-2xl ${
                  row === 0
                    ? i % 3 === 0
                      ? 'border-foreground bg-foreground text-background'
                      : i % 3 === 1
                        ? 'border-accent bg-accent text-accent-foreground'
                        : 'border-foreground'
                    : 'border-cobalt text-cobalt'
                }`}
              >
                {s}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      ))}
    </section>
  )
}

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Numbers, people" accent="& a stage." ghost="About">
        A Finance student at the University of Dhaka who likes analysis that leads somewhere, teams that move together, and ideas that have to win a room.
      </PageHero>
      <StoryWithPortrait />

      <section className="bg-foreground py-24 text-background">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-background/60">
            <span className="text-accent">01</span> · What I bring
          </p>
          <h2 className="font-display text-4xl font-extrabold leading-[0.95] sm:text-6xl">
            The value <span className="font-serif font-normal italic text-accent">I bring.</span>
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {about.value.map((v, i) => (
              <Reveal key={v.k} delay={i * 0.08} y={50}>
                <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-background/15 p-8 transition-colors duration-500 hover:border-accent">
                  <span className="font-display text-8xl font-extrabold text-background/10 transition-colors duration-500 group-hover:text-accent">{v.k}</span>
                  <h3 className="mt-2 font-display text-3xl font-extrabold">{v.title}</h3>
                  <p className="mt-3 text-background/70">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Skills />

      <section className="mx-auto max-w-content px-4 pb-24 sm:px-6">
        <SectionHeading index="03" eyebrow="Study" title="Academic" accent="timeline." />
        <ol className="mt-14 space-y-0">
          {education.map((e, i) => (
            <Reveal as="li" key={e.org} delay={i * 0.1} x={-40} y={0} className="group grid grid-cols-12 items-baseline gap-4 border-t border-border py-8">
              <span className="col-span-12 font-display text-xl font-bold text-accent sm:col-span-3">{e.when}</span>
              <span className="col-span-12 sm:col-span-6">
                <span className="block font-display text-2xl font-extrabold transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">{e.org}</span>
                <span className="text-muted-foreground">{e.degree}</span>
              </span>
              <span className="col-span-12 font-serif text-3xl italic sm:col-span-3 sm:text-right">{e.score}</span>
            </Reveal>
          ))}
        </ol>
      </section>
      <CallToAction />
    </>
  )
}
