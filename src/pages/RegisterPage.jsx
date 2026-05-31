import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shirt, Eye, EyeOff, Sparkles } from 'lucide-react'
import { supabase } from '../lib/supabase'
import styles from './RegisterPage.module.css'

function getStrength(pwd) {
  if (!pwd) return { level: 0, label: '', color: '' }
  const hasLen     = pwd.length >= 8
  const hasNumber  = /\d/.test(pwd)
  const hasSpecial = /[^A-Za-z0-9]/.test(pwd)
  const hasUpper   = /[A-Z]/.test(pwd)
  const score = [hasLen, hasNumber, hasSpecial, hasUpper].filter(Boolean).length
  if (score <= 1) return { level: 1, label: 'חלשה',  color: '#FF4444' }
  if (score === 2) return { level: 2, label: 'בינונית', color: '#FF8C42' }
  if (score === 3) return { level: 3, label: 'טובה',   color: '#FFC107' }
  return             { level: 4, label: 'חזקה',   color: '#4CAF50' }
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
  const [submitting, setSubmitting] = useState(false)

  const strength = getStrength(password)

  function clearError(field) {
    setErrors((p) => ({ ...p, [field]: '' }))
  }

  function validate() {
    const e = {}
    if (!fullName.trim())                   e.fullName   = 'שם מלא נדרש'
    if (!email.trim())                      e.email      = 'כתובת אימייל נדרשת'
    else if (!/\S+@\S+\.\S+/.test(email))  e.email      = 'אימייל לא תקין'
    if (!password)                          e.password   = 'סיסמה נדרשת'
    else if (password.length < 6)           e.password   = 'מינימום 6 תווים'
    if (confirmPwd !== password)            e.confirmPwd = 'הסיסמאות אינן תואמות'
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    setSubmitting(false)

    if (error) {
      setErrors({ form: error.message })
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
              הצטרפות חינמית
            </div>
            <h2 className={styles.brandHeadline}>בנה את הארון<br />החכם שלך</h2>
            <p className={styles.brandSub}>תוך 2 דקות תתחיל לקבל לוקים מ-AI.</p>
            <ul className={styles.brandList}>
              <li>✦ ניהול ארון חכם</li>
              <li>✦ המלצות AI מותאמות אישית</li>
              <li>✦ מחובר למזג האוויר</li>
            </ul>
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

          <h1 className={styles.title}>צור חשבון ✦</h1>
          <p className={styles.subtitle}>התחל לבנות את הארון החכם שלך</p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>

            {/* Full Name */}
            <div className={styles.field}>
              <label className={styles.label}>שם מלא</label>
              <input
                type="text"
                className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                placeholder="ישראל ישראלי"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); clearError('fullName') }}
              />
              {errors.fullName && <p className={styles.errorMsg}>{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className={styles.field}>
              <label className={styles.label}>כתובת אימייל</label>
              <input
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError('email') }}
                dir="ltr"
              />
              {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div className={styles.field}>
              <label className={styles.label}>סיסמה</label>
              <div className={styles.pwdWrap}>
                <input
                  type={showPwd ? 'text' : 'password'}
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  placeholder="מינימום 6 תווים"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError('password') }}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPwd((v) => !v)}
                  aria-label={showPwd ? 'הסתר סיסמה' : 'הצג סיסמה'}
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
              <label className={styles.label}>אימות סיסמה</label>
              <div className={styles.pwdWrap}>
                <input
                  type={showConf ? 'text' : 'password'}
                  className={`${styles.input} ${errors.confirmPwd ? styles.inputError : ''}`}
                  placeholder="חזור על הסיסמה"
                  value={confirmPwd}
                  onChange={(e) => { setConfirmPwd(e.target.value); clearError('confirmPwd') }}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowConf((v) => !v)}
                  aria-label={showConf ? 'הסתר סיסמה' : 'הצג סיסמה'}
                >
                  {showConf ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                </button>
              </div>
              {errors.confirmPwd && <p className={styles.errorMsg}>{errors.confirmPwd}</p>}
            </div>

            {errors.form && (
              <div className={styles.formError}>{errors.form}</div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? 'יוצר חשבון...' : 'צור חשבון ✦'}
            </button>

          </form>

          <p className={styles.signInRow}>
            כבר יש לך חשבון?{' '}
            <Link to="/login" className={styles.signInLink}>התחבר</Link>
          </p>

          <p className={styles.backLink}>
            <Link to="/" className={styles.backAnchor}>חזרה לדף הבית</Link>
          </p>

        </div>
      </div>

    </div>
  )
}
