import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { img, srcSet } from '@/lib/img'
import { cn } from '@/lib/utils'
import type { Photo } from '@/content/site'

type Props = {
  photo: Photo
  className?: string
  imgClassName?: string
  /** how far the photo drifts inside its frame, in % */
  amount?: number
  sizes?: string
  priority?: boolean
  /** reveal with a curtain wipe when it enters the viewport */
  wipe?: boolean
}

/**
 * A cropped photo frame. The image is cover-cropped around `photo.focus`
 * and drifts gently inside the frame as the page scrolls. Logos and
 * certificates (`contain`) are never cropped.
 */
export function ParallaxImage({ photo, className, imgClassName, amount = 10, sizes = '(min-width: 1024px) 50vw, 100vw', priority, wipe = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])

  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden bg-muted', className)}
      initial={wipe ? { clipPath: 'inset(100% 0% 0% 0%)' } : undefined}
      whileInView={wipe ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      {photo.contain ? (
        <img
          src={img(photo.src, 1200)}
          srcSet={srcSet(photo.src, [480, 800, 1200])}
          sizes={sizes}
          alt={photo.alt}
          loading={priority ? 'eager' : 'lazy'}
          className={cn('h-full w-full object-contain p-3', imgClassName)}
        />
      ) : (
        <motion.img
          src={img(photo.src, 1200)}
          srcSet={srcSet(photo.src)}
          sizes={sizes}
          alt={photo.alt}
          loading={priority ? 'eager' : 'lazy'}
          style={{ y, objectPosition: photo.focus ?? '50% 50%' }}
          className={cn('absolute inset-0 h-[125%] w-full -top-[12.5%] object-cover', imgClassName)}
        />
      )}
    </motion.div>
  )
}
