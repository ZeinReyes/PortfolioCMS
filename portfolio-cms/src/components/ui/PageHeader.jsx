import Button from './Button'
import styles from './PageHeader.module.css'

export default function PageHeader({ title, subtitle, action, actionLabel, actionIcon = 'plus' }) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {action && (
        <Button variant="primary" icon={actionIcon} onClick={action}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
