import { useState } from 'react'
import { Heart } from 'lucide-react'
import styles from './HeartButton.module.css'

export default function HeartButton({ initialSaved = false, onToggle }) {
  const [saved, setSaved] = useState(initialSaved)

  function handleClick(e) {
    e.stopPropagation()
    const next = !saved
    setSaved(next)
    onToggle?.(next)
  }

  return (
    <button
      onClick={handleClick}
      className={`${styles.btn} ${saved ? styles.saved : ''}`}
      aria-label={saved ? 'הסר מהשמורים' : 'שמור לוק'}
    >
      <Heart size={18} strokeWidth={2} className={styles.heart} />
    </button>
  )
}
