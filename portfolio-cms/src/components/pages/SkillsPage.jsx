import { useState } from 'react'
import { useCrud } from '../../hooks/useCrud'
import { skillService } from '../../services/portfolioService'
import PageHeader from '../ui/PageHeader'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import ConfirmDialog from '../ui/ConfirmDialog'
import Input from '../ui/Input'
import EmptyState from '../ui/EmptyState'
import Icon from '../ui/Icon'
import styles from './SkillsPage.module.css'

const EMPTY = { name: '', category: '', level: 75, visible: true }

export default function SkillsPage() {
  const { items, loading, saving, create, update, remove, toggleVisibility } = useCrud(skillService)
  const [modal, setModal]     = useState(null)
  const [form, setForm]       = useState(EMPTY)
  const [deleteId, setDeleteId] = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const openAdd  = () => { setForm(EMPTY); setModal('add') }
  const openEdit = (s) => { setForm(s); setModal('edit') }

  const handleSave = async () => {
    const payload = { ...form, level: parseInt(form.level) }
    const ok = modal === 'edit' ? await update(form._id, payload) : await create(payload)
    if (ok) setModal(null)
  }

  const grouped = items.reduce((acc, sk) => {
    const cat = sk.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(sk)
    return acc
  }, {})

  if (loading) return <Spinner />

  return (
    <div>
      <PageHeader
        title="Skills"
        subtitle={`${items.length} skills · ${Object.keys(grouped).length} categories`}
        action={openAdd}
        actionLabel="Add Skill"
      />

      {items.length === 0 ? (
        <EmptyState icon="skills" title="No skills yet" description="Add your technical skills to showcase your expertise." action={openAdd} actionLabel="Add Skill" />
      ) : (
        <div className={styles.categoriesGrid}>
          {Object.entries(grouped).map(([category, skills]) => (
            <div key={category} className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>{category}</h3>
              <div className={styles.skillsGrid}>
                {skills.map(skill => (
                  <Card key={skill._id} className={styles.skillCard}>
                    <div className={styles.skillBody}>
                      <div className={styles.skillTop}>
                        <div>
                          <div className={styles.skillName}>{skill.name}</div>
                          <Badge variant={skill.visible ? 'success' : 'default'} size="sm">
                            {skill.visible ? 'Visible' : 'Hidden'}
                          </Badge>
                        </div>
                        <div className={styles.actions}>
                          <Button variant="ghost" size="icon" onClick={() => toggleVisibility(skill._id)}>
                            <Icon name={skill.visible ? 'eye' : 'eyeOff'} size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openEdit(skill)}>
                            <Icon name="edit" size={14} />
                          </Button>
                          <Button variant="danger" size="icon" onClick={() => setDeleteId(skill._id)}>
                            <Icon name="trash" size={14} />
                          </Button>
                        </div>
                      </div>
                      <div className={styles.levelRow}>
                        <div className={styles.track}>
                          <div className={styles.fill} style={{ width: `${skill.level}%` }} />
                        </div>
                        <span className={styles.pct}>{skill.level}%</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === 'edit' ? 'Edit Skill' : 'Add Skill'} onClose={() => setModal(null)} onSave={handleSave} saving={saving}>
          <Input label="Skill Name" value={form.name} onChange={v => set('name', v)} required />
          <Input label="Category" value={form.category} onChange={v => set('category', v)} placeholder="e.g. Cloud, Networking, Programming" />
          <label className={styles.checkbox}>
            <input type="checkbox" checked={form.visible} onChange={e => set('visible', e.target.checked)} />
            <span>Visible on portfolio</span>
          </label>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog title="Delete Skill" message="Delete this skill? This cannot be undone." onConfirm={async () => { await remove(deleteId); setDeleteId(null) }} onCancel={() => setDeleteId(null)} />
      )}
    </div>
  )
}

const Spinner = () => <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}><Icon name="spinner" size={28} style={{ animation: 'spin 0.8s linear infinite', color: 'var(--text-muted)' }} /></div>
