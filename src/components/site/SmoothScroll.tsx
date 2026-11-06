import Lenis from 'lenis'
import { useRouterState } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

/** Buttery inertial scrolling (skipped for reduced-motion users). */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const hash = useRouterState({ select: (s) => s.location.hash })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
    lenisRef.current = lenis
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!hash) {
      lenisRef.current?.scrollTo(0, { immediate: true })
      return
    }
    // wait for the page-change curtain, then glide to the anchored section
    const t = setTimeout(() => {
      const el = document.getElementById(hash)
      if (!el) return
      if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -110, duration: 1.4 })
      else el.scrollIntoView({ block: 'start' })
    }, 700)
    return () => clearTimeout(t)
  }, [pathname, hash])

  return null
}
