import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/axios'

// import api from '../lib/axios'
import { useAuthContext } from '../App'
const RegisterPage = () => {
  const { loggedIn, setIsLoggedIn } = useAuthContext()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('All fields are required')
      return
    }
    setLoading(true)

    try {
      const registeredUser = await api.post('/users/register', {
        name,
        email,
        password,
      })
      toast.success('User registered successfully')
      setIsLoggedIn(registeredUser)
    } catch (error) {
      console.log('Error registering user', error)
      if (error.response.status === 429) {
        toast.error("Slow down! You're attempting register requests too fast", {
          duration: 4000,
          icon: '💀',
        })
      } else {
        toast.error('Failed to register')
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                Join ThinkBoard today
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Password"
                    className="input input-bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end py-5">
                  <button
                    type="submit"
                    to={'/register'}
                    className="btn btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? 'Creating new account...' : 'Create new account'}
                  </button>
                </div>
              </form>
              <div className="card-actions justify-end py-5">
                <Link
                  to={'/login'}
                  className="btn btn-outline btn-primary w-full"
                  disabled={loading}
                >
                  {'Have an account already'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
