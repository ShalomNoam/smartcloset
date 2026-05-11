import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Plus, Shirt, Footprints, Layers, Gem, SlidersHorizontal } from 'lucide-react'
import ClothingItemCard from '../components/ClothingItemCard'
import FilterChips      from '../components/FilterChips'
import { clothingItems, categories, CATEGORY_LABELS, SEASON_LABELS } from '../data/mockData'
import styles from './ClosetPage.module.css'

const CATEGORY_ICON = {
  Tops: Shirt, Bottoms: Shirt, Shoes: Footprints, Outer: Layers, Accessories: Gem,
}

const SORT_OPTIONS = [
  { value: 'default',  label: 'ברירת מחדל' },
  { value: 'name-asc', label: 'שם א-ת' },
  { value: 'name-desc',label: 'שם ת-א' },
  { value: 'category', label: 'קטגוריה' },
]

function sortItems(items, sortBy) {
  const sorted = [...items]
  if (sortBy === 'name-asc')  return sorted.sort((a, b) => a.name.localeCompare(b.name, 'he'))
  if (sortBy === 'name-desc') return sorted.sort((a, b) => b.name.localeCompare(a.name, 'he'))
  if (sortBy === 'category')  return sorted.sort((a, b) => a.category.localeCompare(b.category))
  return sorted
}

export default function ClosetPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')
  const [search,       setSearch]       = useState('')
  const [sortBy,       setSortBy]       = useState('default')
  const [loading,      setLoading]      = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  const filtered = sortItems(
    clothingItems.filter((item) => {
      const matchCat    = activeFilter === 'All' || item.category === activeFilter
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    }),
    sortBy
  )

  return (
    <div className={styles.page}>

      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>הארון שלי</h1>
          <p className={styles.countBadge}>{clothingItems.length} פריטים</p>
        </div>
        <button className={styles.addBtn} onClick={() => navigate('/closet/add')}>
          <Plus size={15} strokeWidth={2.5} />
          הוסף
        </button>
      </header>

      {/* Search + Sort row */}
      <div className={styles.controlsRow}>
        <div className={styles.searchWrap}>
          <Search size={15} strokeWidth={2} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.search}
            placeholder="חפש בארון..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => setSearch('')} aria-label="נקה חיפוש">
              <X size={12} strokeWidth={2.5} />
            </button>
          )}
        </div>

        <div className={styles.sortWrap}>
          <SlidersHorizontal size={13} strokeWidth={2} className={styles.sortIcon} />
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="מיין לפי"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter chips */}
      <div className={styles.filters}>
        <FilterChips
          options={categories}
          active={activeFilter}
          onSelect={setActiveFilter}
          labels={CATEGORY_LABELS}
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`skeleton ${styles.skeletonCard}`} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIconWrap}>
            <Shirt size={40} strokeWidth={1} className={styles.emptyIcon} />
          </div>
          <p className={styles.emptyTitle}>אין פריטים</p>
          <p className={styles.emptyDesc}>
            {search
              ? `לא נמצאו תוצאות עבור "${search}"`
              : 'הוסף פריטים לארון כדי להתחיל'}
          </p>
          {!search && (
            <button className={styles.emptyBtn} onClick={() => navigate('/closet/add')}>
              <Plus size={14} strokeWidth={2.5} />
              הוסף פריט ראשון
            </button>
          )}
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className={styles.cardWrap}
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <ClothingItemCard
                item={item}
                onClick={setSelectedItem}
                onEdit={(it) => console.log('edit', it.id)}
                onDelete={(it) => console.log('delete', it.id)}
              />
            </div>
          ))}

          {/* Add card */}
          <button className={styles.addCard} onClick={() => navigate('/closet/add')}>
            <Plus size={22} strokeWidth={1.5} className={styles.addCardIcon} />
            <span className={styles.addCardLabel}>הוסף פריט</span>
          </button>
        </div>
      )}

      {/* Item detail modal */}
      {selectedItem && (
        <div className={styles.overlay} onClick={() => setSelectedItem(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setSelectedItem(null)}
              aria-label="סגור"
            >
              <X size={14} strokeWidth={2.5} />
            </button>

            {(() => {
              const Icon = CATEGORY_ICON[selectedItem.category] ?? Shirt
              return (
                <div className={styles.modalIconWrap}>
                  <Icon size={40} strokeWidth={1.25} className={styles.modalIcon} />
                </div>
              )
            })()}

            <h2 className={styles.modalName}>{selectedItem.name}</h2>

            <div className={styles.modalMeta}>
              <div className={styles.metaBox}>
                <span className={styles.metaLabel}>קטגוריה</span>
                <span className={styles.metaValue}>{CATEGORY_LABELS[selectedItem.category] ?? selectedItem.category}</span>
              </div>
              <div className={styles.metaBox}>
                <span className={styles.metaLabel}>צבע</span>
                <span className={styles.metaValue}>{selectedItem.color}</span>
              </div>
            </div>

            <div className={styles.modalSeasons}>
              <span className={styles.metaLabel}>עונות</span>
              <div className={styles.seasonRow}>
                {selectedItem.seasons.map((s) => (
                  <span key={s} className={styles.seasonChip}>{SEASON_LABELS[s] ?? s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
