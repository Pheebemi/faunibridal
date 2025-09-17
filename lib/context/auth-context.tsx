'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { getSession, getCurrentUser } from '@/lib/supabase/auth'

interface AuthContextType {
  session: Session | null
  user: User | null
  isLoading: boolean
  checkUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  checkUser: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkUser = useCallback(async () => {
    try {
      const session = await getSession()
      const user = await getCurrentUser()
      setSession(session)
      setUser(user)
    } catch (error) {
      setSession(null)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkUser()
  }, [checkUser])

  const value = {
    session,
    user,
    isLoading,
    checkUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}