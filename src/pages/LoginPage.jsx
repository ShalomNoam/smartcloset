import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shirt, Eye, EyeOff, Sparkles } from 'lucide-react'
import { supabase } from '../lib/supabase'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [showPwd,     setShowPwd]     = useState(false)
  const [errors,      setErrors]      = useState({})
  const [submitting,  setSubmitting]  = useState(false)

  function validate() {
    const e = {}
    if (!email.trim())                     e.email    = 'כתובת אימייל נדרשת'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = 'אימייל לא תקין'
    if (!password)                         e.password = 'סיסמה נדרשת'
    return e
  }

  async function handleSignIn(ev) {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setSubmitting(false)

    if (error) {
      setErrors({ form: 'אימייל או סיסמה שגויים' })
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className={styles.page}>

      {/* Branding Panel */}
      <div className={styles.brandPanel}>
        <div className={styles.brandInner}>
          <Link to="/" className={styles.brandLogo}>
            <div className={styles.brandLogoIcon}><Shirt size={22} strokeWidth={1.75} /></div>
            <span className={styles.brandLogoText}>SmartCloset</span>
          </Link>
          <div className={styles.brandBody}>
            <div className={styles.brandBadge}>
              <Sparkles size={12} strokeWidth={2} />
              מבוסס בינה מלאכותית
            </div>
            <h2 className={styles.brandHeadline}>הסגנון שלך,<br />מחושב לשלמות</h2>
            <p className={styles.brandSub}>ה-AI הופך את הארון שלך ללא מוגבל.</p>
          </div>
          <div className={styles.brandParticles} aria-hidden="true">
            <div className={styles.bp1}/><div className={styles.bp2}/>
            <div className={styles.bp3}/><div className={styles.bp4}/>
            <div className={styles.bp5}/><div className={styles.bp6}/>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className={styles.formPanel}>
        <div className={styles.formCard}>

          <Link to="/" className={styles.mobileLogo}>
            <div className={styles.mobileLogoIcon}><Shirt size={16} strokeWidth={1.75} /></div>
            <span className={styles.mobileLogoText}>SmartCloset</span>
          </Link>

          <h1 className={styles.title}>ברוך השב 👋</h1>
          <p className={styles.subtitle}>התחבר לארון החכם שלך</p>

          <form className={styles.form} onSubmit={handleSignIn} noValidate>

            {/* Email */}
            <div className={styles.field}>
              <label className={styles.label}>כתובת אימייל</label>
              <input
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
                dir="ltr"
              />
              {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div className={styles.field}>
              <div className={styles.labelRow}>
                <label className={styles.label}>סיסמה</label>
                <Link to="#" className={styles.forgotLink}>שכחת סיסמה?</Link>
              </div>
              <div className={styles.pwdWrap}>
                <input
                  type={showPwd ? 'text' : 'password'}
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  placeholder="הסיסמה שלך"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })) }}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPwd((v) => !v)}
                  aria-label={showPwd ? 'הסתר סיסמה' : 'הצג סיסמה'}
                >
                  {showPwd
                    ? <EyeOff size={16} strokeWidth={1.75} />
                    : <Eye    size={16} strokeWidth={1.75} />}
                </button>
              </div>
              {errors.password && <p className={styles.errorMsg}>{errors.password}</p>}
            </div>

            {errors.form && (
              <div className={styles.formError}>{errors.form}</div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? 'מתחבר...' : 'התחבר ✦'}
            </button>
          </form>

          <div className={styles.dividerRow}>
            <div className={styles.divider} />
            <span className={styles.dividerText}>או</span>
            <div className={styles.divider} />
          </div>

          <button className={styles.ghostBtn} onClick={() => navigate('/register')}>
            צור חשבון חדש
          </button>

          <p className={styles.backLink}>
            <Link to="/" className={styles.backAnchor}>חזרה לדף הבית</Link>
          </p>

        </div>
      </div>

    </div>
  )
}
