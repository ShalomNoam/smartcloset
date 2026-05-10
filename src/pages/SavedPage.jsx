import { Heart } from 'lucide-react'
import styles from './SavedPage.module.css'

export default function SavedPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Saved Looks</h1>
      </header>

      <div className={styles.empty}>
        <div className={styles.iconWrap}>
          <Heart size={40} strokeWidth={1.25} className={styles.icon} />
        </div>
        <p className={styles.heading}>Your saved looks</p>
        <p className={styles.desc}>
          Heart any outfit you love on the outfits page and it will appear here.
        </p>
        <div className={styles.hint}>
          <Heart size={12} strokeWidth={2} className={styles.hintIcon} />
          <span>Tap the heart icon on any outfit card</span>
        </div>
      </div>
    </div>
  )
}
