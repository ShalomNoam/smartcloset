import { useState, useEffect, useRef } from 'react'
import { Shirt, Footprints, Layers, Gem, MoreVertical } from 'lucide-react'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [menuOpen])

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

      {/* Desktop hover actions overlay */}
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

      {/* Mobile 3-dot menu */}
      <div ref={menuRef} className={styles.moreWrap}>
        <button
          className={styles.moreBtn}
          onClick={(e) => { e.stopPropagation(); setMenuOpen(v => !v); }}
          aria-label="אפשרויות"
        >
          <MoreVertical size={16} strokeWidth={2} />
        </button>
        {menuOpen && (
          <div className={styles.moreMenu}>
            <button
              className={styles.moreItem}
              onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onEdit?.(item); }}
            >
              ✏️ ערוך
            </button>
            <button
              className={`${styles.moreItem} ${styles.moreItemDelete}`}
              onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onDelete?.(item); }}
            >
              🗑️ הסר
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
