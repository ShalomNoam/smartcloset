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

export default function OutfitCard({ outfit, onToggleSave }) {
  return (
    <div className={styles.card}>
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

      <div className={styles.info}>
        <p className={styles.name}>{outfit.name}</p>
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
