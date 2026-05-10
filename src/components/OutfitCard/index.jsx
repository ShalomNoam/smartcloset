import { Shirt, Footprints, Layers, Gem } from 'lucide-react'
import HeartButton from '../HeartButton'
import styles from './OutfitCard.module.css'

const CATEGORY_ICON = {
  Tops:        Shirt,
  Bottoms:     Shirt,
  Shoes:       Footprints,
  Outer:       Layers,
  Accessories: Gem,
}

const STYLE_TAGS  = ['Trending', 'Classic', 'Bold', 'Minimal', 'Chic', 'Street']
const STYLE_SCORES = [94, 88, 96, 82, 91, 85, 97, 89, 93, 87, 95, 90]

export default function OutfitCard({ outfit, onToggleSave }) {
  const styleTag   = STYLE_TAGS[(outfit.id - 1) % STYLE_TAGS.length]
  const matchScore = STYLE_SCORES[(outfit.id - 1) % STYLE_SCORES.length]

  return (
    <div className={styles.card}>
      {/* Style score badge */}
      <div className={styles.scoreBadge}>
        <span className={styles.scoreNum}>{matchScore}%</span>
        <span className={styles.scoreLabel}>match</span>
      </div>

      {/* Item icons */}
      <div className={styles.icons}>
        {outfit.items.map((item, i) => {
          const Icon = CATEGORY_ICON[item.category] ?? Shirt
          return (
            <div key={i} className={styles.iconCircle} title={item.name}>
              <Icon size={20} strokeWidth={1.5} className={styles.icon} />
            </div>
          )
        })}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.nameRow}>
          <p className={styles.name}>{outfit.name}</p>
          <span className={styles.styleTag}>{styleTag}</span>
        </div>
        <div className={styles.tags}>
          {outfit.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>

      <HeartButton initialSaved={outfit.saved} onToggle={(v) => onToggleSave?.(outfit.id, v)} />
    </div>
  )
}
