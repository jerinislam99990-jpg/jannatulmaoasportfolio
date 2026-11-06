import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import type { Moment } from '@/content/site'
import { img } from '@/lib/img'
import { cn } from '@/lib/utils'

const tones = ['bg-accent', 'bg-cobalt', 'bg-saffron', 'bg-foreground']

export function MomentCard({ m, i = 0, className }: { m: Moment; i?: number; className?: string }) {
  return (
    <Link
      to="/moments/$slug"
      params={{ slug: m.slug }}
      data-cursor="Read"
      className={cn('group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card transition-shadow duration-500 hover:shadow-2xl', className)}
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        {m.cover ? (
          <img
            src={m.cover.contain ? img(m.cover.src, 800) : img(m.cover.src, 800, { h: 550 })}
            alt={m.cover.alt}
            loading="lazy"
            className={cn(
              'h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110',
              m.cover.contain ? 'bg-muted object-contain p-4' : 'object-cover',
            )}
            style={{ objectPosition: m.cover.focus }}
          />
        ) : (
          <div className={cn('flex h-full items-end p-6 text-background', tones[i % tones.length])}>
            <span className="font-display text-5xl font-extrabold leading-[0.9] transition-transform duration-700 group-hover:-translate-y-2 sm:text-6xl">
              {m.tag}
              <span className="font-serif font-normal italic">.</span>
            </span>
            <span aria-hidden className="absolute -right-10 -top-10 size-48 rounded-full border-[24px] border-background/20 transition-transform duration-1000 group-hover:scale-125" />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-foreground backdrop-blur">{m.tag}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{m.when}</p>
        <h3 className="font-display text-xl font-bold leading-snug">{m.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{m.summary}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold">
          Read the story
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  )
}
