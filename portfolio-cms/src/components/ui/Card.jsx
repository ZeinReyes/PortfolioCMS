import styles from './Card.module.css'

export default function Card({ children, className = '', accent, onClick, style: extra }) {
  return (
    <div
      className={`${styles.card} ${onClick ? styles.clickable : ''} ${className}`}
      onClick={onClick}
      style={{ '--accent-color': accent, ...extra }}
    >
      {accent && <div className={styles.accentBar} />}
      {children}
    </div>
  )
}
