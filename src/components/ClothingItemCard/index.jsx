import { Shirt, Footprints, Layers, Gem } from 'lucide-react'
import styles from './ClothingItemCard.module.css'

const CATEGORY_ICON = {
  Tops:        Shirt,
  Bottoms:     Shirt,
  Shoes:       Footprints,
  Outer:       Layers,
  Accessories: Gem,
}

export default function ClothingItemCard({ item, onClick }) {
  const Icon = CATEGORY_ICON[item.category] ?? Shirt

  return (
    <div
      className={styles.card}
      onClick={() => onClick?.(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(item)}
    >
      <div className={styles.iconWrap}>
        <Icon size={28} strokeWidth={1.5} className={styles.icon} />
      </div>
      <p className={styles.name}>{item.name}</p>
      <span className={styles.tag}>{item.category}</span>
    </div>
  )
}
