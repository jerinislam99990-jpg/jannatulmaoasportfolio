import { createFileRoute } from '@tanstack/react-router'
import { moments } from '@/content/site'
import { PageHero } from '@/components/site/PageHero'
import { MomentCard } from '@/components/site/MomentCard'
import { Reveal } from '@/components/motion/Reveal'
import { CallToAction } from '@/components/site/CallToAction'

export const Route = createFileRoute('/moments/')({
  head: () => ({ meta: [{ title: 'Moments · Jannatul Maoa' }, { name: 'description', content: 'Competitions, scholarships, programs and club milestones from Jannatul Maoa.' }] }),
  component: MomentsPage,
})

function MomentsPage() {
  const list = [...moments].sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.date.localeCompare(a.date))
  const [lead, ...rest] = list
  return (
    <>
      <PageHero eyebrow="Moments" title="News from" accent="the journey." ghost="Moments">
        Competitions, scholarships, programs and club milestones, newest first.
      </PageHero>
      <section className="mx-auto max-w-content px-4 pb-16 sm:px-6">
        <Reveal y={60}>
          <MomentCard m={lead} className="md:[&>div:first-child]:aspect-[21/9]" />
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.08} y={50}>
              <MomentCard m={m} i={i} />
            </Reveal>
          ))}
        </div>
      </section>
      <CallToAction />
    </>
  )
}
