import { Sun, Cloud } from 'lucide-react'
import styles from './WeatherWidget.module.css'

const FORECAST = [
  { day: 'היום',      Icon: Sun,   temp: '22°', cond: 'בהיר',  look: "קז'ואל", today: true  },
  { day: 'מחר',       Icon: Cloud, temp: '19°', cond: 'מעונן', look: 'שכבות',  today: false },
  { day: 'מחרתיים',   Icon: Sun,   temp: '25°', cond: 'שמשי',  look: 'קיץ',    today: false },
]

export default function WeatherWidget() {
  return (
    <div className={styles.widget}>
      <p className={styles.widgetTitle}>מזג האוויר</p>
      <div className={styles.days}>
        {FORECAST.map(({ day, Icon, temp, cond, look, today }) => (
          <div key={day} className={`${styles.day} ${today ? styles.dayToday : ''}`}>
            <span className={styles.dayLabel}>{day}</span>
            <Icon
              size={today ? 28 : 22}
              strokeWidth={1.5}
              className={today ? styles.sunIcon : styles.cloudIcon}
            />
            <span className={styles.dayTemp}>{temp}</span>
            <span className={styles.dayCond}>{cond}</span>
            <span className={styles.dayLook}>לוק: {look}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
