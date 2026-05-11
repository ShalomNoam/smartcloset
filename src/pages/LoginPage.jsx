import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shirt, Eye, EyeOff } from 'lucide-react'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [errors,   setErrors]   = useState({})

  function validate() {
    const e = {}
    if (!email.trim())                      e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email))  e.email    = 'Enter a valid email address'
    if (!password)                          e.password = 'Password is required'
    return e
  }

  function handleSignIn(ev) {
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

        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your wardrobe</p>

        <form className={styles.form} onSubmit={handleSignIn} noValidate>

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
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
                placeholder="Your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })) }}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd
                  ? <EyeOff size={16} strokeWidth={1.75} />
                  : <Eye    size={16} strokeWidth={1.75} />}
              </button>
            </div>
            {errors.password && <p className={styles.errorMsg}>{errors.password}</p>}
          </div>

          <Link to="#" className={styles.forgotLink}>Forgot password?</Link>

          <button type="submit" className={styles.submitBtn}>Sign In</button>
        </form>

        <div className={styles.dividerRow}>
          <div className={styles.divider} />
          <span className={styles.dividerText}>or</span>
          <div className={styles.divider} />
        </div>

        <button className={styles.ghostBtn} onClick={() => navigate('/register')}>
          Create an account
        </button>

        <p className={styles.backLink}>
          <Link to="/" className={styles.backAnchor}>← Back to home</Link>
        </p>

      </div>
    </div>
  )
}
