import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { NotFoundPage } from '@/components/error-pages'
import { MotionConfig } from 'motion/react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { SmoothScroll } from '@/components/site/SmoothScroll'
import { Cursor } from '@/components/site/Cursor'
import { ScrollProgress } from '@/components/site/ScrollProgress'
import { Preloader } from '@/components/site/Preloader'
import { PageCurtain } from '@/components/site/PageCurtain'
import { themeScript } from '@/components/site/ThemeToggle'

import '../styles.css'

const siteName = 'Jannatul Maoa · Finance, Leadership & Pitching'
const siteDescription =
  'Portfolio of Jannatul Maoa, BBA Finance student at the University of Dhaka: experience, extracurriculars, certifications, competitions and reports.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { name: 'theme-color', content: '#f4efe6' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Serif:ital@0;1&family=Manrope:wght@400..800&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <TooltipProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
            >
              Skip to content
            </a>
            <Preloader />
            <PageCurtain />
            <ScrollProgress />
            <SmoothScroll />
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <Cursor />
            <div className="grain" aria-hidden />
          </TooltipProvider>
        </MotionConfig>
        <Toaster />
        <Scripts />
      </body>
    </html>
  )
}
