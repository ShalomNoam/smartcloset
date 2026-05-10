import { useLocation, Link } from 'react-router-dom'
import { Shirt } from 'lucide-react'
import styles from './TopNavBar.module.css'

const NAV = [
  { path: '/dashboard', label: 'Home'      },
  { path: '/closet',    label: 'My Closet' },
  { path: '/outfits',   label: 'Outfits'   },
  { path: '/saved',     label: 'Saved'     },
]

export default function TopNavBar() {
  const { pathname } = useLocation()

  function isActive(path) {
    if (path === '/closet') return pathname.startsWith('/closet')
    return pathname === path
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/dashboard" className={styles.logo}>
          <Shirt size={20} strokeWidth={2} className={styles.logoIcon} />
          <span className={styles.logoText}>SmartCloset</span>
        </Link>

        {/* Nav links */}
        <nav className={styles.nav}>
          {NAV.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`${styles.link} ${isActive(path) ? styles.active : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
