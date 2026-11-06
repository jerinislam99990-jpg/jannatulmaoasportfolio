import type { Project } from '@/content/site'
import { img } from '@/lib/img'
import { cn } from '@/lib/utils'

/**
 * A designed cover for each report: the course code set large on a
 * coloured "document" sheet, or a cropped photo for the pitch.
 */
export function ProjectCover({ p, className }: { p: Project; className?: string }) {
  if (p.photo) {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <img
          src={img(p.photo.src, 900, { h: 1125 })}
          alt={p.photo.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          style={{ objectPosition: p.photo.focus }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute bottom-5 left-5 font-display text-5xl font-extrabold text-white">{p.course}</span>
      </div>
    )
  }
  return (
    <div className={cn('relative overflow-hidden', className)} style={{ background: p.hue }}>
      <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(0deg,white_0_1px,transparent_1px_22px)]" />
      <div className="absolute left-1/2 top-[14%] w-[62%] -translate-x-1/2 rotate-[-4deg] rounded-md bg-[#fbf8f2] p-5 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3 group-hover:rotate-0">
        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-500">University of Dhaka · Finance</p>
        <p className="mt-3 font-display text-4xl font-extrabold text-neutral-900">{p.course}</p>
        <p className="mt-2 line-clamp-4 font-serif text-base leading-snug text-neutral-800">{p.title}</p>
        <div className="mt-4 space-y-1.5">
          {[90, 75, 82, 60].map((w, i) => (
            <span key={i} className="block h-1 rounded bg-neutral-300" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
      <div className="absolute left-1/2 top-[18%] -z-0 w-[62%] -translate-x-[46%] rotate-[5deg] rounded-md bg-white/40 p-5 opacity-80 transition-transform duration-700 group-hover:rotate-[9deg]" style={{ height: '60%' }} aria-hidden />
      {p.pages && <span className="absolute bottom-4 right-4 rounded-full bg-black/25 px-3 py-1 text-xs font-bold text-white backdrop-blur">{p.pages} pages</span>}
    </div>
  )
}
