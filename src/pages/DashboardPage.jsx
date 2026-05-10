import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, Plus, Shirt, Heart, Footprints, Layers, Gem } from 'lucide-react'
import WeatherWidget from '../components/WeatherWidget'
import PrimaryButton  from '../components/PrimaryButton'
import { dailyLooks } from '../data/mockData'
import styles from './DashboardPage.module.css'

const CATEGORY_ICON = {
  Tops: Shirt, Bottoms: Shirt, Shoes: Footprints, Outer: Layers, Accessories: Gem,
}

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

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <p className={styles.greeting}>Good morning</p>
          <h1 className={styles.title}>What's today's vibe?</h1>
          <p className={styles.tagline}>Your AI-powered digital wardrobe</p>
        </div>
        <div className={styles.avatar}>
          <Shirt size={26} strokeWidth={1.5} className={styles.avatarIcon} />
        </div>
      </header>

      <p className={styles.date}>{today}</p>

      {/* Weather */}
      <section className={styles.section} style={{ animationDelay: '80ms' }}>
        <WeatherWidget />
      </section>

      {/* Daily Look */}
      <section className={styles.section} style={{ animationDelay: '160ms' }}>
        <div className={styles.sectionRow}>
          <h2 className={styles.sectionTitle}>Today's Daily Look</h2>
          <button
            className={styles.refreshBtn}
            onClick={handleRefresh}
            aria-label="Refresh look"
          >
            <RefreshCw
              size={16}
              strokeWidth={2}
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
                  <div className={styles.lookIconBox}>
                    <Icon size={28} strokeWidth={1.5} className={styles.lookIcon} />
                  </div>
                  <div>
                    <p className={styles.lookItemName}>{item.name}</p>
                    <p className={styles.lookItemCat}>{item.category}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.section} style={{ animationDelay: '240ms' }}>
        <PrimaryButton onClick={() => navigate('/outfits')}>
          ✦ Get My Look
        </PrimaryButton>
      </section>

      {/* Quick Actions */}
      <section className={styles.section} style={{ animationDelay: '320ms' }}>
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
  )
}
