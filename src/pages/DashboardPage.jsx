import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, Plus, Shirt, Heart, Footprints, Layers, Gem, Sparkles, Sun, ChevronLeft } from 'lucide-react'
import WeatherWidget from '../components/WeatherWidget'
import { useWardrobe } from '../context/WardrobeContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import styles from './DashboardPage.module.css'

const CATEGORY_ICON = {
  Tops: Shirt, Bottoms: Shirt, Shoes: Footprints, Outer: Layers, Accessories: Gem,
}

const WEEK_DAYS = [
  { label: 'א', full: 'ראשון',   hasLook: true  },
  { label: 'ב', full: 'שני',     hasLook: true  },
  { label: 'ג', full: 'שלישי',  hasLook: true  },
  { label: 'ד', full: 'רביעי',  hasLook: false },
  { label: 'ה', full: 'חמישי',  hasLook: false },
  { label: 'ו', full: 'שישי',   hasLook: false },
  { label: 'ש', full: 'שבת',    hasLook: false },
]

// Picks a daily look from actual wardrobe items
function pickDailyLook(items, seed) {
  if (!items || items.length === 0) return null

  const tops    = items.filter(i => i.category === 'Tops')
  const bottoms = items.filter(i => i.category === 'Bottoms')
  const shoes   = items.filter(i => i.category === 'Shoes')

  const pick = (arr) => arr.length > 0 ? arr[seed % arr.length] : null

  const chosen = [
    pick(tops),
    pick(bottoms),
    pick(shoes),
  ].filter(Boolean)

  // Fall back: just pick up to 3 items in order
  if (chosen.length < 2) {
    return items.slice(0, Math.min(3, items.length))
  }
  return chosen
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { items } = useWardrobe()
  const { user }  = useAuth()

  const [lookSeed,    setLookSeed]    = useState(0)
  const [refreshing,  setRefreshing]  = useState(false)
  const [todayDay,    setTodayDay]    = useState(2)
  const [profileName, setProfileName] = useState(
    // Optimistic: use auth metadata while the DB fetch is in flight
    user?.user_metadata?.full_name ?? ''
  )

  useEffect(() => {
    if (!user) return
    supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()
      .then(({ data, error }) => {
        if (!error && data?.full_name) setProfileName(data.full_name)
      })
  }, [user])

  // First word of the name for the greeting (e.g. "נועם שלום" → "נועם")
  const firstName = profileName ? profileName.split(' ')[0] : ''

  const dailyLookItems = pickDailyLook(items, lookSeed)

  function handleRefresh() {
    setRefreshing(true)
    setTimeout(() => {
      setLookSeed(s => s + 1)
      setRefreshing(false)
    }, 380)
  }

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'בוקר טוב' :
    hour < 18 ? 'צהריים טובים' :
                'ערב טוב'

  const outfitCount = items.length >= 2 ? Math.min(items.length * 2, 12) : 0
  const STATS = [
    { value: items.length, label: 'פריטים', sub: 'בארון שלך',     barPct: Math.min(100, Math.round(items.length / 20 * 100)), Icon: Shirt    },
    { value: outfitCount,  label: 'לוקים',  sub: 'נוצרו ע"י AI', barPct: Math.min(100, Math.round(outfitCount / 12 * 100)),   Icon: Sparkles },
    { value: 0,            label: 'שמורים', sub: 'לוקים אהובים', barPct: 0,                                                   Icon: Heart    },
  ]

  /* ── Full empty state ── */
  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.greetRow}>
              <Sun size={16} strokeWidth={2} className={styles.sunIcon} />
              <span className={styles.greetSub}>{greeting}</span>
            </div>
            <h1 className={styles.greetMain}>{firstName ? `${firstName}! ✨` : '✨'}</h1>
          </div>
          <div className={styles.avatar}>
            <Shirt size={22} strokeWidth={1.5} className={styles.avatarIcon} />
          </div>
        </header>
        <div className={styles.emptyDash}>
          <div className={styles.emptyDashIconWrap}>
            <Shirt size={56} strokeWidth={1} className={styles.emptyDashIcon} />
          </div>
          <h2 className={styles.emptyDashTitle}>הארון שלך ריק! 👋</h2>
          <p className={styles.emptyDashDesc}>
            כדי לקבל המלצות לוק, צריך קודם להוסיף בגדים לארון שלך
          </p>
          <button className={styles.emptyDashBtn} onClick={() => navigate('/closet/add')}>
            ✦ התחל להוסיף בגדים
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* ── Add nudge if few items ── */}
      {items.length < 5 && (
        <div className={styles.nudgeCard} onClick={() => navigate('/closet/add')} role="button" tabIndex={0}>
          <Plus size={16} strokeWidth={2.5} className={styles.nudgeIcon} />
          <span className={styles.nudgeText}>
            הוסף בגד לארון שלך ← ה-AI יבנה לך לוקים טובים יותר
          </span>
        </div>
      )}

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.greetRow}>
            <Sun size={16} strokeWidth={2} className={styles.sunIcon} />
            <span className={styles.greetSub}>{greeting}</span>
          </div>
          <h1 className={styles.greetMain}>{firstName ? `${firstName}! ✨` : '✨'}</h1>
          <p className={styles.greetTagline}>ה-AI בחר לך לוק להיום</p>
        </div>
        <div className={styles.avatar}>
          <Shirt size={22} strokeWidth={1.5} className={styles.avatarIcon} />
        </div>
      </header>

      {/* ── Desktop Grid ── */}
      <div className={styles.desktopGrid}>

        {/* ── RIGHT column ── */}
        <div className={styles.rightCol}>

          {/* AI Daily Look */}
          <section className={styles.section}>
            <div className={styles.sectionRow}>
              <h2 className={styles.sectionTitle}>הלוק של היום</h2>
              <button className={styles.refreshBtn} onClick={handleRefresh} aria-label="רענן לוק">
                <RefreshCw
                  size={14}
                  strokeWidth={2.5}
                  className={`${styles.refreshIcon} ${refreshing ? styles.spinning : ''}`}
                />
                <span>רענן</span>
              </button>
            </div>

            <div className={`${styles.lookCard} ${refreshing ? styles.lookFade : ''}`}>
              {/* AI badge */}
              <div className={styles.aiBadge}>
                <span className={styles.pulseDot} />
                ✦ AI בחר עבורך · התאמה 94%
              </div>

              {/* Items from actual wardrobe */}
              {dailyLookItems && dailyLookItems.length > 0 ? (
                <>
                  <div className={styles.lookItems}>
                    {dailyLookItems.map((item, i) => {
                      const Icon = CATEGORY_ICON[item.category] ?? Shirt
                      return (
                        <div key={item.id ?? i} className={styles.lookItem}>
                          {i > 0 && <div className={styles.itemDivider} />}
                          <div className={styles.itemInner}>
                            <div className={styles.itemIconBox}>
                              <Icon size={24} strokeWidth={1.5} className={styles.itemIcon} />
                            </div>
                            <div>
                              <p className={styles.itemName}>{item.name}</p>
                              <span className={styles.ownedBadge}>✓ מהארון שלך</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <p className={styles.lookBuiltText}>
                    הלוק הזה בנוי מ-{dailyLookItems.length} פריטים שיש לך בארון
                  </p>
                </>
              ) : (
                <div className={styles.onboardingNudge}>
                  <Sparkles size={16} strokeWidth={1.75} />
                  <span>הוסף בגדים לארון כדי לקבל לוקים מהארון שלך</span>
                </div>
              )}

              {/* Onboarding nudge if less than 3 items */}
              {dailyLookItems && dailyLookItems.length > 0 && items.length < 3 && (
                <button
                  className={styles.onboardingNudge}
                  onClick={() => navigate('/closet/add')}
                >
                  הוסף עוד בגדים לארון כדי לקבל לוקים טובים יותר →
                </button>
              )}

              <button className={styles.whyLink} onClick={() => navigate('/outfits')}>
                למה הלוק הזה? ←
              </button>
            </div>

            <button className={styles.ctaBtn} onClick={() => navigate('/outfits')}>
              ✦ קבל את הלוק שלי
            </button>
          </section>

          {/* Weekly Looks Strip */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>לוקים שבועיים</h2>
            <div className={styles.weekStrip}>
              {WEEK_DAYS.map(({ label, full, hasLook }, i) => (
                <div
                  key={label}
                  className={`${styles.dayCell} ${i === todayDay ? styles.dayCellToday : ''}`}
                  title={full}
                >
                  <span className={styles.dayLabel}>{label}</span>
                  <div className={`${styles.dayDot} ${hasLook ? styles.dayDotFilled : ''}`} />
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ── LEFT column ── */}
        <div className={styles.leftCol}>

          {/* Weather */}
          <section className={styles.section}>
            <WeatherWidget />
          </section>

          {/* Stats */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>הארון שלי</h2>
            <div className={styles.statsGrid}>
              {STATS.map(({ value, label, sub, barPct, Icon }) => (
                <div key={label} className={styles.statCard}>
                  <div className={styles.statTop}>
                    <div className={styles.statIconWrap}>
                      <Icon size={15} strokeWidth={1.75} className={styles.statIcon} />
                    </div>
                    <p className={styles.statValue}>{value}</p>
                  </div>
                  <p className={styles.statLabel}>{label}</p>
                  <p className={styles.statSub}>{sub}</p>
                  <div className={styles.statBar}>
                    <div className={styles.statBarFill} style={{ width: `${barPct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>פעולות מהירות</h2>
            <div className={styles.quickGrid}>
              {[
                { Icon: Plus,  label: 'הוסף פריט',   route: '/closet/add' },
                { Icon: Shirt, label: 'הארון שלי',    route: '/closet'     },
                { Icon: Heart, label: 'שמורים',       route: '/saved'      },
              ].map(({ Icon, label, route }) => (
                <button key={label} className={styles.actionBtn} onClick={() => navigate(route)}>
                  <Icon size={20} strokeWidth={1.75} className={styles.actionIcon} />
                  <span className={styles.actionLabel}>{label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* AI Suggestion card */}
          <section className={styles.section}>
            <div className={styles.aiSuggestion}>
              <div className={styles.aiSuggestIcon}>
                <Sparkles size={18} strokeWidth={1.75} />
              </div>
              <div>
                <p className={styles.aiSuggestTitle}>טיפ AI להיום</p>
                <p className={styles.aiSuggestText}>
                  מזג האוויר 22° — מושלם לשכבות קלות. נסה לשלב את הבלייזר עם החולצה הלבנה.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
