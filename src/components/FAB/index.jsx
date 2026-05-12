import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import styles from './FAB.module.css'

export default function FAB() {
  const navigate = useNavigate()

  return (
    <button
      className={styles.fab}
      onClick={() => navigate('/closet/add')}
      aria-label="הוסף בגד לארון"
    >
      <Plus size={24} strokeWidth={2.5} className={styles.icon} />
      <span className={styles.tooltip}>הוסף בגד לארון</span>
    </button>
  )
}
