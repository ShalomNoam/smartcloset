import { useWardrobe } from '../../context/WardrobeContext'
import styles from './Toast.module.css'

export default function Toast() {
  const { toast } = useWardrobe()

  if (!toast) return null

  return (
    <div className={`${styles.toast} ${toast.type === 'error' ? styles.toastError : styles.toastSuccess}`}>
      {toast.message}
    </div>
  )
}
