import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bookmark } from 'lucide-react'
import { useData } from '../context/DataContext'
import { AnnonceGridCard } from '../components/marketplace/AnnonceGridCard'

export default function SavedItems() {
  const navigate = useNavigate()
  const { annonces, isSaved } = useData()

  const savedAnnonces = annonces.filter((a) => isSaved(a.id))

  return (
    <div className="h-full overflow-y-auto pb-16 xl:pb-4">
      <header className="safe-top sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-white px-4 py-3">
        <button onClick={() => navigate(-1)} className="btn-ghost -ml-2 text-ink" aria-label="Retour">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-lg font-bold">Enregistrés</h1>
      </header>

      {savedAnnonces.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-soft">
            <Bookmark size={36} className="text-muted" />
          </span>
          <p className="mt-4 font-semibold">Aucune annonce enregistrée</p>
          <p className="mt-1 text-sm text-muted">Touchez l'icône signet pour sauvegarder.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 p-4">
          {savedAnnonces.map((a) => (
            <AnnonceGridCard key={a.id} annonce={a} />
          ))}
        </div>
      )}
    </div>
  )
}
