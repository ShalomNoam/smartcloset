import { createContext, useContext, useState, useEffect, useRef } from 'react'

const STORAGE_KEY = 'smartcloset-wardrobe'
const VERSION_KEY  = 'smartcloset-version'
const SCHEMA_VER   = '3'   // bump this whenever the default dataset changes

function loadFromStorage() {
  try {
    const storedVersion = localStorage.getItem(VERSION_KEY)

    if (storedVersion !== SCHEMA_VER) {
      // Stale or missing version — wipe everything and start fresh
      localStorage.removeItem(STORAGE_KEY)
      localStorage.setItem(VERSION_KEY, SCHEMA_VER)
      return []
    }

    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    // Corrupted storage — start fresh
    try {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.setItem(VERSION_KEY, SCHEMA_VER)
    } catch {}
  }
  return []
}

const WardrobeContext = createContext(null)

export function WardrobeProvider({ children }) {
  // Lazy init: runs once — reads/validates localStorage, returns [] for new/stale users
  const [items, setItems] = useState(loadFromStorage)
  const [toast, setToast]  = useState(null)
  const timerRef = useRef(null)

  // Sync to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      localStorage.setItem(VERSION_KEY, SCHEMA_VER)
    } catch {
      // Private mode or quota exceeded — fail silently
    }
  }, [items])

  function showToast(message, type = 'success') {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast({ message, type })
    timerRef.current = setTimeout(() => setToast(null), 3000)
  }

  function addItem(data) {
    const newItem = { ...data, id: Date.now() }
    setItems(prev => [...prev, newItem])
    showToast('הפריט נוסף לארון שלך ✓')
    return newItem
  }

  function editItem(id, updates) {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item))
    showToast('השינויים נשמרו ✓')
  }

  function deleteItem(id) {
    setItems(prev => prev.filter(item => item.id !== id))
    showToast('הפריט הוסר מהארון שלך')
  }

  function resetToDefault() {
    try {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.setItem(VERSION_KEY, SCHEMA_VER)
    } catch {}
    setItems([])
    showToast('הארון אופס לברירת מחדל ✓')
  }

  return (
    <WardrobeContext.Provider value={{ items, addItem, editItem, deleteItem, resetToDefault, toast }}>
      {children}
    </WardrobeContext.Provider>
  )
}

export function useWardrobe() {
  const ctx = useContext(WardrobeContext)
  if (!ctx) throw new Error('useWardrobe must be used within WardrobeProvider')
  return ctx
}
