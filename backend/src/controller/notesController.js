import Note from '../models/Note.js'

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 }) // -1 means descending order, so the most recent notes will be returned first
    res.status(200).json(notes)
  } catch (err) {
    console.error('Error in getAllNotes controller', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getNoteById(req, res) {
  try {
    const { id } = req.params
    const note = await Note.findById(id)

    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Note not found' })
    }

    res.status(200).json(note)
  } catch (err) {
    console.error('Error in getNoteById controller', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body
    const note = new Note({ title, content, user: req.user.id })
    // const note = new Note({ title, content })
    const newNote = await note.save()
    res.status(201).json(newNote)
  } catch (err) {
    console.error('Error in createNote controller', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function updateNote(req, res) {
  try {
    const { id } = req.params
    const { title, content } = req.body
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
    )
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' })
    }
    res.status(200).json(updatedNote)
  } catch (err) {
    console.error('Error in updateNote controller', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params
    const deletedNote = await Note.findByIdAndDelete(id)
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' })
    }
    res.status(200).json({ message: 'Note deleted successfully' })
  } catch (err) {
    console.error('Error in deleteNote controller', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}
