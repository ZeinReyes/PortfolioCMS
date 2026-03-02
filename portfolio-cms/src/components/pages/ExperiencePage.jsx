import { useState } from 'react'
import { useCrud } from '../../hooks/useCrud'
import { experienceService } from '../../services/portfolioService'
import PageHeader from '../ui/PageHeader'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import ConfirmDialog from '../ui/ConfirmDialog'
import Input from '../ui/Input'
import EmptyState from '../ui/EmptyState'
import Icon from '../ui/Icon'
import styles from './ExperiencePage.module.css'

const EMPTY = { role: '', company: '', location: '', start: '', end: '', current: false, description: '', visible: true }

export default function ExperiencePage() {
  const { items, loading, saving, create, update, remove, toggleVisibility } = useCrud(experienceService)
  const [modal, setModal]     = useState(null)
  const [form, setForm]       = useState(EMPTY)
  const [deleteId, setDeleteId] = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const openAdd  = () => { setForm(EMPTY); setModal('add') }
  const openEdit = (e) => { setForm(e); setModal('edit') }

  const handleSave = async () => {
    const ok = modal === 'edit' ? await update(form._id, form) : await create(form)
    if (ok) setModal(null)
  }

  if (loading) return <Spinner />

  return (
    <div>
      <PageHeader title="Experience" subtitle={`${items.length} positions`} action={openAdd} actionLabel="Add Experience" />

      {items.length === 0 ? (
        <EmptyState icon="experience" title="No experience yet" description="Add your work history to showcase your career journey." action={openAdd} actionLabel="Add Experience" />
      ) : (
        <div className={styles.timeline}>
          {items.map((exp, idx) => (
            <div key={exp._id} className={styles.timelineItem}>
              <div className={styles.timelineLeft}>
                <div className={`${styles.dot} ${exp.current ? styles.dotActive : ''}`} />
                {idx < items.length - 1 && <div className={styles.line} />}
              </div>
              <Card className={styles.card}>
                <div className={styles.body}>
                  <div className={styles.top}>
                    <div>
                      <h3 className={styles.role}>{exp.role}</h3>
                      <div className={styles.company}>
                        {exp.company}
                        {exp.location && <span className={styles.location}> · {exp.location}</span>}
                      </div>
                      <div className={styles.dates}>
                        {exp.start} – {exp.current ? 'Present' : exp.end}
                        {exp.current && <Badge variant="success" size="sm">Current</Badge>}
                      </div>
                    </div>
                    <div className={styles.actions}>
                      <Badge variant={exp.visible ? 'success' : 'default'}>{exp.visible ? 'Visible' : 'Hidden'}</Badge>
                      <Button variant="ghost" size="icon" onClick={() => toggleVisibility(exp._id)}>
                        <Icon name={exp.visible ? 'eye' : 'eyeOff'} size={15} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEdit(exp)}>
                        <Icon name="edit" size={15} />
                      </Button>
                      <Button variant="danger" size="icon" onClick={() => setDeleteId(exp._id)}>
                        <Icon name="trash" size={15} />
                      </Button>
                    </div>
                  </div>
                  <p className={styles.desc}>{exp.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === 'edit' ? 'Edit Experience' : 'Add Experience'} onClose={() => setModal(null)} onSave={handleSave} saving={saving}>
          <Input label="Job Title / Role" value={form.role} onChange={v => set('role', v)} required />
          <Input label="Company" value={form.company} onChange={v => set('company', v)} required />
          <Input label="Location" value={form.location} onChange={v => set('location', v)} placeholder="San Francisco, CA or Remote" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label="Start Date" type="month" value={form.start} onChange={v => set('start', v)} />
            {!form.current && <Input label="End Date" type="month" value={form.end} onChange={v => set('end', v)} />}
          </div>
          <label className={styles.checkbox} style={{ marginBottom: 14 }}>
            <input type="checkbox" checked={form.current} onChange={e => set('current', e.target.checked)} />
            <span>I currently work here</span>
          </label>
          <Input label="Description" value={form.description} onChange={v => set('description', v)} multiline rows={4} />
          <label className={styles.checkbox}>
            <input type="checkbox" checked={form.visible} onChange={e => set('visible', e.target.checked)} />
            <span>Visible on portfolio</span>
          </label>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog title="Delete Experience" message="Delete this work experience entry? This cannot be undone." onConfirm={async () => { await remove(deleteId); setDeleteId(null) }} onCancel={() => setDeleteId(null)} />
      )}
    </div>
  )
}

const Spinner = () => <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}><Icon name="spinner" size={28} style={{ animation: 'spin 0.8s linear infinite', color: 'var(--text-muted)' }} /></div>
