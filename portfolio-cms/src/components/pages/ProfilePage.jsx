import { useState, useEffect } from 'react'
import { useProfile } from '../../hooks/useProfile'
import PageHeader from '../ui/PageHeader'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Icon from '../ui/Icon'
import styles from './ProfilePage.module.css'

export default function ProfilePage() {
  const { profile, loading, saving, save } = useProfile()
  const [form, setForm] = useState(null)

  useEffect(() => {
    if (profile) setForm({ ...profile })
  }, [profile])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  if (loading || !form) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
      <Icon name="spinner" size={28} style={{ animation: 'spin 0.8s linear infinite', color: 'var(--text-muted)' }} />
    </div>
  )

  const initials = form.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'

  return (
    <div>
      <PageHeader title="Profile" subtitle="Your public-facing information" />

      <div className={styles.layout}>
        {/* Avatar card */}
        <Card className={styles.avatarCard}>
          <div className={styles.avatarBody}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.avatarName}>{form.name || 'Your Name'}</div>
            <div className={styles.avatarTitle}>{form.title || 'Your Title'}</div>
            <div className={styles.avatarLinks}>
              {form.email    && <a href={`mailto:${form.email}`}    className={styles.avatarLink}><Icon name="mail"     size={15} /></a>}
              {form.github   && <a href={`https://${form.github}`}   target="_blank" rel="noopener noreferrer" className={styles.avatarLink}><Icon name="github"   size={15} /></a>}
              {form.linkedin && <a href={`https://${form.linkedin}`} target="_blank" rel="noopener noreferrer" className={styles.avatarLink}><Icon name="linkedin" size={15} /></a>}
            </div>
          </div>
        </Card>

        {/* Form card */}
        <Card className={styles.formCard}>
          <div className={styles.formBody}>
            <h2 className={styles.formTitle}>Personal Information</h2>
            <div className={styles.formGrid}>
              <Input label="Full Name" value={form.name} onChange={v => set('name', v)} required />
              <Input label="Professional Title" value={form.title} onChange={v => set('title', v)} required />
            </div>
            <Input label="Bio" value={form.bio} onChange={v => set('bio', v)} multiline rows={4} />

            <h2 className={styles.formTitle} style={{ marginTop: 4 }}>Contact & Links</h2>
            <div className={styles.formGrid}>
              <Input label="Email" type="email" value={form.email} onChange={v => set('email', v)} />
              <Input label="Location" value={form.location} onChange={v => set('location', v)} placeholder="San Francisco, CA" />
            </div>
            <div className={styles.formGrid}>
              <Input label="GitHub" value={form.github} onChange={v => set('github', v)} placeholder="github.com/username" />
              <Input label="LinkedIn" value={form.linkedin} onChange={v => set('linkedin', v)} placeholder="linkedin.com/in/username" />
            </div>
            <Input label="Personal Website" value={form.website} onChange={v => set('website', v)} placeholder="yoursite.dev" />

            <div className={styles.saveRow}>
              <Button variant="primary" icon="save" onClick={() => save(form)} loading={saving}>
                Save Profile
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
