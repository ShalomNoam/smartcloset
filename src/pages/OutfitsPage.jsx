import { useState, useEffect, useMemo } from 'react'
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

/* ── Outfit generation data ── */
const EVENT_OUTFIT_NAMES = {
  Work:    ['לוק משרד מושלם', 'הסטייל של הישיבה', 'מקצועי בלי להשתדל', 'יום בעבודה בסטייל'],
  Party:   ['לילה בעיר', 'שעת קוקטייל', 'ליל שישי', 'מסיבה בסטייל'],
  Wedding: ['מסיבת גן', 'אלגנטי קלאסי', 'בוהו שיק', 'אורח בחתונה'],
  Sport:   ['מוכן לאימון', 'ריצת בוקר', 'יוגה ופילאטיס', 'כושר בסטייל'],
}

const EVENT_OUTFIT_TAGS = {
  Work:    [['עסקי','נקי','קלאסי'], ['מקצועי','אלגנטי'], ["קז'ואל",'נוח','יומיומי'], ['סמארט','מדויק']],
  Party:   [['ליל שישי','סטייל','עירוני'], ['אלגנטי','מסיבה'], ['כיף',"קז'ואל"], ['פינוק','טרנדי']],
  Wedding: [['אלגנטי','גן'], ['קלאסי','אלגנטי'], ['בוהו','רומנטי'], ['חגיגי','ייחודי']],
  Sport:   [['ספורטיבי','נוח'], ['ריצה','בוקר'], ['יוגה','מיינדפולנס'], ['כושר','אנרגיה']],
}

// Which categories to prioritise per event type
const EVENT_CATEGORY_PRIORITY = {
  Work:    ['Tops', 'Bottoms', 'Shoes', 'Outer'],
  Party:   ['Tops', 'Shoes', 'Bottoms', 'Outer', 'Accessories'],
  Wedding: ['Tops', 'Outer', 'Bottoms', 'Shoes', 'Accessories'],
  Sport:   ['Tops', 'Bottoms', 'Shoes'],
}

function generateOutfitsFromItems(items, eventType) {
  if (!items?.length) return []

  // Group wardrobe items by category
  const byCategory = {}
  items.forEach(item => {
    if (!byCategory[item.category]) byCategory[item.category] = []
    byCategory[item.category].push(item)
  })

  const cats  = EVENT_CATEGORY_PRIORITY[eventType] ?? ['Tops', 'Bottoms', 'Shoes']
  const names = EVENT_OUTFIT_NAMES[eventType]      ?? []
  const tags  = EVENT_OUTFIT_TAGS[eventType]       ?? []
  const MAX   = 4
  const result = []

  for (let i = 0; i < MAX; i++) {
    const outfitItems = []

    cats.forEach((cat, ci) => {
      const pool = byCategory[cat]
      if (!pool?.length) return
      // Offset per category index so consecutive outfits don't repeat identically
      outfitItems.push(pool[(i + ci) % pool.length])
    })

    if (!outfitItems.length) continue

    result.push({
      id:         `gen-${eventType}-${i}`,
      event_type: eventType,
      name:       names[i % names.length] ?? `לוק ${i + 1}`,
      items:      outfitItems.slice(0, 3).map(it => ({ category: it.category, name: it.name })),
      tags:       tags[i % tags.length] ?? [],
      saved:      false,
      generated:  true,
    })
  }

  return result
}

export default function OutfitsPage() {
  const navigate = useNavigate()
  const { items, loading: wardrobeLoading } = useWardrobe()
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

  // Auto-generate outfits from the user's wardrobe items
  const generatedOutfits = useMemo(
    () => (!wardrobeLoading && items.length > 0)
      ? generateOutfitsFromItems(items, activeEvent)
      : [],
    [items, activeEvent, wardrobeLoading]
  )

  // DB outfits filtered to the current event tab
  const dbOutfitsForEvent = outfits.filter(o => o.event_type === activeEvent)

  // Show DB outfits when available; fall back to generated ones
  const visibleOutfits = dbOutfitsForEvent.length > 0 ? dbOutfitsForEvent : generatedOutfits
  const isGenerated    = dbOutfitsForEvent.length === 0 && generatedOutfits.length > 0

  async function handleToggleSave(id, val) {
    // ── Generated outfit: INSERT into DB on first save ──
    if (String(id).startsWith('gen-')) {
      if (!val) return  // was never in DB, nothing to unsave
      const genOutfit = generatedOutfits.find(o => o.id === id)
      if (!genOutfit) return

      const { data: newRow, error: insertError } = await supabase
        .from('outfits')
        .insert({
          user_id:    user.id,
          event_type: genOutfit.event_type,
          name:       genOutfit.name,
          items:      genOutfit.items,
          tags:       genOutfit.tags,
          saved:      true,
        })
        .select()
        .single()

      if (insertError) {
        console.error('Failed to save generated outfit:', insertError)
        return
      }
      // Add real DB row to outfits state and savedMap
      setOutfits(prev => [newRow, ...prev])
      setSavedMap(prev => ({ ...prev, [newRow.id]: true }))
      return
    }

    // ── Existing DB outfit: UPDATE saved flag ──
    setSavedMap(prev => ({ ...prev, [id]: val }))  // optimistic

    const { error: updateError } = await supabase
      .from('outfits')
      .update({ saved: val })
      .eq('id', id)
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Failed to persist save toggle:', updateError)
      setSavedMap(prev => ({ ...prev, [id]: !val }))  // revert
    }
  }

  /* ── Empty wardrobe state — wait for BOTH fetches before deciding ── */
  if (!loading && !wardrobeLoading && items.length === 0) {
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
      {!error && (loading || wardrobeLoading) && (
        <div className={styles.outfitList}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`skeleton ${styles.skeletonCard}`} />
          ))}
        </div>
      )}

      {/* ── Outfits list ── */}
      {!error && !loading && !wardrobeLoading && (
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
      {!loading && !wardrobeLoading && !error && visibleOutfits.length > 0 && (
        <div className={styles.aiNote}>
          <Sparkles size={13} strokeWidth={1.75} className={styles.aiIcon} />
          <p className={styles.aiText}>
            {isGenerated
              ? 'הלוקים נוצרו אוטומטית מהבגדים שבארון שלך. לחץ על הלב כדי לשמור לוק!'
              : 'הלוקים נוצרו ע"י AI מהארון שלך בהתאם לאירוע ומזג האוויר.'}
          </p>
        </div>
      )}

    </div>
  )
}
