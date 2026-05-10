import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, Plus, Shirt, Heart, Footprints, Layers, Gem, Sparkles, Sun } from 'lucide-react'
import WeatherWidget from '../components/WeatherWidget'
import PrimaryButton  from '../components/PrimaryButton'
import { dailyLooks, clothingItems } from '../data/mockData'
import styles from './DashboardPage.module.css'

const CATEGORY_ICON = {
  Tops: Shirt, Bottoms: Shirt, Shoes: Footprints, Outer: Layers, Accessories: Gem,
}

const STATS = [
  { value: clothingItems.length, label: 'Items',   sub: 'in your closet',    Icon: Shirt    },
  { value: 12,                   label: 'Outfits', sub: 'AI-generated',      Icon: Sparkles },
  { value: 0,                    label: 'Saved',   sub: 'favourite looks',   Icon: Heart    },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [lookIdx, setLookIdx]       = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const look = dailyLooks[lookIdx]

  function handleRefresh() {
    setRefreshing(true)
    setTimeout(() => {
      setLookIdx((i) => (i + 1) % dailyLooks.length)
      setRefreshing(false)
    }, 380)
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className={styles.page}>
      {/* Page header */}
      <header className={styles.header}>
        <div>
          <div className={styles.greetingRow}>
            <Sun size={18} strokeWidth={2} className={styles.greetingIcon} />
            <p className={styles.greeting}>{greeting} — here's your look for today</p>
          </div>
          <h1 className={styles.title}>What's today's vibe?</h1>
          <p className={styles.tagline}>Your AI-powered digital wardrobe</p>
          <p className={styles.date}>{today}</p>
        </div>
        <div className={styles.avatar}>
          <Shirt size={26} strokeWidth={1.5} className={styles.avatarIcon} />
        </div>
      </header>

      {/* Desktop: 2-column grid */}
      <div className={styles.desktopGrid}>

        {/* LEFT column */}
        <div className={styles.leftCol}>
          {/* Weather */}
          <section className={styles.section}>
            <WeatherWidget />
          </section>

          {/* Daily Look */}
          <section className={styles.section}>
            <div className={styles.sectionRow}>
              <h2 className={styles.sectionTitle}>Today's Daily Look</h2>
              <button className={styles.refreshBtn} onClick={handleRefresh} aria-label="Refresh look">
                <RefreshCw
                  size={15}
                  strokeWidth={2.5}
                  className={`${styles.refreshIcon} ${refreshing ? styles.spinning : ''}`}
                />
              </button>
            </div>

            <div className={`${styles.lookCard} ${refreshing ? styles.lookFade : ''}`}>
              <span className={styles.lookLabel}>✦ {look.label}</span>
              <div className={styles.lookItems}>
                {look.items.map((item, i) => {
                  const Icon = CATEGORY_ICON[item.category] ?? Shirt
                  return (
                    <div key={i} className={styles.lookItem}>
                      {i > 0 && <div className={styles.divider} />}
                      <div className={styles.lookItemInner}>
                        <div className={styles.lookIconBox}>
                          <Icon size={28} strokeWidth={1.5} className={styles.lookIcon} />
                        </div>
                        <div>
                          <p className={styles.lookItemName}>{item.name}</p>
                          <p className={styles.lookItemCat}>{item.category}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className={styles.section}>
            <PrimaryButton onClick={() => navigate('/outfits')}>
              ✦ Get My Look
            </PrimaryButton>
          </section>
        </div>

        {/* RIGHT column */}
        <div className={styles.rightCol}>
          {/* Stats — desktop only */}
          <section className={`${styles.section} ${styles.statsSection}`}>
            <h2 className={styles.sectionTitle}>Your Wardrobe</h2>
            <div className={styles.statsGrid}>
              {STATS.map(({ value, label, sub, Icon }) => (
                <div key={label} className={styles.statCard}>
                  <div className={styles.statIconWrap}>
                    <Icon size={18} strokeWidth={1.75} className={styles.statIcon} />
                  </div>
                  <p className={styles.statValue}>{value}</p>
                  <p className={styles.statLabel}>{label}</p>
                  <p className={styles.statSub}>{sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Quick Actions</h2>
            <div className={styles.quickGrid}>
              {[
                { Icon: Plus,  label: 'Add Item',  route: '/closet/add' },
                { Icon: Shirt, label: 'My Closet', route: '/closet'     },
                { Icon: Heart, label: 'Saved',     route: '/saved'      },
              ].map(({ Icon, label, route }) => (
                <button key={label} className={styles.actionBtn} onClick={() => navigate(route)}>
                  <Icon size={22} strokeWidth={1.75} className={styles.actionIcon} />
                  <span className={styles.actionLabel}>{label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
