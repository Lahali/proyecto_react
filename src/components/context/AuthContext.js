import React, { createContext, useContext } from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase/firebaseConfig'

const authContext = createContext()

// hook personalizado
export function useAuth() {
  return useContext(authContext)
}

export const AuthProvider = ({children}) => {

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)


  return (
   <authContext.Provider value={{signup}}>
    {children}
   </authContext.Provider>
  )
}

