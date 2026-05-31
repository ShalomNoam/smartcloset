import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Plus, Shirt, Footprints, Layers, Gem, SlidersHorizontal, RotateCcw } from 'lucide-react'
import ClothingItemCard from '../components/ClothingItemCard'
import FilterChips      from '../components/FilterChips'
import { useWardrobe }  from '../context/WardrobeContext'
import { categories, CATEGORY_LABELS, SEASON_LABELS, seasons } from '../data/mockData'
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

const CATEGORIES_EN = ['Tops', 'Bottoms', 'Shoes', 'Outer', 'Accessories']

function sortItems(items, sortBy) {
  const sorted = [...items]
  if (sortBy === 'name-asc')  return sorted.sort((a, b) => a.name.localeCompare(b.name, 'he'))
  if (sortBy === 'name-desc') return sorted.sort((a, b) => b.name.localeCompare(a.name, 'he'))
  if (sortBy === 'category')  return sorted.sort((a, b) => a.category.localeCompare(b.category))
  return sorted
}

export default function ClosetPage() {
  const navigate = useNavigate()
  const { items, loading, error, editItem, deleteItem, resetToDefault } = useWardrobe()
  const [resetConfirm, setResetConfirm] = useState(false)

  const [activeFilter, setActiveFilter] = useState('All')
  const [search,       setSearch]       = useState('')
  const [sortBy,       setSortBy]       = useState('default')
  const [selectedItem, setSelectedItem] = useState(null)

  // Edit modal state
  const [editingItem,   setEditingItem]   = useState(null)
  const [editName,      setEditName]      = useState('')
  const [editCategory,  setEditCategory]  = useState('')
  const [editSeasons,   setEditSeasons]   = useState([])
  const [editColor,     setEditColor]     = useState('')

  // Delete confirm state
  const [deletingItem, setDeletingItem] = useState(null)

  // Close edit modal on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setEditingItem(null)
        setDeletingItem(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function openEdit(item) {
    setEditingItem(item)
    setEditName(item.name)
    setEditCategory(item.category)
    setEditSeasons([...item.seasons])
    setEditColor(item.color)
  }

  function toggleEditSeason(s) {
    setEditSeasons(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  function handleSaveEdit() {
    if (!editName.trim() || !editCategory || !editColor.trim() || !editSeasons.length) return
    editItem(editingItem.id, {
      name: editName.trim(),
      category: editCategory,
      seasons: editSeasons,
      color: editColor.trim(),
    })
    setEditingItem(null)
  }

  function handleConfirmDelete() {
    deleteItem(deletingItem.id)
    setDeletingItem(null)
    if (selectedItem?.id === deletingItem.id) setSelectedItem(null)
  }

  const filtered = sortItems(
    items.filter((item) => {
      const matchCat    = activeFilter === 'All' || item.category === activeFilter
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    }),
    sortBy
  )

  // Full-screen empty state when wardrobe is completely empty
  if (!loading && !error && items.length === 0) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>הארון שלי</h1>
            <p className={styles.countBadge}>0 פריטים</p>
          </div>
        </header>
        <div className={styles.emptyFull}>
          <div className={styles.emptyIconWrap}>
            <Shirt size={56} strokeWidth={1} className={styles.emptyIcon} />
          </div>
          <h2 className={styles.emptyTitle}>הארון שלך ריק</h2>
          <p className={styles.emptyDesc}>
            הוסף את הבגדים שלך כדי שה-AI יוכל לבנות לוקים מותאמים אישית עבורך
          </p>
          <button className={styles.emptyBtnLarge} onClick={() => navigate('/closet/add')}>
            <Plus size={18} strokeWidth={2.5} />
            ✦ הוסף את הבגד הראשון שלך
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>הארון שלי</h1>
          <p className={styles.countBadge}>{items.length} פריטים</p>
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

      {/* Fetch error */}
      {error && (
        <div className={styles.errorState}>
          <p className={styles.errorTitle}>שגיאה בטעינת הארון</p>
          <p className={styles.errorDesc}>{error}</p>
        </div>
      )}

      {/* Grid */}
      {!error && (loading ? (
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
                onEdit={(it) => openEdit(it)}
                onDelete={(it) => setDeletingItem(it)}
              />
            </div>
          ))}

          {/* Add card */}
          <button className={styles.addCard} onClick={() => navigate('/closet/add')}>
            <Plus size={22} strokeWidth={1.5} className={styles.addCardIcon} />
            <span className={styles.addCardLabel}>הוסף פריט</span>
          </button>
        </div>
      ))}

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

      {/* Edit modal */}
      {editingItem && (
        <div className={styles.editOverlay} onClick={() => setEditingItem(null)}>
          <div className={styles.editModal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setEditingItem(null)}
              aria-label="סגור"
            >
              <X size={14} strokeWidth={2.5} />
            </button>

            <h2 className={styles.editTitle}>ערוך פריט</h2>

            <div className={styles.editForm}>
              {/* Name */}
              <div className={styles.editField}>
                <label className={styles.editLabel}>שם הפריט</label>
                <input
                  type="text"
                  className={styles.editInput}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              {/* Category */}
              <div className={styles.editField}>
                <label className={styles.editLabel}>קטגוריה</label>
                <select
                  className={styles.editSelect}
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  {CATEGORIES_EN.map((c) => (
                    <option key={c} value={c}>{CATEGORY_LABELS[c] ?? c}</option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div className={styles.editField}>
                <label className={styles.editLabel}>צבע</label>
                <input
                  type="text"
                  className={styles.editInput}
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                />
              </div>

              {/* Seasons */}
              <div className={styles.editField}>
                <label className={styles.editLabel}>עונות</label>
                <div className={styles.editSeasonRow}>
                  {seasons.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`${styles.editSeasonChip} ${editSeasons.includes(s) ? styles.editSeasonActive : ''}`}
                      onClick={() => toggleEditSeason(s)}
                    >
                      {SEASON_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.editActions}>
              <button className={styles.editCancelBtn} onClick={() => setEditingItem(null)}>
                ביטול
              </button>
              <button className={styles.editSaveBtn} onClick={handleSaveEdit}>
                שמור שינויים ✦
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset to default */}
      <div className={styles.resetZone}>
        {resetConfirm ? (
          <div className={styles.resetConfirmRow}>
            <span className={styles.resetConfirmText}>זה ימחק את כל הבגדים שהוספת. בטוח?</span>
            <button
              className={styles.resetConfirmYes}
              onClick={() => { resetToDefault(); setResetConfirm(false) }}
            >
              כן, אפס
            </button>
            <button className={styles.resetConfirmNo} onClick={() => setResetConfirm(false)}>
              ביטול
            </button>
          </div>
        ) : (
          <button className={styles.resetBtn} onClick={() => setResetConfirm(true)}>
            <RotateCcw size={12} strokeWidth={2} />
            איפוס לברירת מחדל
          </button>
        )}
      </div>

      {/* Delete confirm dialog */}
      {deletingItem && (
        <div className={styles.editOverlay} onClick={() => setDeletingItem(null)}>
          <div className={styles.deleteDialog} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.deleteTitle}>הסר פריט</h2>
            <p className={styles.deleteDesc}>
              האם אתה בטוח שברצונך להסיר את <strong>{deletingItem.name}</strong> מהארון שלך?
            </p>
            <div className={styles.deleteActions}>
              <button className={styles.deleteCancelBtn} onClick={() => setDeletingItem(null)}>
                ביטול
              </button>
              <button className={styles.deleteConfirmBtn} onClick={handleConfirmDelete}>
                כן, הסר
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
