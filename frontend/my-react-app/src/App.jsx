import React, { createContext, useContext, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import api from './lib/axios'
import Splash from './components/Splash.jsx'
import Navbar from './components/Navbar.jsx'
const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)
const App = () => {
  const [loggedIn, setIsLoggedIn] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const handleLogin = () => {
      setIsLoggedIn(null)
    }
    window.addEventListener('unauthorized', handleLogin)
    return () => window.removeEventListener('unauthorized', handleLogin)
  }, [])

  useEffect(() => {
    let timeout
    const getMe = async () => {
      try {
        const loggedUser = await api.get('/users/me')
        setIsLoggedIn(loggedUser)
      } catch (error) {
        console.log('Error fetching user', error)
      } finally {
        timeout = setTimeout(() => setLoading(false), 3000)
      }
    }
    getMe()
    return () => clearTimeout(timeout)
  }, [])

  if (loading) {
    return <Splash />
  }

  return (
    <AuthContext.Provider value={{ loading, loggedIn, setIsLoggedIn }}>
      <div className="relative w-full flex flex-col flex-nowrap h-screen">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/note/:id"
            element={
              <ProtectedRoute>
                <NoteDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  )
}

export default App
