import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Check, Star } from 'lucide-react'
import { useToast } from '../context/ToastContext'

const PLANS = [
  {
    name: 'Gratuit',
    price: '0 FCFA',
    period: '',
    features: ['5 annonces max', 'Photos illimitées', 'Messagerie'],
    current: true,
  },
  {
    name: 'Pro',
    price: '5 000 FCFA',
    period: '/mois',
    features: ['Annonces illimitées', 'Mise en avant', 'Statistiques', 'Badge Pro'],
    current: false,
  },
  {
    name: 'Entreprise',
    price: '15 000 FCFA',
    period: '/mois',
    features: ['Tout Pro', 'Page certifiée', 'Shorts illimités', 'Support prioritaire'],
    current: false,
  },
]

export default function PaymentsPage() {
  const navigate = useNavigate()
  const { show } = useToast()

  return (
    <div className="h-full overflow-y-auto pb-16 xl:pb-4">
      <header className="safe-top sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-white px-4 py-3">
        <button onClick={() => navigate(-1)} className="btn-ghost -ml-2 text-ink" aria-label="Retour">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-lg font-bold">Paiements & abonnements</h1>
      </header>

      <div className="mx-auto max-w-lg p-4">
        <div className="flex items-center gap-3 rounded-xl bg-primary-light p-4">
          <CreditCard size={24} className="text-primary" />
          <div>
            <p className="font-semibold text-ink">Plan actuel : Gratuit</p>
            <p className="text-sm text-muted">5 annonces publiées sur 5</p>
          </div>
        </div>

        <h2 className="mb-3 mt-6 font-bold">Améliorez votre expérience</h2>
        <div className="space-y-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-4 ${plan.current ? 'border-primary bg-primary-light/50' : 'border-line bg-white'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{plan.name}</h3>
                  {plan.name === 'Pro' && <Star size={14} className="text-loc" />}
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold">{plan.price}</span>
                  <span className="text-sm text-muted">{plan.period}</span>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-success" /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => show(plan.current ? 'Vous êtes déjà sur ce plan' : 'Paiement bientôt disponible')}
                disabled={plan.current}
                className={`mt-3 w-full ${plan.current ? 'btn-outline opacity-60' : 'btn-primary'}`}
              >
                {plan.current ? 'Plan actuel' : 'Choisir'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
