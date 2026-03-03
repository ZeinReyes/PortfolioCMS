import { NavLink, useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon'
import { useProfile } from '../../hooks/useProfile'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { to: '/',               icon: 'dashboard',  label: 'Dashboard'       },
  { to: '/projects',       icon: 'projects',   label: 'Projects'        },
  { to: '/certifications', icon: 'cert',       label: 'Certifications'  },
  { to: '/skills',         icon: 'skills',     label: 'Skills'          },
  { to: '/experience',     icon: 'experience', label: 'Experience'      },
  { to: '/profile',        icon: 'profile',    label: 'Profile'         },
]

export default function Sidebar({ open }) {
  const { profile } = useProfile()
  const { isDark } = useTheme()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const initials =
    profile?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'

  const handleLogout = () => {
    logout()
    navigate('/login') // redirect to login page
  }

  return (
    <aside
      className={`${styles.sidebar} ${open ? styles.open : styles.closed} ${
        isDark ? styles.dark : styles.light
      }`}
    >
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          {initials}
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoTitle}>PortfolioCMS</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <p className={styles.navGroup}>Menu</p>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <button
          className={styles.logoutBtn}
          onClick={handleLogout}
        >
          <Icon name="logout" size={17} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}