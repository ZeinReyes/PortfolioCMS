import styles from './Button.module.css'
import Icon from './Icon'

export default function Button({
  children, variant = 'primary', size = 'md', icon, iconPos = 'left',
  loading = false, disabled = false, onClick, type = 'button', style: extraStyle, className = '',
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
      style={extraStyle}>
      {loading
        ? <span className="animate-spin" style={{ display:'inline-flex' }}><Icon name="spinner" size={14} /></span>
        : icon && iconPos === 'left' && <Icon name={icon} size={14} />}
      {children}
      {!loading && icon && iconPos === 'right' && <Icon name={icon} size={14} />}
    </button>
  )
}
