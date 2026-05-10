import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Sparkles, Crown, Dumbbell, ChevronLeft } from 'lucide-react'
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
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
          <ChevronLeft size={18} strokeWidth={2.5} className={styles.backIcon} />
          Back
        </button>
        <h1 className={styles.title}>AI Outfits</h1>
        <div style={{ width: 60 }} />
      </header>

      <p className={styles.question}>What's the occasion?</p>

      {/* Event 2×2 grid */}
      <div className={styles.eventGrid}>
        {eventTypes.map(({ key, label }) => {
          const Icon    = EVENT_ICON[key] ?? Sparkles
          const isActive = activeEvent === key
          return (
            <button
              key={key}
              onClick={() => setActiveEvent(key)}
              className={`${styles.eventBtn} ${isActive ? styles.eventActive : ''}`}
            >
              <Icon
                size={26}
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
        <h2 className={styles.suggestTitle}>Suggested Outfits</h2>
        <span className={styles.suggestBadge}>{outfits.length} looks</span>
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
        <Sparkles size={14} strokeWidth={1.75} className={styles.aiIcon} />
        <p className={styles.aiText}>
          Outfits are AI-curated from your wardrobe based on the occasion.
        </p>
      </div>
    </div>
  )
}
