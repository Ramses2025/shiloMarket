import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Package, Pencil, Trash2, Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { useToast } from '../context/ToastContext'
import { formatPrice } from '../lib/format'
import type { AnnonceStatus } from '../types'

const STATUS_LABEL: Record<AnnonceStatus, string> = {
  active: 'Active',
  louee: 'Louée',
  vendue: 'Vendue',
  en_attente: 'En attente',
}

const STATUS_COLOR: Record<AnnonceStatus, string> = {
  active: 'bg-success/10 text-success',
  louee: 'bg-soft text-muted',
  vendue: 'bg-soft text-muted',
  en_attente: 'bg-loc/10 text-loc',
}

export default function MyAnnonces() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { annonces } = useData()
  const { show } = useToast()

  if (!isAuthenticated || !user) {
    return (
      <div className="safe-top flex min-h-[70vh] flex-col items-center justify-center px-8 text-center">
        <h1 className="text-xl font-bold">Connectez-vous</h1>
        <button onClick={() => navigate('/connexion')} className="btn-primary mt-6 px-8">Se connecter</button>
      </div>
    )
  }

  const myAnnonces = annonces.filter((a) => a.page.id === user.id || a.page.name === user.fullName)

  return (
    <div className="h-full overflow-y-auto pb-16 xl:pb-4">
      <header className="safe-top sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-white px-4 py-3">
        <button onClick={() => navigate(-1)} className="btn-ghost -ml-2 text-ink" aria-label="Retour">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-lg font-bold">Mes annonces</h1>
        <button onClick={() => navigate('/publier')} className="btn-primary ml-auto h-9 px-3 text-sm">
          <Plus size={16} /> Publier
        </button>
      </header>

      {myAnnonces.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-soft">
            <Package size={36} className="text-muted" />
          </span>
          <p className="mt-4 font-semibold">Aucune annonce publiée</p>
          <p className="mt-1 text-sm text-muted">Publiez votre première annonce !</p>
          <button onClick={() => navigate('/publier')} className="btn-primary mt-4">Publier une annonce</button>
        </div>
      ) : (
        <ul className="divide-y divide-line">
          {myAnnonces.map((a) => (
            <li key={a.id} className="flex items-center gap-3 px-4 py-3">
              <img
                src={a.images[0]}
                alt={a.title}
                loading="lazy"
                className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <button
                  onClick={() => navigate(`/annonce/${a.id}`)}
                  className="block truncate text-left font-semibold"
                >
                  {a.title}
                </button>
                <p className="text-sm font-medium text-primary">{formatPrice(a.price, a.priceSuffix)}</p>
                <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLOR[a.status]}`}>
                  {STATUS_LABEL[a.status]}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => show('Édition bientôt disponible')}
                  className="grid h-9 w-9 place-items-center rounded-full bg-soft"
                  aria-label="Modifier"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => show('Suppression bientôt disponible')}
                  className="grid h-9 w-9 place-items-center rounded-full bg-soft text-live"
                  aria-label="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
