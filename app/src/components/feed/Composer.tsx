import { useNavigate } from 'react-router-dom'
import { Image, Video, MapPin } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { demoUser } from '../../data/users'

export function Composer() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const go = () => navigate('/publier')
  return (
    <div className="border-b border-line px-4 py-3">
      <div className="flex items-center gap-3">
        <img
          src={user?.avatarUrl ?? demoUser.avatarUrl}
          alt={user?.fullName ?? demoUser.fullName}
          loading="lazy"
          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
        />
        <button
          onClick={go}
          className="min-w-0 flex-1 truncate whitespace-nowrap rounded-full border border-line px-4 py-2.5 text-left text-sm text-muted transition active:scale-[0.98]"
        >
          Publiez une annonce ou un service…
        </button>
      </div>
      <div className="mt-2.5 flex items-center justify-between text-sm font-medium">
        <button onClick={go} className="flex items-center gap-1.5 px-1 py-1.5 text-ink transition active:scale-95">
          <Image size={18} className="text-primary" /> <span className="whitespace-nowrap">Photos</span>
        </button>
        <button onClick={go} className="flex items-center gap-1.5 px-1 py-1.5 text-ink transition active:scale-95">
          <Video size={18} className="text-live" /> <span className="whitespace-nowrap">Vidéo</span>
        </button>
        <button onClick={go} className="flex items-center gap-1.5 px-1 py-1.5 text-ink transition active:scale-95">
          <MapPin size={18} className="text-loc" /> <span className="whitespace-nowrap">Lieu</span>
        </button>
      </div>
    </div>
  )
}
