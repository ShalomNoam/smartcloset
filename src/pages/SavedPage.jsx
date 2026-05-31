import { useState, useEffect } from 'react'
import { Heart, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth }   from '../context/AuthContext'
import { supabase }  from '../lib/supabase'
import OutfitCard    from '../components/OutfitCard'
import styles from './SavedPage.module.css'

export default function SavedPage() {
  const navigate  = useNavigate()
  const { user }  = useAuth()

  const [outfits, setOutfits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!user) return

    setLoading(true)
    setError(null)

    supabase
      .from('outfits')
      .select('*')
      .eq('user_id', user.id)
      .eq('saved', true)
      .order('created_at', { ascending: false })
      .then(({ data, error: fetchError }) => {
        if (fetchError) setError(fetchError.message)
        else setOutfits(data ?? [])
        setLoading(false)
      })
  }, [user])

  async function handleToggleSave(id, val) {
    // Optimistic: remove immediately when unsaved
    if (!val) setOutfits(prev => prev.filter(o => o.id !== id))

    const { error: updateError } = await supabase
      .from('outfits')
      .update({ saved: val })
      .eq('id', id)
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Failed to update saved state:', updateError)
      // Revert: restore the item if the DB write failed
      if (!val) {
        supabase
          .from('outfits')
          .select('*')
          .eq('id', id)
          .single()
          .then(({ data }) => {
            if (data) setOutfits(prev => [data, ...prev])
          })
      }
    }
  }

  /* ── Header is always visible ── */
  const header = (
    <header className={styles.header}>
      <h1 className={styles.title}>לוקים שמורים</h1>
      <p className={styles.subtitle}>הלוקים שאהבת, במקום אחד</p>
    </header>
  )

  /* ── Loading ── */
  if (loading) {
    return (
      <div className={styles.page}>
        {header}
        <div className={styles.outfitList}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`skeleton ${styles.skeletonCard}`} />
          ))}
        </div>
      </div>
    )
  }

  /* ── Error ── */
  if (error) {
    return (
      <div className={styles.page}>
        {header}
        <div className={styles.errorState}>
          <p className={styles.errorTitle}>שגיאה בטעינת הלוקים השמורים</p>
          <p className={styles.errorDesc}>{error}</p>
        </div>
      </div>
    )
  }

  /* ── Empty ── */
  if (outfits.length === 0) {
    return (
      <div className={styles.page}>
        {header}
        <div className={styles.empty}>
          <div className={styles.iconWrap}>
            <Heart size={40} strokeWidth={1.25} className={styles.icon} />
          </div>
          <p className={styles.heading}>עדיין אין לוקים שמורים</p>
          <p className={styles.desc}>
            לחץ על לב בכל לוק שתאהב ותמצא אותו כאן בכל רגע.
          </p>
          <div className={styles.hint}>
            <Heart size={12} strokeWidth={2} className={styles.hintIcon} />
            <span>לחץ על הלב בכרטיס הלוק</span>
          </div>
          <button className={styles.ctaBtn} onClick={() => navigate('/outfits')}>
            <Sparkles size={14} strokeWidth={1.75} />
            גלה לוקים
          </button>
        </div>
      </div>
    )
  }

  /* ── List ── */
  return (
    <div className={styles.page}>
      {header}

      <p className={styles.countBadge}>
        <Heart size={12} strokeWidth={2.5} className={styles.countIcon} />
        {outfits.length} {outfits.length === 1 ? 'לוק שמור' : 'לוקים שמורים'}
      </p>

      <div className={styles.outfitList}>
        {outfits.map((outfit, i) => (
          <OutfitCard
            key={outfit.id}
            outfit={outfit}
            index={i}
            onToggleSave={handleToggleSave}
          />
        ))}
      </div>
    </div>
  )
}
