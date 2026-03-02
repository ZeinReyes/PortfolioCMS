import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
  }, [])

  const removeToast = useCallback((id) => setToasts(prev => prev.filter(t => t.id !== id)), [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.length > 0 && (
        <div style={{ position:'fixed', bottom:24, right:24, zIndex:9999, display:'flex', flexDirection:'column', gap:8 }}>
          {toasts.map(t => {
            const colors = { success:'#10b981', error:'#ef4444', warning:'#f59e0b', info:'#3b82f6' }
            return (
              <div key={t.id} className="animate-toast" onClick={() => removeToast(t.id)}
                style={{ padding:'11px 16px', borderRadius:10, background: colors[t.type] || colors.info,
                  color:'#fff', fontWeight:600, fontSize:13.5, boxShadow:'0 8px 24px rgba(0,0,0,0.25)',
                  cursor:'pointer', display:'flex', alignItems:'center', gap:8, maxWidth:300,
                  fontFamily:'inherit' }}>
                <span style={{ fontSize:15 }}>
                  {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}
                </span>
                {t.message}
              </div>
            )
          })}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
