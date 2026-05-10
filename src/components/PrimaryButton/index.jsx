import styles from './PrimaryButton.module.css'

export default function PrimaryButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  fullWidth = true,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        styles.btn,
        styles[variant],
        fullWidth ? styles.fullWidth : '',
        disabled ? styles.disabled : '',
      ].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  )
}
