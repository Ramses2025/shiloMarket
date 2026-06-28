import { useNavigate } from 'react-router-dom'
import { X, Package, Building2, Bookmark, Bell, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { VerifiedBadge } from '../ui/Badges'

interface Props {
  open: boolean
  onClose: () => void
}

const MENU = [
  { icon: Package, label: 'Mes annonces', link: '/mes-annonces' },
  { icon: Building2, label: 'Mes pages', link: '/profil' },
  { icon: Bookmark, label: 'Enregistrés', link: '/enregistres' },
  { icon: Bell, label: 'Notifications', link: '/notifications' },
  { icon: Settings, label: 'Paramètres', link: '/parametres' },
  { icon: HelpCircle, label: 'Aide & support', link: '/aide' },
]

export function SideMenu({ open, onClose }: Props) {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  function go(path: string) {
    navigate(path)
    onClose()
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[70] bg-black/40 xl:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-[80] flex w-72 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 xl:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <header className="safe-top flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="font-bold">Menu</h2>
          <button onClick={onClose} aria-label="Fermer" className="btn-ghost -mr-2 text-ink">
            <X size={22} />
          </button>
        </header>

        {isAuthenticated && user ? (
          <button
            onClick={() => go('/profil')}
            className="flex items-center gap-3 border-b border-line px-4 py-4 text-left transition active:scale-[0.98] hover:bg-soft"
          >
            <img src={user.avatarUrl} alt={user.fullName} className="h-12 w-12 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 font-semibold">
                <span className="truncate">{user.fullName}</span>
                {user.verified && <VerifiedBadge size={14} />}
              </div>
              <div className="text-sm text-primary">Voir le profil</div>
            </div>
          </button>
        ) : (
          <div className="border-b border-line px-4 py-4">
            <button onClick={() => go('/connexion')} className="btn-primary w-full">Se connecter</button>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-2">
          <ul>
            {MENU.map(({ icon: Icon, label, link }) => (
              <li key={label}>
                <button
                  onClick={() => go(link)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition active:scale-[0.98] hover:bg-soft"
                >
                  <Icon size={20} className="text-ink" />
                  <span className="flex-1 font-medium">{label}</span>
                  <ChevronRight size={18} className="text-muted" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {isAuthenticated && (
          <div className="border-t border-line p-4">
            <button
              onClick={() => { logout(); go('/') }}
              className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left text-live transition active:scale-[0.98] hover:bg-soft"
            >
              <LogOut size={20} />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
