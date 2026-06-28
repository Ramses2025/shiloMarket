# Maquette — Messages

> Chat, messages vocaux et appels vidéo entre clients, propriétaires et prestataires. Mobile-first.
> Couleurs : titre `vert-principal`, bulles envoyées vertes, bulles reçues `gris-fond`.

---

## 1. État non connecté

```
┌─────────────────────────────────────┐
│ Messages                             │  ← titre vert gras
├─────────────────────────────────────┤
│                                      │
│              💬 (vert)               │  ← icône centrée
│                                      │
│   Connectez-vous pour discuter       │  ← titre gras
│                                      │
│  Envoyez des messages, vocaux et     │  ← gris-texte
│  lancez des appels vidéo avec les    │
│  propriétaires et prestataires.      │
│                                      │
│       ┌──────────────────┐           │
│       │   Se connecter   │           │  ← bouton vert
│       └──────────────────┘           │
│                                      │
├─────────────────────────────────────┤
│ 🏠   🛒    ▶️    💬    👤            │
└─────────────────────────────────────┘
```

---

## 2. Liste des conversations (connecté)

```
┌─────────────────────────────────────┐
│ Messages                       ✏️    │  ← nouveau message
│ ┌─────────────────────────────────┐ │
│ │ 🔍 Rechercher une conversation  │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ (👤) Shilo Immobilier ✔      14:32   │
│      Oui, la maison est dispo… ● 2   │  ← aperçu + non-lus (pastille verte)
│ ─────────────────────────────────── │
│ (👤) Congo Auto Location ✔   Hier    │
│      🎤 Message vocal (0:12)         │
│ ─────────────────────────────────── │
│ (👤) Jean Prestataire        Lun     │
│      Vous : Merci beaucoup 👍        │  ← « Vous : » = envoyé, lu (✓✓)
│ ─────────────────────────────────── │
│ (👤) Agence Plateau ✔        12 juin │
│      📷 Photo                        │
├─────────────────────────────────────┤
│ 🏠   🛒    ▶️    💬•   👤            │
└─────────────────────────────────────┘
```

### Éléments
- Avatar + nom (+ badge `✔` si page vérifiée), heure, aperçu du dernier message.
- **Non-lus** : pastille verte avec compteur, texte en gras.
- Types d'aperçu : texte, `🎤 vocal (durée)`, `📷 Photo`, `📍 Localisation`, accusés `✓ / ✓✓`.

---

## 3. Conversation (chat)

```
┌─────────────────────────────────────┐
│ ←  (👤) Shilo Immobilier ✔   📞  🎥 │  ← retour, nom, appel, vidéo
│        En ligne                      │
├─────────────────────────────────────┤
│ ┌─────────────────────────────┐      │
│ │ Annonce : Maison meublée 4  │      │  ← contexte annonce épinglé
│ │ pièces · 350 000 FCFA/mois  │      │
│ └─────────────────────────────┘      │
│                                      │
│  ┌───────────────────────┐           │  ← bulle reçue (gris-fond)
│  │ Bonjour, la maison     │  14:20   │
│  │ est-elle disponible ?  │          │
│  └───────────────────────┘           │
│            ┌───────────────────────┐ │  ← bulle envoyée (verte, droite)
│     14:22  │ Oui, disponible        │ │
│            │ immédiatement ! ✓✓     │ │
│            └───────────────────────┘ │
│  ┌───────────────────────┐           │
│  │ 🎤 ▶ ▬▬▬▬▬▬  0:12     │  14:25   │  ← message vocal
│  └───────────────────────┘           │
│            ┌───────────────────────┐ │
│            │ 📷 [ photo ]           │ │  ← image envoyée
│            └───────────────────────┘ │
├─────────────────────────────────────┤
│ ➕  ┌───────────────────────┐  🎤   │  ← barre de saisie
│     │ Écrire un message…    │        │
│     └───────────────────────┘        │
└─────────────────────────────────────┘
```

### Barre de saisie
- **➕** : joindre (photo, vidéo, fichier, localisation, annonce).
- **Champ texte** : `gris-fond`, multi-ligne.
- **🎤** : appui maintenu pour enregistrer un vocal ; bascule en **➤ envoyer** dès qu'on tape du texte.

