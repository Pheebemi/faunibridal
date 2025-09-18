'use client'

import { createContext, useContext } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { useSupabaseSession } from '@/components/providers/supabase-provider'

interface AuthContextType {
  session: Session | null
  user: User | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { session } = useSupabaseSession()

  const value = {
    session,
    user: session?.user ?? null,
    isLoading: false,
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