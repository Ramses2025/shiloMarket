import { useState } from 'react'
import { Play, Pause, Trash2, MapPin, FileText } from 'lucide-react'
import type { ChatMessage } from '../../types'

interface Props {
  message: ChatMessage
  onDelete: (id: string) => void
}

export function ChatMessageBubble({ message: m, onDelete }: Props) {
  const [showDelete, setShowDelete] = useState(false)
  const [playing, setPlaying] = useState(false)

  function togglePlay() {
    setPlaying((p) => !p)
  }

  return (
    <div className={`flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className="group relative max-w-[80%]"
        onClick={() => setShowDelete((s) => !s)}
      >
        <div
          className={`rounded-2xl px-3.5 py-2 text-[15px] ${
            m.fromMe ? 'bg-primary text-white' : 'bg-white text-ink'
          }`}
        >
          {m.type === 'voice' && (
            <span className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); togglePlay() }}
                className="grid h-7 w-7 place-items-center rounded-full bg-black/10"
                aria-label={playing ? 'Pause' : 'Lire'}
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-0.5 rounded-full ${
                      m.fromMe ? 'bg-white/60' : 'bg-muted/60'
                    } ${playing ? 'animate-pulse' : ''}`}
                    style={{
                      height: `${4 + Math.abs(Math.sin(i * 0.8)) * 12}px`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </span>
              <span className="ml-1 text-xs font-medium">{m.content}</span>
            </span>
          )}

          {m.type === 'image' && (
            <div className="overflow-hidden rounded-xl">
              <img src={m.content} alt="Image envoyée" className="max-h-60 w-full object-cover" />
            </div>
          )}

          {m.type === 'location' && (
            <span className="flex items-center gap-2">
              <MapPin size={18} />
              <span className="font-medium">Localisation partagée</span>
            </span>
          )}

          {m.type === 'document' && (
            <span className="flex items-center gap-2">
              <FileText size={18} />
              <span className="font-medium">{m.content}</span>
            </span>
          )}

          {m.type === 'text' && <span className="whitespace-pre-wrap break-words">{m.content}</span>}

          <div className={`mt-0.5 flex items-center gap-1 text-[10px] ${m.fromMe ? 'text-white/70' : 'text-muted'}`}>
            {m.time}
            {m.fromMe && (
              <span className="ml-0.5">{m.read ? '✓✓' : '✓'}</span>
            )}
          </div>
        </div>

        {showDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(m.id) }}
            className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-card ${
              m.fromMe ? '-left-10' : '-right-10'
            }`}
            aria-label="Supprimer"
          >
            <Trash2 size={16} className="text-live" />
          </button>
        )}
      </div>
    </div>
  )
}
