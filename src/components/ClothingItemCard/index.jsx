import { Shirt, Footprints, Layers, Gem } from 'lucide-react'
import styles from './ClothingItemCard.module.css'

const CATEGORY_ICON = {
  Tops:        Shirt,
  Bottoms:     Shirt,
  Shoes:       Footprints,
  Outer:       Layers,
  Accessories: Gem,
}

// Maps category → CSS module class for the badge color
const CATEGORY_TAG_CLASS = {
  Tops:        'tagTops',
  Bottoms:     'tagBottoms',
  Shoes:       'tagShoes',
  Outer:       'tagOuter',
  Accessories: 'tagAccessories',
}

export default function ClothingItemCard({ item, onClick }) {
  const Icon     = CATEGORY_ICON[item.category] ?? Shirt
  const tagClass = CATEGORY_TAG_CLASS[item.category] ?? 'tagTops'

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
      <span className={`${styles.tag} ${styles[tagClass]}`}>{item.category}</span>
    </div>
  )
}
