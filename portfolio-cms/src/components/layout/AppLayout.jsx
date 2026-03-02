import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={styles.root}>
      <Sidebar open={sidebarOpen} />
      <div className={styles.main}>
        <Header onMenuToggle={() => setSidebarOpen(v => !v)} />
        <main className={styles.content}>
          <div className="animate-fadeInUp">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
