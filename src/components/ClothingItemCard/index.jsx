import { Shirt, Footprints, Layers, Gem } from 'lucide-react'
import { CATEGORY_LABELS } from '../../data/mockData'
import styles from './ClothingItemCard.module.css'

const CATEGORY_ICON = {
  Tops:        Shirt,
  Bottoms:     Shirt,
  Shoes:       Footprints,
  Outer:       Layers,
  Accessories: Gem,
}

const CATEGORY_TAG_CLASS = {
  Tops:        'tagTops',
  Bottoms:     'tagBottoms',
  Shoes:       'tagShoes',
  Outer:       'tagOuter',
  Accessories: 'tagAccessories',
}

export default function ClothingItemCard({ item, onClick, onEdit, onDelete }) {
  const Icon     = CATEGORY_ICON[item.category]  ?? Shirt
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
      <span className={`${styles.tag} ${styles[tagClass]}`}>
        {CATEGORY_LABELS[item.category] ?? item.category}
      </span>

      {/* Hover actions overlay */}
      <div className={styles.actions}>
        <button
          className={styles.actionBtn}
          onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
        >
          ערוך
        </button>
        <button
          className={`${styles.actionBtn} ${styles.actionDelete}`}
          onClick={(e) => { e.stopPropagation(); onDelete?.(item); }}
        >
          מחק
        </button>
      </div>
    </div>
  )
}
