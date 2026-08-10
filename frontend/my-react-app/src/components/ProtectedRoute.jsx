import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

import { useAuthContext } from '../App.jsx'

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login')
    }
  }, [loggedIn])

  if (loggedIn) {
    return children
  }
}

export default ProtectedRoute
