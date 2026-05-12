import { Shirt, Footprints, Layers, Gem } from 'lucide-react'
import HeartButton from '../HeartButton'
import { STYLE_TAGS_HE, MATCH_SCORES, CATEGORY_LABELS } from '../../data/mockData'
import styles from './OutfitCard.module.css'

const CATEGORY_ICON = {
  Tops:        Shirt,
  Bottoms:     Shirt,
  Shoes:       Footprints,
  Outer:       Layers,
  Accessories: Gem,
}

export default function OutfitCard({ outfit, onToggleSave }) {
  const styleTag   = STYLE_TAGS_HE[(outfit.id - 1) % STYLE_TAGS_HE.length]
  const matchScore = MATCH_SCORES[(outfit.id - 1)   % MATCH_SCORES.length]

  return (
    <div className={styles.card}>
      {/* Match score badge */}
      <div className={styles.scoreBadge}>
        <span className={styles.scoreNum}>{matchScore}%</span>
        <span className={styles.scoreLabel}>התאמה</span>
      </div>

      {/* Items list */}
      <div className={styles.itemsList}>
        {outfit.items.map((item, i) => {
          const Icon = CATEGORY_ICON[item.category] ?? Shirt
          return (
            <div key={i} className={styles.itemRow}>
              <div className={styles.itemIconSm}>
                <Icon size={16} strokeWidth={1.5} className={styles.icon} />
              </div>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.ownedBadge}>✓ בארון שלך</span>
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
