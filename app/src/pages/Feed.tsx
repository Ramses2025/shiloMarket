import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/feed/TopBar'
import { Composer } from '../components/feed/Composer'
import { CategoryStrip } from '../components/feed/CategoryStrip'
import { PageSuggestions } from '../components/feed/PageSuggestions'
import { Search, Bell, Menu } from 'lucide-react'
import { AnnonceCard } from '../components/feed/AnnonceCard'
import { Fab } from '../components/ui/Fab'
import { FeedCardSkeleton } from '../components/ui/Skeleton'
import { useData } from '../context/DataContext'

export default function Feed() {
  const navigate = useNavigate()
  const { annonces } = useData()
  const [loading, setLoading] = useState(true)

  // Simulation d'un chargement initial (démo) pour illustrer l'état de chargement.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="mx-auto w-full max-w-content">
      <TopBar />
      {/* En-tête desktop (la TopBar est réservée au mobile) */}
      <header className="sticky top-0 z-20 hidden items-center gap-3 border-b border-line bg-white/95 px-4 py-3 backdrop-blur xl:flex">
        <h1 className="text-xl font-extrabold text-primary">Accueil</h1>
        <button onClick={() => navigate('/recherche')} className="field ml-auto h-11 w-full max-w-sm cursor-pointer">
          <Search size={18} className="text-muted" />
          <span className="text-muted">Rechercher sur ShiloMarket</span>
        </button>
        <button
          onClick={() => navigate('/notifications')}
          className="relative grid h-11 w-11 place-items-center rounded-full bg-soft"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-live" />
        </button>
        <button
          onClick={() => navigate('/parametres')}
          className="grid h-11 w-11 place-items-center rounded-full bg-soft"
          aria-label="Paramètres"
        >
          <Menu size={20} />
        </button>
      </header>
      <Composer />
      <CategoryStrip />
      <PageSuggestions />
      <section className="pb-4">
        <h2 className="px-4 pt-4 text-lg font-bold">Annonces récentes</h2>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <FeedCardSkeleton key={i} />)
          : annonces.length === 0
            ? (
              <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-soft">
                  <Search size={36} className="text-muted" />
                </span>
                <p className="mt-4 font-semibold">Aucune annonce pour le moment</p>
                <p className="mt-1 text-sm text-muted">Soyez le premier à publier !</p>
              </div>
            )
            : annonces.map((a) => <AnnonceCard key={a.id} annonce={a} />)}
      </section>
      <Fab onClick={() => navigate('/publier')} />
    </div>
  )
}
