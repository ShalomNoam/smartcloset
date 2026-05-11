import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Sparkles, Crown, Dumbbell } from 'lucide-react'
import OutfitCard from '../components/OutfitCard'
import { outfitsByEvent, eventTypes } from '../data/mockData'
import styles from './OutfitsPage.module.css'

const EVENT_ICON = {
  Work:    Briefcase,
  Party:   Sparkles,
  Wedding: Crown,
  Sport:   Dumbbell,
}

export default function OutfitsPage() {
  const navigate = useNavigate()
  const [activeEvent, setActiveEvent] = useState('Work')
  const [savedMap,    setSavedMap]    = useState({})

  const outfits = outfitsByEvent[activeEvent] ?? []

  function handleToggleSave(id, val) {
    setSavedMap((prev) => ({ ...prev, [id]: val }))
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

      {/* Suggestions */}
      <div className={styles.suggestHeader}>
        <h2 className={styles.suggestTitle}>לוקים מוצעים</h2>
        <span className={styles.suggestBadge}>{outfits.length} לוקים</span>
      </div>

      <div className={styles.outfitList}>
        {outfits.map((outfit, i) => (
          <div
            key={outfit.id}
            className={styles.outfitWrap}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <OutfitCard
              outfit={{ ...outfit, saved: savedMap[outfit.id] ?? outfit.saved }}
              onToggleSave={handleToggleSave}
            />
          </div>
        ))}
      </div>

      {/* AI note */}
      <div className={styles.aiNote}>
        <Sparkles size={13} strokeWidth={1.75} className={styles.aiIcon} />
        <p className={styles.aiText}>
          הלוקים נוצרו ע"י AI מהארון שלך בהתאם לאירוע ומזג האוויר.
        </p>
      </div>
    </div>
  )
}
