'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

interface SupabaseContext {
  session: Session | null
}

const Context = createContext<SupabaseContext>({ session: null })

export default function SupabaseProvider({ 
  children,
  initialSession,
}: { 
  children: React.ReactNode
  initialSession: Session | null
}) {
  const [session, setSession] = useState<Session | null>(initialSession)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Context.Provider value={{ session }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabaseSession = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useSupabaseSession must be used within a SupabaseProvider')
  }
  return context
}