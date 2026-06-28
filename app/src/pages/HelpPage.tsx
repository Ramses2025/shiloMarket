import { useNavigate } from 'react-router-dom'
import { ArrowLeft, HelpCircle, Mail, Phone, MessageCircle, ChevronRight } from 'lucide-react'
import { useToast } from '../context/ToastContext'

const FAQ = [
  { q: 'Comment publier une annonce ?', a: 'Touchez le bouton + en bas de l\'écran, remplissez le formulaire et publiez.' },
  { q: 'Comment certifier ma page ?', a: 'Rendez-vous dans Paramètres > Certification et soumettez vos documents.' },
  { q: 'Comment contacter un propriétaire ?', a: 'Sur une annonce, touchez « Discuter » pour ouvrir une conversation.' },
  { q: 'Mes données sont-elles protégées ?', a: 'Oui, vos données sont chiffrées et ne sont jamais partagées sans votre consentement.' },
]

const CONTACTS = [
  { icon: Mail, label: 'Email', value: 'support@shilomarket.cg' },
  { icon: Phone, label: 'Téléphone', value: '+242 06 000 0000' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+242 06 000 0000' },
]

export default function HelpPage() {
  const navigate = useNavigate()
  const { show } = useToast()

  return (
    <div className="h-full overflow-y-auto pb-16 xl:pb-4">
      <header className="safe-top sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-white px-4 py-3">
        <button onClick={() => navigate(-1)} className="btn-ghost -ml-2 text-ink" aria-label="Retour">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-lg font-bold">Aide & support</h1>
      </header>

      <div className="mx-auto max-w-lg p-4">
        <div className="flex flex-col items-center py-6 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-primary-light text-primary">
            <HelpCircle size={32} />
          </span>
          <h2 className="mt-3 text-lg font-bold">Comment pouvons-nous vous aider ?</h2>
        </div>

        {/* FAQ */}
        <section className="mb-6">
          <h3 className="mb-3 font-bold">Questions fréquentes</h3>
          <ul className="divide-y divide-line rounded-xl border border-line bg-white">
            {FAQ.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => show(item.a)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition active:scale-[0.98] hover:bg-soft"
                >
                  <span className="flex-1">
                    <span className="block font-medium">{item.q}</span>
                  </span>
                  <ChevronRight size={18} className="text-muted" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Contacts */}
        <section>
          <h3 className="mb-3 font-bold">Nous contacter</h3>
          <ul className="divide-y divide-line rounded-xl border border-line bg-white">
            {CONTACTS.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-center gap-3 px-4 py-3.5">
                <Icon size={20} className="text-primary" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-sm text-muted">{value}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
