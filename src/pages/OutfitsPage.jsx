import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Sparkles, Crown, Dumbbell, Shirt } from 'lucide-react'
import OutfitCard from '../components/OutfitCard'
import { useWardrobe } from '../context/WardrobeContext'
import { useAuth }     from '../context/AuthContext'
import { supabase }    from '../lib/supabase'
import { eventTypes }  from '../data/mockData'
import styles from './OutfitsPage.module.css'

const EVENT_ICON = {
  Work:    Briefcase,
  Party:   Sparkles,
  Wedding: Crown,
  Sport:   Dumbbell,
}

export default function OutfitsPage() {
  const navigate = useNavigate()
  const { items } = useWardrobe()
  const { user }  = useAuth()

  const [activeEvent, setActiveEvent] = useState('Work')
  const [savedMap,    setSavedMap]    = useState({})
  const [outfits,     setOutfits]     = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)

  useEffect(() => {
    if (!user) return

    setLoading(true)
    setError(null)

    supabase
      .from('outfits')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error: fetchError }) => {
        if (fetchError) {
          setError(fetchError.message)
        } else {
          const fetched = data ?? []
          setOutfits(fetched)
          // Seed local saved state from DB values
          const map = {}
          fetched.forEach(o => { map[o.id] = o.saved ?? false })
          setSavedMap(map)
        }
        setLoading(false)
      })
  }, [user])

  function handleToggleSave(id, val) {
    setSavedMap(prev => ({ ...prev, [id]: val }))
  }

  // Filter fetched outfits to the active event tab
  const visibleOutfits = outfits.filter(o => o.event_type === activeEvent)

  /* ── Empty wardrobe state (shown before even trying to load outfits) ── */
  if (!loading && items.length === 0) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>לוקים</h1>
          <p className={styles.subtitle}>ה-AI ממליץ לך מהארון שלך</p>
        </header>
        <div className={styles.emptyState}>
          <div className={styles.emptyIconWrap}>
            <Shirt size={52} strokeWidth={1} className={styles.emptyIcon} />
          </div>
          <h2 className={styles.emptyTitle}>אין מספיק בגדים בארון</h2>
          <p className={styles.emptyDesc}>
            הוסף לפחות 3 פריטים כדי שה-AI יוכל לבנות לך המלצות לוק מהארון שלך
          </p>
          <button className={styles.emptyCta} onClick={() => navigate('/closet/add')}>
            הוסף בגדים לארון ←
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>לוקים</h1>
        <p className={styles.subtitle}>ה-AI ממליץ לך מהארון שלך</p>
      </header>

      {/* Quick button */}
      <button className={styles.quickBtn} onClick={() => navigate('/dashboard')}>
        <Sparkles size={13} strokeWidth={2} />
        מה מתאים לי היום?
      </button>

      {/* Event tabs */}
      <p className={styles.question}>לאיזה אירוע?</p>
      <div className={styles.eventGrid}>
        {eventTypes.map(({ key, label }) => {
          const Icon     = EVENT_ICON[key] ?? Sparkles
          const isActive = activeEvent === key
          return (
            <button
              key={key}
              onClick={() => setActiveEvent(key)}
              className={`${styles.eventBtn} ${isActive ? styles.eventActive : ''}`}
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2 : 1.5}
                className={isActive ? styles.eventIconActive : styles.eventIcon}
              />
              <span className={isActive ? styles.eventLabelActive : styles.eventLabel}>
                {label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Suggestions header */}
      <div className={styles.suggestHeader}>
        <h2 className={styles.suggestTitle}>לוקים מוצעים</h2>
        {!loading && !error && (
          <span className={styles.suggestBadge}>{visibleOutfits.length} לוקים</span>
        )}
      </div>

      {/* ── Fetch error ── */}
      {error && (
        <div className={styles.errorState}>
          <p className={styles.errorTitle}>שגיאה בטעינת הלוקים</p>
          <p className={styles.errorDesc}>{error}</p>
        </div>
      )}

      {/* ── Loading skeletons ── */}
      {!error && loading && (
        <div className={styles.outfitList}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`skeleton ${styles.skeletonCard}`} />
          ))}
        </div>
      )}

      {/* ── Outfits list ── */}
      {!error && !loading && (
        visibleOutfits.length === 0 ? (
          <div className={styles.noOutfitsState}>
            <Sparkles size={32} strokeWidth={1.25} className={styles.noOutfitsIcon} />
            <p className={styles.noOutfitsText}>אין לוקים לאירוע זה עדיין</p>
          </div>
        ) : (
          <div className={styles.outfitList}>
            {visibleOutfits.map((outfit, i) => (
              <div
                key={outfit.id}
                className={styles.outfitWrap}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <OutfitCard
                  outfit={{ ...outfit, saved: savedMap[outfit.id] ?? outfit.saved }}
                  index={i}
                  onToggleSave={handleToggleSave}
                />
              </div>
            ))}
          </div>
        )
      )}

      {/* AI note — only shown when there's something to annotate */}
      {!loading && !error && visibleOutfits.length > 0 && (
        <div className={styles.aiNote}>
          <Sparkles size={13} strokeWidth={1.75} className={styles.aiIcon} />
          <p className={styles.aiText}>
            הלוקים נוצרו ע"י AI מהארון שלך בהתאם לאירוע ומזג האוויר.
          </p>
        </div>
      )}

    </div>
  )
}
