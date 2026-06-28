import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, MapPin } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function EditProfile() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const { show } = useToast()

  const [fullName, setFullName] = useState(user?.fullName ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [bio, setBio] = useState(user?.bio ?? '')
  const [location, setLocation] = useState(user?.location ?? '')

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    updateUser({ fullName, phone, bio, location })
    show('Profil mis à jour')
    navigate('/profil')
  }

  return (
    <div className="h-full overflow-y-auto pb-16 xl:pb-4">
      <header className="safe-top sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="btn-ghost -ml-2 text-ink" aria-label="Retour">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-lg font-bold">Modifier le profil</h1>
        </div>
        <button onClick={handleSave} className="text-sm font-semibold text-primary">
          Enregistrer
        </button>
      </header>

      <form onSubmit={handleSave} className="mx-auto max-w-lg space-y-4 p-4">
        {/* Avatar */}
        <div className="flex flex-col items-center py-4">
          <div className="relative">
            <img
              src={user?.avatarUrl}
              alt={fullName}
              className="h-24 w-24 rounded-full object-cover"
            />
            <button
              type="button"
              onClick={() => show('Changement de photo bientôt disponible')}
              className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full bg-primary text-white"
              aria-label="Changer la photo"
            >
              <Camera size={16} />
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Nom complet</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl bg-soft px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Téléphone</label>
          <div className="flex items-center gap-2">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl bg-soft px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/30"
            />
            {user?.verified && <span className="text-sm font-medium text-success">Vérifié</span>}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Parlez de vous…"
            className="w-full rounded-xl bg-soft px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Localisation</label>
          <div className="flex items-center gap-2 rounded-xl bg-soft px-4 py-2.5">
            <MapPin size={18} className="text-muted" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Brazzaville…"
              className="flex-1 bg-transparent outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  )
}
