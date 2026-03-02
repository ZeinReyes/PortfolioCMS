import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Input from '../ui/Input'
import Button from '../ui/Button'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const [email, setEmail]       = useState('admin@portfolio.com')
  const [password, setPassword] = useState('admin123')
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const ok = await login(email, password)
    if (ok) navigate('/')
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.card} animate-scaleIn`} onKeyDown={e => e.key === 'Enter' && handleSubmit()}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>P</div>
        </div>
        <h1 className={styles.title}>Portfolio CMS</h1>
        <p className={styles.subtitle}>Sign in to manage your portfolio</p>

        {error && <div className={styles.error}><span>⚠</span> {error}</div>}

        <div className={styles.form}>
          <Input label="Email" type="email" value={email} onChange={setEmail} required />
          <Input label="Password" type="password" value={password} onChange={setPassword} required />
          <Button variant="primary" size="lg" onClick={handleSubmit} loading={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>
            Sign In
          </Button>
        </div>

        <p className={styles.hint}>Demo · admin@portfolio.com / admin123</p>
      </div>
    </div>
  )
}
