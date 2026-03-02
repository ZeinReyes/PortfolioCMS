import { useTheme } from '../../context/ThemeContext'
import { useProfile } from '../../hooks/useProfile'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import styles from './Header.module.css'

export default function Header({ onMenuToggle }) {
  const { isDark, toggleTheme } = useTheme()
  const { profile, loading } = useProfile()

  const initials =
    profile?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'

  return (
    <header className={styles.header}>
      <button
        className={styles.menuBtn}
        onClick={onMenuToggle}
        aria-label="Toggle sidebar"
      >
        <Icon name="menu" size={20} />
      </button>

      <div className={styles.right}>
        <div className={styles.statusDot}>
          <span className={styles.dot} />
          <span className={styles.statusText}>API Connected</span>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={isDark ? 'sun' : 'moon'}
          onClick={toggleTheme}
        >
          {isDark ? 'Light' : 'Dark'}
        </Button>

        <div
          className={styles.avatar}
          title={profile?.name}
        >
          {loading ? '' : initials}
        </div>
      </div>
    </header>
  )
}