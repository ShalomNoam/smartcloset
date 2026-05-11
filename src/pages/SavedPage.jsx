import { Heart, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import styles from './SavedPage.module.css'

export default function SavedPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <h1 className={styles.title}>לוקים שמורים</h1>
        <p className={styles.subtitle}>הלוקים שאהבת, במקום אחד</p>
      </header>

      <div className={styles.empty}>
        <div className={styles.iconWrap}>
          <Heart size={40} strokeWidth={1.25} className={styles.icon} />
        </div>
        <p className={styles.heading}>עדיין אין לוקים שמורים</p>
        <p className={styles.desc}>
          לחץ על לב בכל לוק שתאהב ותמצא אותו כאן בכל רגע.
        </p>
        <div className={styles.hint}>
          <Heart size={12} strokeWidth={2} className={styles.hintIcon} />
          <span>לחץ על הלב בכרטיס הלוק</span>
        </div>
        <button className={styles.ctaBtn} onClick={() => navigate('/outfits')}>
          <Sparkles size={14} strokeWidth={1.75} />
          גלה לוקים
        </button>
      </div>

    </div>
  )
}
