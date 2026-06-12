import { createContext, useContext, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const AuthContext = createContext(null)

const USERS = {
  admin: {
    email: 'admin@devna.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'hr_manager',
    avatar: 'AU',
    label: 'Admin'
  },
  super: {
    email: 'super@devna.com',
    password: 'super123',
    name: 'Super Admin',
    role: 'super_admin',
    avatar: 'SA',
    label: 'Super Admin'
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('devna_user')
    return saved ? JSON.parse(saved) : null
  })
  const [activeSession, setActiveSession] = useState(() => {
    return localStorage.getItem('devna_super_session') || null
  })

  const login = (email, password) => {
    const found = Object.values(USERS).find(u => u.email === email && u.password === password)
    if (found) {
      if (found.role === 'super_admin') {
        const existing = localStorage.getItem('devna_super_session')
        if (existing) {
          return 'Another super admin session already active on another device. Security policy prevents multiple simultaneous logins.'
        }
        const sessionId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2)
        localStorage.setItem('devna_super_session', sessionId)
        setActiveSession(sessionId)
      }
      const userData = { name: found.name, email: found.email, role: found.role, avatar: found.avatar }
      localStorage.setItem('devna_user', JSON.stringify(userData))
      localStorage.setItem('devna_role', found.role)
      setUser(userData)
      return null
    }
    return 'Invalid email or password'
  }

  const logout = () => {
    if (user?.role === 'super_admin') {
      localStorage.removeItem('devna_super_session')
      setActiveSession(null)
    }
    localStorage.removeItem('devna_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, activeSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}
