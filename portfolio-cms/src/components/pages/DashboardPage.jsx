import { useNavigate } from 'react-router-dom'
import { useCrud } from '../../hooks/useCrud'
import { useProfile } from '../../hooks/useProfile'
import {
  projectService, certService, skillService, experienceService
} from '../../services/portfolioService'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import styles from './DashboardPage.module.css'

const STATS = [
  { key: 'projects',       label: 'Projects',       to: '/projects',       color: '#3b82f6', service: projectService    },
  { key: 'certifications', label: 'Certifications', to: '/certifications', color: '#8b5cf6', service: certService       },
  { key: 'skills',         label: 'Skills',         to: '/skills',         color: '#10b981', service: skillService      },
  { key: 'experience',     label: 'Experience',     to: '/experience',     color: '#f59e0b', service: experienceService },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const { profile }    = useProfile()
  const { items: projects }     = useCrud(projectService)
  const { items: certs }        = useCrud(certService)
  const { items: skills }       = useCrud(skillService)
  const { items: experience }   = useCrud(experienceService)

  const allItems = { projects, certifications: certs, skills, experience }

  return (
    <div>
      <div className={styles.welcome}>
        <div>
          <h1 className={styles.title}>Welcome back{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''}!</h1>
          <p className={styles.subtitle}>Manage your portfolio content from one place</p>
        </div>
        <a
          href="http://localhost:3001"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.previewLink}
        >
          View Portfolio ↗
        </a>
      </div>

      <div className={styles.statsGrid}>
        {STATS.map(stat => {
          const items = allItems[stat.key] || []
          const visible = items.filter(i => i.visible).length
          return (
            <Card key={stat.key} accent={stat.color} onClick={() => navigate(stat.to)} className={styles.statCard}>
              <div className={styles.statBody}>
                <div className={styles.statNum} style={{ color: stat.color }}>{items.length}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statSub}>{visible} visible on portfolio</div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className={styles.panels}>
        <Card className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Recent Projects</h3>
            <button className={styles.seeAll} onClick={() => navigate('/projects')}>See all →</button>
          </div>
          <div className={styles.list}>
            {projects.slice(0, 4).map(p => (
              <div key={p._id} className={styles.listItem}>
                <div>
                  <div className={styles.listItemTitle}>{p.title}</div>
                  <div className={styles.listItemSub}>{p.tech?.slice(0, 3).join(' · ')}</div>
                </div>
                <Badge variant={p.visible ? 'success' : 'default'}>{p.visible ? 'Visible' : 'Hidden'}</Badge>
              </div>
            ))}
            {projects.length === 0 && <p className={styles.empty}>No projects yet</p>}
          </div>
        </Card>

        <Card className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Skills Overview</h3>
            <button className={styles.seeAll} onClick={() => navigate('/skills')}>See all →</button>
          </div>
          <div className={styles.skillList}>
            {skills.map(sk => (
              <div key={sk._id} className={styles.skillRow}>
                <div className={styles.skillMeta}>
                  <span className={styles.skillName}>{sk.name}</span>
                </div>
              </div>
            ))}
            {skills.length === 0 && <p className={styles.empty}>No skills yet</p>}
          </div>
        </Card>
      </div>
    </div>
  )
}
