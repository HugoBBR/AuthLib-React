/* eslint-disable prettier/prettier */
import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Authprovider context undifined')
  }

  return context
}
