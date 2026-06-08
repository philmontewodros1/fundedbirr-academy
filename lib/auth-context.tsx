'use client'
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type User = {
  id: string
  email: string
  full_name: string
  is_admin: boolean
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<string | null>
  register: (fullName: string, email: string, phone: string, password: string) => Promise<string | null>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>(null!)

function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('fb_academy_token')
}

function setToken(t: string | null) {
  if (typeof window === 'undefined') return
  if (t) localStorage.setItem('fb_academy_token', t)
  else localStorage.removeItem('fb_academy_token')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const token = getToken()
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      const res = await fetch('/api/auth/session', {
        headers: { authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setUser(data.user || null)
    } catch {
      setUser(null)
      setToken(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const login = async (email: string, password: string): Promise<string | null> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) return data.error || 'Login failed'
    setToken(data.session.access_token)
    setUser(data.user)
    return null
  }

  const register = async (fullName: string, email: string, phone: string, password: string): Promise<string | null> => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, phone, password }),
    })
    const data = await res.json()
    if (!res.ok) return data.error || 'Registration failed'
    return null
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
