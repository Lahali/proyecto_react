import React from 'react'
import { useAuth } from './context/AuthContext'

export function ProtectedRoute  ({children}) {
 const {user} = useAuth()
  
  
    return <>{children}</>
  
}