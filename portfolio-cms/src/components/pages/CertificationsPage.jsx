import { useState } from 'react'
import { useCrud } from '../../hooks/useCrud'
import { certService } from '../../services/portfolioService'
import PageHeader from '../ui/PageHeader'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import ConfirmDialog from '../ui/ConfirmDialog'
import Input from '../ui/Input'
import EmptyState from '../ui/EmptyState'
import Icon from '../ui/Icon'
import styles from './CertificationsPage.module.css'

const EMPTY = { name: '', issuer: '', date: '', expiryDate: '', credentialUrl: '', credentialId: '', visible: true }

export default function CertificationsPage() {
  const { items, loading, saving, create, update, remove, toggleVisibility } = useCrud(certService)
  const [modal, setModal]     = useState(null)
  const [form, setForm]       = useState(EMPTY)
  const [deleteId, setDeleteId] = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const openAdd  = () => { setForm(EMPTY); setModal('add') }
  const openEdit = (c) => { setForm(c); setModal('edit') }

  const handleSave = async () => {
    const ok = modal === 'edit' ? await update(form._id, form) : await create(form)
    if (ok) setModal(null)
  }

  if (loading) return <Spinner />

  return (
    <div>
      <PageHeader title="Certifications" subtitle={`${items.length} certifications`} action={openAdd} actionLabel="Add Certification" />

      {items.length === 0 ? (
        <EmptyState icon="cert" title="No certifications yet" description="Add your professional certifications to showcase your credentials." action={openAdd} actionLabel="Add Certification" />
      ) : (
        <div className={styles.grid}>
          {items.map(cert => (
            <Card key={cert._id} className={styles.card}>
              <div className={styles.body}>
                <div className={styles.iconWrap}>
                  <Icon name="award" size={22} />
                </div>
                <div className={styles.content}>
                  <div className={styles.top}>
                    <div>
                      <h3 className={styles.name}>{cert.name}</h3>
                      <div className={styles.issuer}>{cert.issuer}</div>
                    </div>
                    <div className={styles.actions}>
                      <Button variant="ghost" size="icon" onClick={() => toggleVisibility(cert._id)}>
                        <Icon name={cert.visible ? 'eye' : 'eyeOff'} size={15} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEdit(cert)}>
                        <Icon name="edit" size={15} />
                      </Button>
                      <Button variant="danger" size="icon" onClick={() => setDeleteId(cert._id)}>
                        <Icon name="trash" size={15} />
                      </Button>
                    </div>
                  </div>
                  <div className={styles.meta}>
                    <span>Issued: {cert.date}</span>
                    {cert.expiryDate && <span>Expires: {cert.expiryDate}</span>}
                    {cert.credentialId && <span>ID: {cert.credentialId}</span>}
                  </div>
                  <div className={styles.footer}>
                    <Badge variant={cert.visible ? 'success' : 'default'}>{cert.visible ? 'Visible' : 'Hidden'}</Badge>
                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className={styles.verifyLink}>
                        <Icon name="link" size={12} /> Verify
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === 'edit' ? 'Edit Certification' : 'Add Certification'} onClose={() => setModal(null)} onSave={handleSave} saving={saving}>
          <Input label="Certification Name" value={form.name} onChange={v => set('name', v)} required />
          <Input label="Issuing Organization" value={form.issuer} onChange={v => set('issuer', v)} required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label="Issue Date" type="date" value={form.date} onChange={v => set('date', v)} />
            <Input label="Expiry Date" type="date" value={form.expiryDate} onChange={v => set('expiryDate', v)} />
          </div>
          <Input label="Credential ID" value={form.credentialId} onChange={v => set('credentialId', v)} />
          <Input label="Verification URL" value={form.credentialUrl} onChange={v => set('credentialUrl', v)} placeholder="https://..." />
          <label className={styles.checkbox}>
            <input type="checkbox" checked={form.visible} onChange={e => set('visible', e.target.checked)} />
            <span>Visible on portfolio</span>
          </label>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog title="Delete Certification" message="Delete this certification? This cannot be undone." onConfirm={async () => { await remove(deleteId); setDeleteId(null) }} onCancel={() => setDeleteId(null)} />
      )}
    </div>
  )
}

const Spinner = () => <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}><Icon name="spinner" size={28} style={{ animation: 'spin 0.8s linear infinite', color: 'var(--text-muted)' }} /></div>
