import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import AppLayout from './components/layout/AppLayout'
import LoginPage from './components/pages/LoginPage'
import DashboardPage from './components/pages/DashboardPage'
import ProjectsPage from './components/pages/ProjectsPage'
import CertificationsPage from './components/pages/CertificationsPage'
import SkillsPage from './components/pages/SkillsPage'
import ExperiencePage from './components/pages/ExperiencePage'
import ProfilePage from './components/pages/ProfilePage'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index             element={<DashboardPage />} />
        <Route path="projects"       element={<ProjectsPage />} />
        <Route path="certifications" element={<CertificationsPage />} />
        <Route path="skills"         element={<SkillsPage />} />
        <Route path="experience"     element={<ExperiencePage />} />
        <Route path="profile"        element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
