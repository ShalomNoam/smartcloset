import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Camera, Palette } from 'lucide-react'
import PrimaryButton from '../components/PrimaryButton'
import { seasons } from '../data/mockData'
import styles from './AddItemPage.module.css'

const CATEGORIES = ['Tops', 'Bottoms', 'Shoes', 'Outer', 'Accessories']

export default function AddItemPage() {
  const navigate = useNavigate()
  const fileRef  = useRef(null)

  const [photo,    setPhoto]    = useState(null)
  const [name,     setName]     = useState('')
  const [category, setCategory] = useState('')
  const [selSeasons, setSelSeasons] = useState([])
  const [color,    setColor]    = useState('')
  const [errors,   setErrors]   = useState({})
  const [saved,    setSaved]    = useState(false)

  function handlePhoto(e) {
    const file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
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
    if (!name.trim())          e.name     = 'Item name is required'
    if (!category)             e.category = 'Please select a category'
    if (!color.trim())         e.color    = 'Please enter a color'
    if (!selSeasons.length)    e.seasons  = 'Select at least one season'
    return e
  }

  function handleSave() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSaved(true)
    setTimeout(() => navigate('/closet'), 900)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/closet')}>
          <ChevronLeft size={18} strokeWidth={2.5} className={styles.backIcon} />
          Back
        </button>
        <h1 className={styles.title}>Add New Item</h1>
        <div style={{ width: 60 }} />
      </header>

      {/* Photo upload */}
      <div
        className={`${styles.photoArea} ${photo ? styles.hasPhoto : ''}`}
        onClick={() => fileRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
      >
        {photo ? (
          <img src={photo} alt="Preview" className={styles.photoPreview} />
        ) : (
          <div className={styles.photoPlaceholder}>
            <Camera size={36} strokeWidth={1.25} className={styles.cameraIcon} />
            <p className={styles.photoTitle}>Upload Photo</p>
            <p className={styles.photoSub}>Camera or Gallery</p>
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

      {/* Form */}
      <div className={styles.form}>
        {/* Name */}
        <div className={styles.field}>
          <label className={styles.label}>Item Name</label>
          <input
            type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="e.g. White Linen Shirt"
            value={name}
            onChange={(e) => { setName(e.target.value); clearError('name') }}
          />
          {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
        </div>

        {/* Category */}
        <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <div className={styles.selectWrap}>
            <select
              className={`${styles.select} ${errors.category ? styles.inputError : ''}`}
              value={category}
              onChange={(e) => { setCategory(e.target.value); clearError('category') }}
            >
              <option value="">Select a category...</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {errors.category && <p className={styles.errorMsg}>{errors.category}</p>}
        </div>

        {/* Season */}
        <div className={styles.field}>
          <label className={styles.label}>Season</label>
          <div className={styles.seasonRow}>
            {seasons.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { toggleSeason(s); clearError('seasons') }}
                className={`${styles.seasonChip} ${selSeasons.includes(s) ? styles.seasonActive : ''}`}
              >
                {s}
              </button>
            ))}
          </div>
          {errors.seasons && <p className={styles.errorMsg}>{errors.seasons}</p>}
        </div>

        {/* Color */}
        <div className={styles.field}>
          <label className={styles.label}>Color</label>
          <div className={styles.colorWrap}>
            <Palette size={16} strokeWidth={1.75} className={styles.paletteIcon} />
            <input
              type="text"
              className={`${styles.input} ${styles.colorInput} ${errors.color ? styles.inputError : ''}`}
              placeholder="e.g. Navy Blue"
              value={color}
              onChange={(e) => { setColor(e.target.value); clearError('color') }}
            />
          </div>
          {errors.color && <p className={styles.errorMsg}>{errors.color}</p>}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <PrimaryButton variant="ghost" onClick={() => navigate('/closet')}>
          Cancel
        </PrimaryButton>
        <PrimaryButton onClick={handleSave} disabled={saved}>
          {saved ? '✓ Saved!' : '✦ Save Item'}
        </PrimaryButton>
      </div>
    </div>
  )
}
