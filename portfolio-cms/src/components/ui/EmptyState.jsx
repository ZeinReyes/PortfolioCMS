import Button from './Button'
import Icon from './Icon'
import styles from './EmptyState.module.css'

export default function EmptyState({ icon, title, description, action, actionLabel }) {
  return (
    <div className={styles.wrapper}>
      {icon && <div className={styles.icon}><Icon name={icon} size={32} /></div>}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
      {action && (
        <Button variant="primary" icon="plus" onClick={action}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
