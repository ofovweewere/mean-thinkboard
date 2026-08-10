import React from 'react'
import { Link, useNavigate } from 'react-router'
import { PlusIcon } from 'lucide-react'

import { useAuthContext } from '../App'
import api from '../lib/axios'

const Navbar = () => {
  const { loggedIn, setIsLoggedIn } = useAuthContext()
  const navigate = useNavigate()
  const handleLogout = async (e) => {
    e.preventDefault()

    if (!window.confirm('Are you sure you want to Logout?')) {
      return
    }

    try {
      const loggedOut = await api.post('/users/logout')
    } catch (error) {
      console.log('Error logging out', error)
    } finally {
      setIsLoggedIn(null)
      setLoading(false)
      Navigate('/')
    }
  }
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
            ThinkBoard
          </h1>
          {loggedIn && (
            <div className="flex items-center gap-4">
              <button
                className="btn btn-outline btn-error"
                onClick={handleLogout}
              >
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
