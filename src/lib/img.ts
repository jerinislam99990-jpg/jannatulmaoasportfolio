/**
 * Build a Netlify Image CDN URL so pages never ship full-resolution
 * originals. Pass `h` together with `w` to get an exact server-side crop
 * (fit=cover); otherwise the image is resized and cropped in CSS with
 * object-fit/object-position.
 */
export function img(
  src: string,
  w: number,
  opts: { h?: number; q?: number; position?: 'top' | 'bottom' | 'left' | 'right' | 'center'; fm?: 'webp' | 'avif' | 'png' } = {},
) {
  const params = new URLSearchParams({ url: src, w: String(w) })
  if (opts.h) {
    params.set('h', String(opts.h))
    params.set('fit', 'cover')
    if (opts.position) params.set('position', opts.position)
  }
  params.set('fm', opts.fm ?? 'webp')
  if (opts.q) params.set('q', String(opts.q))
  return `/.netlify/images?${params.toString()}`
}

/** A srcset across common widths for responsive photos. */
export function srcSet(src: string, widths = [480, 800, 1200, 1600]) {
  return widths.map((w) => `${img(src, w)} ${w}w`).join(', ')
}
