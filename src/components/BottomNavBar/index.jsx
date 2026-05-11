import { useLocation, NavLink } from 'react-router-dom'
import { Home, Shirt, Heart, Sparkles } from 'lucide-react'
import styles from './BottomNavBar.module.css'

const NAV = [
  { path: '/dashboard', label: 'בית',    Icon: Home     },
  { path: '/closet',    label: 'ארון',   Icon: Shirt    },
  { path: '/saved',     label: 'שמורים', Icon: Heart    },
  { path: '/outfits',   label: 'לוקים',  Icon: Sparkles },
]

export default function BottomNavBar() {
  const { pathname } = useLocation()

  function active(path) {
    if (path === '/closet') return pathname.startsWith('/closet')
    return pathname === path
  }

  return (
    <nav className={styles.nav}>
      {NAV.map(({ path, label, Icon }) => {
        const isActive = active(path)
        return (
          <NavLink
            key={path}
            to={path}
            className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
          >
            <Icon
              size={22}
              strokeWidth={isActive ? 2 : 1.75}
              className={isActive ? styles.iconActive : styles.icon}
            />
            <span className={isActive ? styles.labelActive : styles.label}>{label}</span>
            {isActive && <span className={styles.dot} />}
          </NavLink>
        )
      })}
    </nav>
  )
}
