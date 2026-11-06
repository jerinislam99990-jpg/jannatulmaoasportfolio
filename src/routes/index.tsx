import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/home/Hero'
import { Spotlight } from '@/components/home/Spotlight'
import { Ticker } from '@/components/home/Ticker'
import { Stats } from '@/components/home/Stats'
import { ExperiencePreview } from '@/components/home/ExperiencePreview'
import { ExtraCurricular } from '@/components/home/ExtraCurricular'
import { Certifications } from '@/components/home/Certifications'
import { Affiliations } from '@/components/home/Affiliations'
import { ProjectsPreview } from '@/components/home/ProjectsPreview'
import { MomentsPreview } from '@/components/home/MomentsPreview'
import { CallToAction } from '@/components/site/CallToAction'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <Spotlight />
      <Ticker />
      <Stats />
      <ExperiencePreview />
      <ExtraCurricular />
      <Certifications />
      <Affiliations />
      <ProjectsPreview />
      <MomentsPreview />
      <CallToAction />
    </>
  )
}
