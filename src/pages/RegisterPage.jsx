import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shirt, Eye, EyeOff } from 'lucide-react'
import styles from './RegisterPage.module.css'

function getStrength(pwd) {
  if (!pwd) return { level: 0, label: '', color: '' }
  const hasLen     = pwd.length >= 8
  const hasNumber  = /\d/.test(pwd)
  const hasSpecial = /[^A-Za-z0-9]/.test(pwd)
  const hasUpper   = /[A-Z]/.test(pwd)
  const score = [hasLen, hasNumber, hasSpecial, hasUpper].filter(Boolean).length
  if (score <= 1) return { level: 1, label: 'Weak',   color: '#FF4444' }
  if (score === 2) return { level: 2, label: 'Fair',   color: '#FF8C42' }
  if (score === 3) return { level: 3, label: 'Good',   color: '#FFC107' }
  return             { level: 4, label: 'Strong', color: '#4CAF50' }
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [fullName,   setFullName]   = useState('')
  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [showPwd,    setShowPwd]    = useState(false)
  const [showConf,   setShowConf]   = useState(false)
  const [errors,     setErrors]     = useState({})

  const strength = getStrength(password)

  function clearError(field) {
    setErrors((p) => ({ ...p, [field]: '' }))
  }

  function validate() {
    const e = {}
    if (!fullName.trim())                   e.fullName   = 'Full name is required'
    if (!email.trim())                      e.email      = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email))  e.email      = 'Enter a valid email address'
    if (!password)                          e.password   = 'Password is required'
    else if (password.length < 6)           e.password   = 'Minimum 6 characters'
    if (confirmPwd !== password)            e.confirmPwd = 'Passwords do not match'
    return e
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    navigate('/dashboard')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Shirt size={18} strokeWidth={1.75} />
          </div>
          <span className={styles.logoText}>SmartCloset</span>
        </Link>

        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>Start building your smart wardrobe</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* Full Name */}
          <div className={styles.field}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); clearError('fullName') }}
            />
            {errors.fullName && <p className={styles.errorMsg}>{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError('email') }}
            />
            {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.pwdWrap}>
              <input
                type={showPwd ? 'text' : 'password'}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError('password') }}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
              </button>
            </div>
            {password && (
              <div className={styles.strengthWrap}>
                <div className={styles.strengthBars}>
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className={styles.strengthBar}
                      style={{ background: n <= strength.level ? strength.color : 'var(--color-border)' }}
                    />
                  ))}
                </div>
                <span className={styles.strengthLabel} style={{ color: strength.color }}>
                  {strength.label}
                </span>
              </div>
            )}
            {errors.password && <p className={styles.errorMsg}>{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className={styles.field}>
            <label className={styles.label}>Confirm Password</label>
            <div className={styles.pwdWrap}>
              <input
                type={showConf ? 'text' : 'password'}
                className={`${styles.input} ${errors.confirmPwd ? styles.inputError : ''}`}
                placeholder="Repeat your password"
                value={confirmPwd}
                onChange={(e) => { setConfirmPwd(e.target.value); clearError('confirmPwd') }}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConf((v) => !v)}
                aria-label={showConf ? 'Hide password' : 'Show password'}
              >
                {showConf ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
              </button>
            </div>
            {errors.confirmPwd && <p className={styles.errorMsg}>{errors.confirmPwd}</p>}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Create Account ✦
          </button>

        </form>

        <p className={styles.signInRow}>
          Already have an account?{' '}
          <Link to="/login" className={styles.signInLink}>Sign in</Link>
        </p>

        <p className={styles.backLink}>
          <Link to="/" className={styles.backAnchor}>← Back to home</Link>
        </p>

      </div>
    </div>
  )
}
