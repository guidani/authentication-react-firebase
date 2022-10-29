import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

const PrivateRoute = ({children}) => {
  const auth = useAuth()

  return (
    auth?.currentUser ? children : <Navigate to={"/signin"}/>
  )
}

export default PrivateRoute