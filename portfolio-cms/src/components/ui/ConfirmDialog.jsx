import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'
import Icon from './Icon'
import styles from './Modal.module.css'

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onCancel() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onCancel])

  return createPortal(
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className={`${styles.modal} ${styles.sm} animate-scaleIn`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title || 'Are you sure?'}</h2>
          <button className={styles.closeBtn} onClick={onCancel}><Icon name="x" size={18} /></button>
        </div>
        <div className={styles.body}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
            {message || 'This action cannot be undone.'}
          </p>
        </div>
        <div className={styles.footer}>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" icon="trash" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>,
    document.body
  )
}