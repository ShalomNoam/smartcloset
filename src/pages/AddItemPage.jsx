import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Camera, Palette, Flower2, Sun, Leaf, Snowflake, Sparkles, Check } from 'lucide-react'
import { seasons, CATEGORY_LABELS, SEASON_LABELS } from '../data/mockData'
import { useWardrobe } from '../context/WardrobeContext'
import styles from './AddItemPage.module.css'

const CATEGORIES_EN = ['Tops', 'Bottoms', 'Shoes', 'Outer', 'Accessories']

const SEASON_ICONS = {
  Spring: Flower2,
  Summer: Sun,
  Fall:   Leaf,
  Winter: Snowflake,
}

const AI_DETECTIONS = [
  'חולצה לבנה · קיץ · Casual',
  "ג'ינס כחול · כל עונה · יומיומי",
  'בלייזר שחור · חורף · אלגנטי',
  'נעלי ספורט · קיץ · ספורטיבי',
]

export default function AddItemPage() {
  const navigate = useNavigate()
  const fileRef  = useRef(null)
  const { items, addItem } = useWardrobe()

  const [photo,        setPhoto]        = useState(null)
  const [dragging,     setDragging]     = useState(false)
  const [aiDetecting,  setAiDetecting]  = useState(false)
  const [aiResult,     setAiResult]     = useState(null)
  const [name,         setName]         = useState('')
  const [category,     setCategory]     = useState('')
  const [selSeasons,   setSelSeasons]   = useState([])
  const [color,        setColor]        = useState('')
  const [errors,       setErrors]       = useState({})
  const [savedState,   setSavedState]   = useState(false)

  function triggerAiDetect() {
    setAiDetecting(true)
    setAiResult(null)
    setTimeout(() => {
      const result = AI_DETECTIONS[Math.floor(Math.random() * AI_DETECTIONS.length)]
      setAiResult(result)
      setAiDetecting(false)
    }, 1500)
  }

  function handlePhoto(e) {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(URL.createObjectURL(file))
      triggerAiDetect()
    }
  }

  function handleDragOver(e) { e.preventDefault(); setDragging(true) }
  function handleDragLeave(e) { e.preventDefault(); setDragging(false) }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setPhoto(URL.createObjectURL(file))
      triggerAiDetect()
    }
  }

  function toggleSeason(s) {
    setSelSeasons((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }

  function clearError(field) {
    setErrors((p) => ({ ...p, [field]: '' }))
  }

  function validate() {
    const e = {}
    if (!name.trim())       e.name     = 'שם הפריט נדרש'
    if (!category)          e.category = 'בחר קטגוריה'
    if (!color.trim())      e.color    = 'הכנס צבע'
    if (!selSeasons.length) e.seasons  = 'בחר לפחות עונה אחת'
    return e
  }

  function handleSave() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    addItem({ name: name.trim(), category, seasons: selSeasons, color: color.trim() })
    setSavedState(true)
  }

  function handleAddAnother() {
    setPhoto(null)
    setAiResult(null)
    setAiDetecting(false)
    setName('')
    setCategory('')
    setSelSeasons([])
    setColor('')
    setErrors({})
    setSavedState(false)
  }

  // Success screen
  if (savedState) {
    return (
      <div className={styles.page}>
        <div className={styles.successScreen}>
          <div className={styles.checkCircle}>
            <Check size={40} strokeWidth={3} className={styles.checkIcon} />
          </div>
          <h2 className={styles.successTitle}>הבגד נוסף לארון שלך! ✓</h2>
          <p className={styles.successSub}>
            ה-AI יוכל כעת לשלב אותו בלוקים שלך
          </p>
          <div className={styles.successBtns}>
            <button className={styles.addAnotherBtn} onClick={handleAddAnother}>
              הוסף עוד בגד
            </button>
            <button className={styles.goToClosetBtn} onClick={() => navigate('/closet')}>
              חזור לארון
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/closet')}>
          <ChevronLeft size={18} strokeWidth={2.5} className={styles.backIcon} />
          חזרה
        </button>
        <h1 className={styles.title}>הוסף לארון</h1>
        <div style={{ width: 60 }} />
      </header>

      {/* Live count badge */}
      <div className={styles.liveCount}>
        יש לך כרגע <strong>{items.length}</strong> בגדים בארון
      </div>

      {/* Desktop: 2-col layout */}
      <div className={styles.desktopLayout}>

        {/* Photo upload */}
        <div
          className={`${styles.photoArea} ${photo ? styles.hasPhoto : ''} ${dragging ? styles.dragOver : ''}`}
          onClick={() => fileRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
        >
          {photo ? (
            <>
              <img src={photo} alt="תצוגה מקדימה" className={styles.photoPreview} />
              {/* AI detection overlay */}
              {(aiDetecting || aiResult) && (
                <div className={`${styles.aiDetectBadge} ${aiDetecting ? styles.aiDetecting : styles.aiDone}`}>
                  <Sparkles size={12} strokeWidth={2} />
                  {aiDetecting
                    ? 'ה-AI מזהה...'
                    : `✦ ה-AI זיהה: ${aiResult}`}
                </div>
              )}
            </>
          ) : (
            <div className={styles.photoPlaceholder}>
              <Camera size={36} strokeWidth={1.25} className={styles.cameraIcon} />
              <p className={styles.photoTitle}>{dragging ? 'שחרר כאן!' : 'העלה תמונה'}</p>
              <p className={styles.photoSub}>
                {dragging ? 'שחרר להוספה' : 'גרור & שחרר או לחץ לבחירה'}
              </p>
              <p className={styles.aiHint}>
                <Sparkles size={11} strokeWidth={2} />
                ה-AI יזהה אוטומטית
              </p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handlePhoto}
          />
        </div>

        {/* Form + Actions */}
        <div className={styles.formSide}>
          <div className={styles.form}>

            {/* Name */}
            <div className={styles.field}>
              <label className={styles.label}>שם הפריט</label>
              <input
                type="text"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                placeholder="לדוג׳ חולצה לבנה"
                value={name}
                onChange={(e) => { setName(e.target.value); clearError('name') }}
              />
              {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
            </div>

            {/* Category */}
            <div className={styles.field}>
              <label className={styles.label}>קטגוריה</label>
              <div className={styles.selectWrap}>
                <select
                  className={`${styles.select} ${errors.category ? styles.inputError : ''}`}
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); clearError('category') }}
                >
                  <option value="">בחר קטגוריה...</option>
                  {CATEGORIES_EN.map((c) => (
                    <option key={c} value={c}>{CATEGORY_LABELS[c] ?? c}</option>
                  ))}
                </select>
              </div>
              {errors.category && <p className={styles.errorMsg}>{errors.category}</p>}
            </div>

            {/* Season */}
            <div className={styles.field}>
              <label className={styles.label}>עונות</label>
              <div className={styles.seasonRow}>
                {seasons.map((s) => {
                  const Icon     = SEASON_ICONS[s]
                  const isActive = selSeasons.includes(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { toggleSeason(s); clearError('seasons') }}
                      className={`${styles.seasonChip} ${isActive ? styles.seasonActive : ''}`}
                    >
                      {Icon && <Icon size={13} strokeWidth={1.75} />}
                      {SEASON_LABELS[s] ?? s}
                    </button>
                  )
                })}
              </div>
              {errors.seasons && <p className={styles.errorMsg}>{errors.seasons}</p>}
            </div>

            {/* Color */}
            <div className={styles.field}>
              <label className={styles.label}>צבע</label>
              <div className={styles.colorWrap}>
                <Palette size={15} strokeWidth={1.75} className={styles.paletteIcon} />
                <input
                  type="text"
                  className={`${styles.input} ${styles.colorInput} ${errors.color ? styles.inputError : ''}`}
                  placeholder="לדוג׳ כחול נייבי"
                  value={color}
                  onChange={(e) => { setColor(e.target.value); clearError('color') }}
                />
              </div>
              {errors.color && <p className={styles.errorMsg}>{errors.color}</p>}
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.cancelBtn} onClick={() => navigate('/closet')}>
              ביטול
            </button>
            <button
              className={styles.saveBtn}
              onClick={handleSave}
            >
              ✦ שמור פריט
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
