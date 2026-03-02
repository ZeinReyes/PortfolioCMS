import { useState } from 'react'
import { useCrud } from '../../hooks/useCrud'
import { projectService } from '../../services/portfolioService'
import PageHeader from '../ui/PageHeader'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import ConfirmDialog from '../ui/ConfirmDialog'
import Input from '../ui/Input'
import EmptyState from '../ui/EmptyState'
import Icon from '../ui/Icon'
import styles from './ProjectsPage.module.css'

const EMPTY_FORM = { title: '', description: '', tech: '', liveUrl: '', githubUrl: '', visible: true, featured: false }

export default function ProjectsPage() {
  const { items, loading, saving, create, update, remove, toggleVisibility } = useCrud(projectService)
  const [modal, setModal]     = useState(null) // null | 'add' | 'edit'
  const [form, setForm]       = useState(EMPTY_FORM)
  const [deleteId, setDeleteId] = useState(null)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const openAdd  = () => { setForm(EMPTY_FORM); setModal('add') }
  const openEdit = (item) => { setForm({ ...item, tech: item.tech?.join(', ') || '' }); setModal('edit') }
  const closeModal = () => setModal(null)

  const handleSave = async () => {
    const payload = { ...form, tech: form.tech.split(',').map(t => t.trim()).filter(Boolean) }
    const ok = modal === 'edit' ? await update(form._id, payload) : await create(payload)
    if (ok) closeModal()
  }

  const handleDelete = async () => {
    await remove(deleteId)
    setDeleteId(null)
  }

  if (loading) return <LoadingPage />

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle={`${items.length} total · ${items.filter(p => p.visible).length} visible`}
        action={openAdd}
        actionLabel="Add Project"
      />

      {items.length === 0 ? (
        <EmptyState icon="projects" title="No projects yet" description="Showcase your work by adding your first project." action={openAdd} actionLabel="Add Project" />
      ) : (
        <div className={styles.grid}>
          {items.map(project => (
            <Card key={project._id} className={styles.card}>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <div className={styles.cardMeta}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <div className={styles.badges}>
                      <Badge variant={project.visible ? 'success' : 'default'}>{project.visible ? 'Visible' : 'Hidden'}</Badge>
                      {project.featured && <Badge variant="warning">Featured</Badge>}
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <Button variant="ghost" size="icon" onClick={() => toggleVisibility(project._id)} title={project.visible ? 'Hide' : 'Show'}>
                      <Icon name={project.visible ? 'eye' : 'eyeOff'} size={15} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(project)}>
                      <Icon name="edit" size={15} />
                    </Button>
                    <Button variant="danger" size="icon" onClick={() => setDeleteId(project._id)}>
                      <Icon name="trash" size={15} />
                    </Button>
                  </div>
                </div>
                <p className={styles.desc}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tech?.map(t => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <div className={styles.links}>
                  {project.liveUrl   && <a href={project.liveUrl}   target="_blank" rel="noopener noreferrer" className={styles.link}><Icon name="link" size={13} /> Live</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}><Icon name="github" size={13} /> GitHub</a>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === 'edit' ? 'Edit Project' : 'Add Project'} onClose={closeModal} onSave={handleSave} saving={saving}>
          <Input label="Project Title" value={form.title} onChange={v => set('title', v)} required />
          <Input label="Description" value={form.description} onChange={v => set('description', v)} multiline required />
          <Input label="Tech Stack" value={form.tech} onChange={v => set('tech', v)} placeholder="React, Node.js, MongoDB" helpText="Comma-separated list of technologies" />
          <Input label="Live URL" value={form.liveUrl} onChange={v => set('liveUrl', v)} placeholder="https://..." />
          <Input label="GitHub URL" value={form.githubUrl} onChange={v => set('githubUrl', v)} placeholder="https://github.com/..." />
          <div className={styles.checkboxRow}>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={form.visible} onChange={e => set('visible', e.target.checked)} />
              <span>Visible on portfolio</span>
            </label>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
              <span>Featured project</span>
            </label>
          </div>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete Project"
          message="Are you sure you want to delete this project? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  )
}

function LoadingPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
      <Icon name="spinner" size={28} style={{ animation: 'spin 0.8s linear infinite', color: 'var(--text-muted)' }} />
    </div>
  )
}
