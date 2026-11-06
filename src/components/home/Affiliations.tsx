import { affiliations } from '@/content/site'
import { img } from '@/lib/img'
import { Marquee } from '@/components/motion/Marquee'
import { Reveal } from '@/components/motion/Reveal'

export function Affiliations() {
  const half = Math.ceil(affiliations.length / 2)
  const rows = [affiliations, [...affiliations.slice(half), ...affiliations.slice(0, half)]]
  return (
    <section className="py-20" aria-labelledby="aff-title">
      <Reveal className="mx-auto mb-10 max-w-content px-4 text-center sm:px-6">
        <h2 id="aff-title" className="text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
          <span className="text-accent">06</span> · Places I’ve learned and worked with
        </h2>
      </Reveal>
      <div className="space-y-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {rows.map((row, r) => (
          <Marquee key={r} speed={r ? 50 : 40} reverse={r === 1}>
            {row.map((a) => (
              <div key={a.name} className="mx-2 grid h-24 w-52 shrink-0 place-items-center rounded-2xl border border-border bg-white px-6 grayscale transition-all duration-500 hover:grayscale-0 sm:h-28 sm:w-64" title={a.name}>
                <img src={img(a.logo, 400)} alt={a.name} loading="lazy" className="max-h-16 max-w-full object-contain sm:max-h-20" />
              </div>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  )
}
