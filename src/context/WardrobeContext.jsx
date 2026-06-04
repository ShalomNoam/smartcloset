import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth }  from './AuthContext'
import {
  createClothingItem,
  fetchUserClothingItems,
  updateClothingItem,
  deleteClothingItem,
} from '../lib/wardrobeService'

const WardrobeContext = createContext(null)

export function WardrobeProvider({ children }) {
  const { user }  = useAuth()
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [toast,   setToast]   = useState(null)
  const timerRef = useRef(null)

  // Re-fetch whenever the logged-in user changes (login, logout, page refresh)
  useEffect(() => {
    if (!user) {
      setItems([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    fetchUserClothingItems(supabase, user.id)
      .then(data => setItems(data))
      .catch(err  => setError(err.message))
      .finally(() => setLoading(false))
  }, [user])

  function showToast(message, type = 'success') {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast({ message, type })
    timerRef.current = setTimeout(() => setToast(null), 3000)
  }

  async function addItem(data) {
    const newItem = await createClothingItem(supabase, user.id, data)
    setItems(prev => [newItem, ...prev])
    showToast('הפריט נוסף לארון שלך ✓')
    return newItem
  }

  async function editItem(id, updates) {
    try {
      await updateClothingItem(supabase, user.id, id, updates)
      setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item))
      showToast('השינויים נשמרו ✓')
    } catch {
      showToast('שגיאה בשמירת השינויים', 'error')
    }
  }

  async function deleteItem(id) {
    try {
      await deleteClothingItem(supabase, user.id, id)
      setItems(prev => prev.filter(item => item.id !== id))
      showToast('הפריט הוסר מהארון שלך')
    } catch {
      showToast('שגיאה במחיקת הפריט', 'error')
    }
  }

  async function resetToDefault() {
    const { error: resetError } = await supabase
      .from('clothing_items')
      .delete()
      .eq('user_id', user.id)

    if (!resetError) setItems([])
    showToast('הארון אופס לברירת מחדל ✓')
  }

  return (
    <WardrobeContext.Provider value={{
      items, loading, error,
      addItem, editItem, deleteItem, resetToDefault,
      toast,
    }}>
      {children}
    </WardrobeContext.Provider>
  )
}

export function useWardrobe() {
  const ctx = useContext(WardrobeContext)
  if (!ctx) throw new Error('useWardrobe must be used within WardrobeProvider')
  return ctx
}
