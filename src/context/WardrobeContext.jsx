import { createContext, useContext, useState, useRef } from 'react'
import { clothingItems as initialItems } from '../data/mockData'

const WardrobeContext = createContext(null)

export function WardrobeProvider({ children }) {
  const [items, setItems] = useState(initialItems)
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

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

  return (
    <WardrobeContext.Provider value={{ items, addItem, editItem, deleteItem, toast }}>
      {children}
    </WardrobeContext.Provider>
  )
}

export function useWardrobe() {
  const ctx = useContext(WardrobeContext)
  if (!ctx) throw new Error('useWardrobe must be within WardrobeProvider')
  return ctx
}
