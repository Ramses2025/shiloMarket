import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ChatMessage, Conversation, Page } from '../types'
import { conversations as seedConversations, sampleMessages } from '../data/messages'

interface MessageContextValue {
  conversations: Conversation[]
  getConversation: (id: string) => Conversation | undefined
  getMessages: (conversationId: string) => ChatMessage[]
  sendMessage: (conversationId: string, message: ChatMessage) => void
  deleteMessage: (conversationId: string, messageId: string) => void
  createConversation: (page: Page, annonceTitle?: string) => string
  markAsRead: (conversationId: string) => void
}

const MessageContext = createContext<MessageContextValue | undefined>(undefined)

export function MessageProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(seedConversations)
  const [messagesByConvo, setMessagesByConvo] = useState<Record<string, ChatMessage[]>>({ ...sampleMessages })

  const getConversation = useCallback(
    (id: string) => conversations.find((c) => c.id === id),
    [conversations],
  )

  const getMessages = useCallback(
    (conversationId: string) => messagesByConvo[conversationId] ?? [],
    [messagesByConvo],
  )

  const sendMessage = useCallback((conversationId: string, message: ChatMessage) => {
    setMessagesByConvo((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] ?? []), message],
    }))
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastPreview:
                message.type === 'text'
                  ? message.content
                  : message.type === 'voice'
                    ? `Message vocal (${message.content})`
                    : message.type === 'image'
                      ? 'Photo'
                      : message.type === 'location'
                        ? 'Position'
                        : 'Document',
              lastKind: message.type,
              time: message.time,
              unread: 0,
            }
          : c,
      ),
    )
  }, [])

  const deleteMessage = useCallback((conversationId: string, messageId: string) => {
    setMessagesByConvo((prev) => ({
      ...prev,
      [conversationId]: (prev[conversationId] ?? []).filter((m) => m.id !== messageId),
    }))
  }, [])

  const createConversation = useCallback((page: Page, annonceTitle?: string): string => {
    let newId = ''
    setConversations((prev) => {
      const existing = prev.find((c) => c.page.id === page.id)
      if (existing) {
        newId = existing.id
        return prev
      }
      newId = `c-${page.id}-${Date.now()}`
      const convo: Conversation = {
        id: newId,
        page,
        lastPreview: 'Nouvelle conversation',
        lastKind: 'text',
        time: 'maintenant',
        unread: 0,
        online: false,
        annonceTitle,
      }
      return [convo, ...prev]
    })
    if (!newId) {
      const existing = conversations.find((c) => c.page.id === page.id)
      newId = existing?.id ?? `c-${page.id}-${Date.now()}`
    }
    return newId
  }, [conversations])

  const markAsRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, unread: 0 } : c)),
    )
  }, [])

  const value = useMemo<MessageContextValue>(
    () => ({
      conversations,
      getConversation,
      getMessages,
      sendMessage,
      deleteMessage,
      createConversation,
      markAsRead,
    }),
    [conversations, getConversation, getMessages, sendMessage, deleteMessage, createConversation, markAsRead],
  )

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
}

export function useMessages(): MessageContextValue {
  const ctx = useContext(MessageContext)
  if (!ctx) throw new Error('useMessages doit être utilisé dans MessageProvider')
  return ctx
}
