import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { img } from '@/lib/img'
import type { Photo } from '@/content/site'

type Props = { photos: Photo[]; index: number | null; onChange: (i: number | null) => void }

/** Full-screen viewer for photos and certificates, uncropped. */
export function Lightbox({ photos, index, onChange }: Props) {
  const open = index !== null
  const go = useCallback((d: number) => index !== null && onChange((index + d + photos.length) % photos.length), [index, onChange, photos.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, go, onChange])

  const p = index !== null ? photos[index] : null

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={p.caption ?? p.alt}
          className="fixed inset-0 z-[90] flex flex-col bg-foreground/95 p-4 text-background backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onChange(null)}
        >
          <div className="flex items-center justify-between text-sm">
            <span className="tabular-nums opacity-70">
              {String(index! + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
            <button type="button" aria-label="Close" className="grid size-11 place-items-center rounded-full bg-background/10 hover:bg-accent" onClick={() => onChange(null)}>
              <X className="size-5" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={p.src}
                src={img(p.src, 1800)}
                alt={p.alt}
                className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
                initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
            {photos.length > 1 && (
              <>
                <button type="button" aria-label="Previous photo" onClick={(e) => (e.stopPropagation(), go(-1))} className="absolute left-0 grid size-12 place-items-center rounded-full bg-background/10 hover:bg-accent">
                  <ChevronLeft />
                </button>
                <button type="button" aria-label="Next photo" onClick={(e) => (e.stopPropagation(), go(1))} className="absolute right-0 grid size-12 place-items-center rounded-full bg-background/10 hover:bg-accent">
                  <ChevronRight />
                </button>
              </>
            )}
          </div>
          {p.caption && <p className="mx-auto max-w-2xl text-center text-sm opacity-80">{p.caption}</p>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
