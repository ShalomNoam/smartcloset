import { Sun } from 'lucide-react'
import styles from './WeatherWidget.module.css'

export default function WeatherWidget() {
  return (
    <div className={styles.widget}>
      <div className={styles.left}>
        <div className={styles.sunWrap}>
          <Sun size={36} strokeWidth={1.5} className={styles.sun} />
        </div>
        <div>
          <p className={styles.temp}>22°C</p>
          <p className={styles.desc}>Sunny · Tel Aviv</p>
        </div>
      </div>
      <div className={styles.right}>
        <p className={styles.badge}>Today</p>
        <p className={styles.suggestion}>Light layers</p>
      </div>
    </div>
  )
}
