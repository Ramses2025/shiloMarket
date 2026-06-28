import { useNavigate } from 'react-router-dom'
import { VerifiedBadge } from '../ui/Badges'
import { useData } from '../../context/DataContext'
import { useToast } from '../../context/ToastContext'
import type { Page } from '../../types'

interface Props {
  pages: Page[]
  onStartChat?: (page: Page) => void
}

export function SuggestedPages({ pages, onStartChat }: Props) {
  const navigate = useNavigate()
  const { isFollowing, toggleFollow } = useData()
  const { show } = useToast()

  if (pages.length === 0) return null

  return (
    <section className="px-4 py-3">
      <h2 className="mb-2.5 text-sm font-bold text-ink">Pages suggérées</h2>
      <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
        {pages.map((page) => {
          const following = isFollowing(page.id)
          return (
            <div
              key={page.id}
              className="relative w-32 shrink-0 overflow-hidden rounded-2xl bg-ink shadow-card"
            >
              <img
                src={page.coverUrl}
                alt={page.name}
                className="h-28 w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-2">
                <img
                  src={page.avatarUrl}
                  alt={page.name}
                  className="h-9 w-9 rounded-full border-2 border-white/80 object-cover"
                />
                <div className="mt-1 flex items-center gap-0.5 text-[11px] font-semibold text-white">
                  <span className="max-w-[100px] truncate">{page.name}</span>
                  {page.verified && <VerifiedBadge size={12} />}
                </div>
                <p className="text-[9px] text-white/60">{page.followers.toLocaleString()} abonnés</p>

                <div className="mt-1.5 flex gap-1">
                  <button
                    onClick={() => navigate(`/page/${page.id}`)}
                    className="rounded-full border border-white/40 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    Voir
                  </button>
                  <button
                    onClick={() => {
                      toggleFollow(page.id)
                      show(following ? `Vous ne suivez plus ${page.name}` : `Vous suivez ${page.name}`)
                    }}
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-sm transition ${
                      following
                        ? 'border-white/40 bg-white/10 text-white/80 hover:bg-white/20'
                        : 'border-white/60 bg-white/25 text-white hover:bg-white/35'
                    }`}
                  >
                    {following ? 'Suivi' : 'Suivre'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {onStartChat && (
          <button
            onClick={() => onStartChat(pages[0])}
            className="grid w-32 shrink-0 place-items-center rounded-2xl border-2 border-dashed border-line bg-soft text-muted transition hover:border-primary hover:text-primary"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">+</span>
              <span className="text-[10px] font-semibold">Nouvelle discussion</span>
            </div>
          </button>
        )}
      </div>
    </section>
  )
}
