import { useState, useRef, useEffect } from 'react'
import { Plus, Image as ImageIcon, MapPin, FileText, X } from 'lucide-react'

export interface AttachmentOption {
  key: string
  label: string
  icon: typeof ImageIcon
}

const OPTIONS: AttachmentOption[] = [
  { key: 'photo', label: 'Photo', icon: ImageIcon },
  { key: 'location', label: 'Localisation', icon: MapPin },
  { key: 'document', label: 'Document', icon: FileText },
]

interface Props {
  onAttach: (kind: string) => void
}

export function AttachmentMenu({ onAttach }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function handleSelect(kind: string) {
    onAttach(kind)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="grid h-10 w-10 place-items-center rounded-full bg-soft transition hover:bg-line/50"
        aria-label="Joindre"
        aria-expanded={open}
      >
        {open ? <X size={20} /> : <Plus size={20} />}
      </button>
      {open && (
        <div className="absolute bottom-12 left-0 z-30 w-48 rounded-2xl border border-line bg-white p-2 shadow-card">
          {OPTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-soft"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-light text-primary">
                <Icon size={16} />
              </span>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
