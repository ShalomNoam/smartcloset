import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { clothingItems as defaultItems } from '../data/mockData'

const STORAGE_KEY = 'smartcloset-wardrobe'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    // corrupted data — fall through to default
  }
  return defaultItems
}

const WardrobeContext = createContext(null)

export function WardrobeProvider({ children }) {
  // Lazy init: read localStorage on first mount, fall back to mockData
  const [items, setItems] = useState(loadFromStorage)
  const [toast, setToast]  = useState(null)
  const timerRef = useRef(null)

  // Sync to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage quota exceeded or private mode — fail silently
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
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
    setItems(defaultItems)
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
