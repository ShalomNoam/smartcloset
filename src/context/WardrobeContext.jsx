import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth }  from './AuthContext'

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

    supabase
      .from('clothing_items')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error: fetchError }) => {
        if (fetchError) {
          setError(fetchError.message)
        } else {
          setItems(data ?? [])
        }
        setLoading(false)
      })
  }, [user])

  function showToast(message, type = 'success') {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast({ message, type })
    timerRef.current = setTimeout(() => setToast(null), 3000)
  }

  async function addItem(data) {
    const { data: newItem, error: insertError } = await supabase
      .from('clothing_items')
      .insert({ ...data, user_id: user.id })
      .select()
      .single()

    if (insertError) throw insertError

    // Prepend so it appears first (matches created_at DESC order)
    setItems(prev => [newItem, ...prev])
    showToast('הפריט נוסף לארון שלך ✓')
    return newItem
  }

  async function editItem(id, updates) {
    const { error: updateError } = await supabase
      .from('clothing_items')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)

    if (updateError) {
      showToast('שגיאה בשמירת השינויים', 'error')
      return
    }
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item))
    showToast('השינויים נשמרו ✓')
  }

  async function deleteItem(id) {
    const { error: deleteError } = await supabase
      .from('clothing_items')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (deleteError) {
      showToast('שגיאה במחיקת הפריט', 'error')
      return
    }
    setItems(prev => prev.filter(item => item.id !== id))
    showToast('הפריט הוסר מהארון שלך')
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
