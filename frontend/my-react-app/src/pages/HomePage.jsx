import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { LoaderIcon, PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'
import { useAuthContext } from '../App.jsx'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const { setIsLoggedIn } = useAuthContext()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes')
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log('Error fetching notes')
        if (error?.response?.status === 429) {
          setIsRateLimited(true)
        } else if (error?.response?.status === 401) {
          toast.error('Failed to load page - Access denied')
          setIsLoggedIn(null)
        } else {
          toast.error('Failed to load notes')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-4">
            <Link to={'/create'} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto">
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
