import { CURRENCY } from './config'

export function formatPrice(value: number, suffix?: string): string {
  if (value === 0 && suffix === 'devis') return 'Sur devis'
  const formatted = new Intl.NumberFormat('fr-FR').format(value)
  return `${formatted} ${CURRENCY}${suffix ? ` / ${suffix}` : ''}`
}

export function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace('.0', '')}k`
  return String(n)
}

const PLACEHOLDER_SVG = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23e5e7eb"><rect width="400" height="300"/><text x="50%" y="50%" font-size="14" fill="%239ca3af" text-anchor="middle" dy=".3em">Image indisponible</text></svg>'
)

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget
  if (img.src !== PLACEHOLDER_SVG) {
    img.src = PLACEHOLDER_SVG
  }
}
