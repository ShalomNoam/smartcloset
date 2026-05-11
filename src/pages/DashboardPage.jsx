import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, Plus, Shirt, Heart, Footprints, Layers, Gem, Sparkles, Sun, ChevronLeft } from 'lucide-react'
import WeatherWidget from '../components/WeatherWidget'
import { dailyLooks, clothingItems } from '../data/mockData'
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

const STATS = [
  { value: clothingItems.length, label: 'פריטים', sub: 'בארון שלך',      barPct: 72, Icon: Shirt    },
  { value: 12,                   label: 'לוקים',  sub: 'נוצרו ע"י AI',  barPct: 85, Icon: Sparkles },
  { value: 3,                    label: 'שמורים', sub: 'לוקים אהובים',  barPct: 30, Icon: Heart    },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [lookIdx,    setLookIdx]    = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const [todayDay,   setTodayDay]   = useState(2) // index into WEEK_DAYS (Wednesday = today)

  const look = dailyLooks[lookIdx]

  function handleRefresh() {
    setRefreshing(true)
    setTimeout(() => {
      setLookIdx((i) => (i + 1) % dailyLooks.length)
      setRefreshing(false)
    }, 380)
  }

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'בוקר טוב' :
    hour < 18 ? 'צהריים טובים' :
                'ערב טוב'

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.greetRow}>
            <Sun size={16} strokeWidth={2} className={styles.sunIcon} />
            <span className={styles.greetSub}>{greeting}</span>
          </div>
          <h1 className={styles.greetMain}>נועם! ✨</h1>
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

              {/* Items */}
              <div className={styles.lookItems}>
                {look.items.map((item, i) => {
                  const Icon = CATEGORY_ICON[item.category] ?? Shirt
                  return (
                    <div key={i} className={styles.lookItem}>
                      {i > 0 && <div className={styles.itemDivider} />}
                      <div className={styles.itemInner}>
                        <div className={styles.itemIconBox}>
                          <Icon size={24} strokeWidth={1.5} className={styles.itemIcon} />
                        </div>
                        <div>
                          <p className={styles.itemName}>{item.name}</p>
                          <p className={styles.itemCat}>{look.label}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

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
