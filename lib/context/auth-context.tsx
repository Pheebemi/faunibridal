'use client'

import { createContext, useContext } from 'react'

interface AuthContextType {
  session: null
  user: null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const value = {
    session: null,
    user: null,
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