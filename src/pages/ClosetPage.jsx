import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Plus, Shirt, Footprints, Layers, Gem } from 'lucide-react'
import ClothingItemCard from '../components/ClothingItemCard'
import FilterChips      from '../components/FilterChips'
import { clothingItems, categories } from '../data/mockData'
import styles from './ClosetPage.module.css'

const CATEGORY_ICON = {
  Tops: Shirt, Bottoms: Shirt, Shoes: Footprints, Outer: Layers, Accessories: Gem,
}

export default function ClosetPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch]             = useState('')
  const [loading, setLoading]           = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  const filtered = clothingItems.filter((item) => {
    const matchCat    = activeFilter === 'All' || item.category === activeFilter
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Closet</h1>
        <span className={styles.countBadge}>{clothingItems.length} items</span>
      </header>

      {/* Search */}
      <div className={styles.searchWrap}>
        <Search size={16} strokeWidth={2} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.search}
          placeholder="Search your wardrobe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className={styles.clearBtn} onClick={() => setSearch('')} aria-label="Clear search">
            <X size={13} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className={styles.filters}>
        <FilterChips options={categories} active={activeFilter} onSelect={setActiveFilter} />
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
          <p className={styles.emptyTitle}>Nothing here yet</p>
          <p className={styles.emptyDesc}>
            {search
              ? `No results for "${search}"`
              : 'Add items to your closet to get started'}
          </p>
          {!search && (
            <button className={styles.emptyBtn} onClick={() => navigate('/closet/add')}>
              <Plus size={14} strokeWidth={2.5} />
              Add your first item
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
              <ClothingItemCard item={item} onClick={setSelectedItem} />
            </div>
          ))}

          {/* Add card */}
          <button className={styles.addCard} onClick={() => navigate('/closet/add')}>
            <Plus size={24} strokeWidth={1.5} className={styles.addIcon} />
            <span className={styles.addLabel}>Add Item</span>
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
              aria-label="Close"
            >
              <X size={14} strokeWidth={2.5} className={styles.closeIcon} />
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
                <span className={styles.metaLabel}>Category</span>
                <span className={styles.metaValue}>{selectedItem.category}</span>
              </div>
              <div className={styles.metaBox}>
                <span className={styles.metaLabel}>Color</span>
                <span className={styles.metaValue}>{selectedItem.color}</span>
              </div>
            </div>

            <div className={styles.modalSeasons}>
              <span className={styles.metaLabel}>Seasons</span>
              <div className={styles.seasonRow}>
                {selectedItem.season.map((s) => (
                  <span key={s} className={styles.seasonChip}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
