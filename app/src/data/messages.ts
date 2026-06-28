import type { ChatMessage, Conversation, Page } from '../types'
import { pages } from './pages'

export const conversations: Conversation[] = [
  {
    id: 'c1',
    page: pages[0],
    lastPreview: 'Oui, la maison est disponible immédiatement !',
    lastKind: 'text',
    time: '14:32',
    unread: 2,
    online: true,
    annonceTitle: 'Maison meublée 4 pièces · 350 000 FCFA/mois',
  },
  {
    id: 'c2',
    page: pages[1],
    lastPreview: 'Message vocal (0:12)',
    lastKind: 'voice',
    time: 'Hier',
    unread: 0,
    annonceTitle: 'Toyota Land Cruiser 4x4 · 75 000 FCFA/jour',
  },
  {
    id: 'c3',
    page: pages[2],
    lastPreview: 'Photo',
    lastKind: 'image',
    time: 'Lun',
    unread: 0,
    annonceTitle: 'Appartement meublé Moungali',
  },
]

export const sampleMessages: Record<string, ChatMessage[]> = {
  c1: [
    { id: 'm1', fromMe: false, type: 'text', content: 'Bonjour, la maison est-elle disponible ?', time: '14:20' },
    { id: 'm2', fromMe: true, type: 'text', content: 'Oui, disponible immédiatement !', time: '14:22', read: true },
    { id: 'm3', fromMe: false, type: 'voice', content: '0:12', time: '14:25' },
    { id: 'm4', fromMe: true, type: 'text', content: 'Parfait, je peux passer demain matin.', time: '14:28', read: true },
    { id: 'm5', fromMe: false, type: 'text', content: 'Oui, la maison est disponible immédiatement !', time: '14:32' },
  ],
  c2: [
    { id: 'm1', fromMe: false, type: 'text', content: 'Bonjour, le 4x4 est-il disponible ce weekend ?', time: '10:05' },
    { id: 'm2', fromMe: true, type: 'text', content: 'Oui, pour 75 000 FCFA/jour. Avec chauffeur en option.', time: '10:08', read: true },
    { id: 'm3', fromMe: false, type: 'voice', content: '0:12', time: '10:15' },
    { id: 'm4', fromMe: true, type: 'text', content: 'Parfait, je le prends pour samedi.', time: '10:20', read: true },
  ],
  c3: [
    { id: 'm1', fromMe: false, type: 'text', content: 'Voici les photos de l\'appartement', time: '11:00' },
    { id: 'm2', fromMe: false, type: 'image', content: 'https://picsum.photos/seed/appart1/600/400', time: '11:01' },
    { id: 'm3', fromMe: true, type: 'text', content: 'Très bien, l\'appartement me plaît.', time: '11:15', read: true },
    { id: 'm4', fromMe: false, type: 'location', content: 'Plateau, Brazzaville', time: '11:20' },
  ],
}

export function getConversationById(id: string): Conversation | undefined {
  return conversations.find((c) => c.id === id)
}

export function createConversation(page: Page): string {
  const existing = conversations.find((c) => c.page.id === page.id)
  if (existing) return existing.id

  const id = `c-${page.id}-${Date.now()}`
  const convo: Conversation = {
    id,
    page,
    lastPreview: 'Nouvelle conversation',
    lastKind: 'text',
    time: 'maintenant',
    unread: 0,
    online: false,
  }
  conversations.unshift(convo)
  sampleMessages[id] = []
  return id
}