### En-tête conversation
- Avatar + nom + badge, statut `En ligne` / `Vu à 14:30`.
- **📞** appel audio · **🎥** appel vidéo (WebRTC).
- Bandeau **contexte annonce** épinglé en haut quand la discussion vient d'une annonce.

---

## 4. Appel (audio / vidéo)

```
┌─────────────────────────────────────┐
│                                      │
│        [ flux vidéo distant ]        │
│                                      │
│                       ┌──────────┐   │
│                       │ vidéo moi│   │  ← incrustation locale
│                       └──────────┘   │
│   (👤) Shilo Immobilier              │
│        00:42                         │  ← durée
│                                      │
│   🔇      🎥       💬       ☎️(rouge) │  ← muet, caméra, chat, raccrocher
└─────────────────────────────────────┘
```

---

## 5. Responsive

| Cible | Layout |
|-------|--------|
| **Mobile** | 1 vue à la fois : liste → conversation (navigation par pile) |
| **Tablette** | Split possible en paysage : liste étroite + conversation |
| **Desktop** | 2 panneaux : liste (gauche `340 px`) + conversation (droite extensible) ; sidebar nav à gauche |

```
Desktop
┌────────────┬───────────────┬───────────────────────┐
│ Sidebar    │ Conversations │ (👤) Shilo Immo ✔ 📞🎥 │
│ nav        │ (👤) Shilo  ●2│ ┌────────────┐         │
│            │ (👤) Congo    │ │ bulle reçue│         │
│            │ (👤) Jean     │ │   bulle envoyée ✓✓   │
│            │ (👤) Agence   │ ➕ [ saisie… ] 🎤      │
└────────────┴───────────────┴───────────────────────┘
```

---

## 6. Statut d'implémentation (mise à jour)

### Liste des conversations — ✅ Implémenté (`pages/Messages.tsx`)
- **Recherche** : filtrage par nom de page ou aperçu du dernier message.
- **Conversations** : affichées via `MessageContext` (état centralisé, plus de mutation directe des données mock).
- **Suggestions de pages** : pages sans conversation existante, bouton pour démarrer une conversation.
- **Nouveau message** : FAB `✏️` ouvre un modal avec les pages suggérées.
- **Création de conversation** : via `MessageContext.createConversation()`, toast de confirmation, navigation vers la conversation.
- **États** : non connecté (écran de connexion), liste vide (message + bouton nouveau).

### Conversation (chat) — ✅ Implémenté (`pages/Conversation.tsx`)
- **ChatHeader** : avatar, nom, badge, statut en ligne, boutons appel audio/vidéo (démo).
- **Contexte annonce** : bandeau épinglé si la conversation vient d'une annonce.
- **Bulles de messages** : `ChatMessageBubble` avec suppression (swipe/long press), accusés de lecture.
- **Types de messages** : texte, vocal (lecteur), image, localisation, document.
- **ChatInput** : champ texte, bouton micro (vocal), bouton pièce jointe (photo/lieu/document), emoji picker.
- **Réponse simulée** : après envoi, indicateur de saisie puis réponse automatique après 2s.
- **Persistance** : messages envoyés/reçus sauvegardés via `MessageContext` (état React, survit aux changements de page).
- **Marquer comme lu** : `markAsRead()` au chargement de la conversation.
- **Scroll auto** : vers le bas à chaque nouveau message.
- **Création automatique** : si on arrive avec un ID d'annonce, une conversation est créée avec la page de l'annonce.

### MessageContext — ✅ Implémenté (`context/MessageContext.tsx`)
- **État centralisé** : `conversations` et `messagesByConvo` en `useState`.
- **API** : `getConversation`, `getMessages`, `sendMessage`, `deleteMessage`, `createConversation`, `markAsRead`.
- **Déduplication** : `createConversation` vérifie si une conversation existe déjà pour la page avant d'en créer une nouvelle.
- **Mise à jour du dernier aperçu** : `sendMessage` met à jour `lastPreview`, `lastKind`, `time` et `unread` de la conversation.

### Appel audio/vidéo — ⚠️ Non implémenté
- Boutons présents mais affichent seulement un toast « Appel en cours… (démo) ». WebRTC non codé.
