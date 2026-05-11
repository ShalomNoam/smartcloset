import { useLocation, Link } from 'react-router-dom'
import { Shirt } from 'lucide-react'
import styles from './TopNavBar.module.css'

const NAV = [
  { path: '/dashboard', label: 'בית'       },
  { path: '/closet',    label: 'הארון שלי'  },
  { path: '/outfits',   label: 'לוקים'     },
  { path: '/saved',     label: 'שמורים'    },
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
        <Link to="/dashboard" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Shirt size={18} strokeWidth={1.75} />
          </div>
          <span className={styles.logoText}>SmartCloset</span>
        </Link>

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
