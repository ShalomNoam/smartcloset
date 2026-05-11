import styles from './FilterChips.module.css'

export default function FilterChips({ options, active, onSelect, labels = {} }) {
  return (
    <div className={styles.row}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`${styles.chip} ${active === option ? styles.active : ''}`}
        >
          {labels[option] ?? option}
        </button>
      ))}
    </div>
  )
}
