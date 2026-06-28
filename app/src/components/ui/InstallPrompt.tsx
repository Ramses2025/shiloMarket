import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function install() {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  if (!deferredPrompt || dismissed) return null

  return (
    <div className="fixed bottom-20 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-2xl bg-white p-3 shadow-card xl:bottom-6">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-white">
        <Download size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-ink">Installer ShiloMarket</p>
        <p className="text-xs text-muted">Accès rapide depuis l'écran d'accueil</p>
      </div>
      <button
        onClick={install}
        className="shrink-0 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white"
      >
        Installer
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 text-muted"
        aria-label="Fermer"
      >
        <X size={18} />
      </button>
    </div>
  )
}
