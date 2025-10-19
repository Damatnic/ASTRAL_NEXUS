'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserNote, addNote, getGuideNotes, db } from '@/lib/db'

interface NoteTakingProps {
  guideSlug: string
  guideSections?: string[]
}

export default function NoteTaking({ guideSlug, guideSections = [] }: NoteTakingProps) {
  const [notes, setNotes] = useState<UserNote[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [selectedSection, setSelectedSection] = useState('')
  const [highlightText, setHighlightText] = useState('')
  const [noteTags, setNoteTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    loadNotes()
    
    // Listen for text selection (highlighting)
    document.addEventListener('mouseup', handleTextSelection)
    return () => document.removeEventListener('mouseup', handleTextSelection)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guideSlug])

  const loadNotes = async () => {
    const guideNotes = await getGuideNotes(guideSlug)
    setNotes(guideNotes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
  }

  const handleTextSelection = () => {
    const selection = window.getSelection()
    const text = selection?.toString().trim()
    if (text && text.length > 3) {
      setHighlightText(text)
    }
  }

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    await addNote({
      guideSlug,
      content: newNote,
      highlight: highlightText,
      section: selectedSection,
      tags: noteTags,
    })

    setNewNote('')
    setHighlightText('')
    setNoteTags([])
    setIsAdding(false)
    loadNotes()
  }

  const handleDeleteNote = async (id: number) => {
    await db.userNotes.delete(id)
    loadNotes()
  }

  const addTag = () => {
    if (tagInput.trim() && !noteTags.includes(tagInput.trim())) {
      setNoteTags([...noteTags, tagInput.trim()])
      setTagInput('')
    }
  }

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">
          <span className="text-primary">Notes</span> & Highlights
        </h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn-primary"
        >
          {isAdding ? 'Cancel' : '+ New Note'}
        </button>
      </div>

      {/* Add Note Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-6 rounded-lg bg-white/5 border border-primary/30"
          >
            {highlightText && (
              <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <div className="text-xs text-yellow-400 mb-1">Highlighted Text:</div>
                <div className="text-sm text-gray-300 italic">&ldquo;{highlightText}&rdquo;</div>
              </div>
            )}

            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write your note here..."
              className="w-full px-4 py-3 rounded-lg glass-card text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4 min-h-[120px]"
            />

            <div className="mb-4">
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-4 py-2 rounded-lg glass-card text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">General Note</option>
                {guideSections.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add tags..."
                  className="flex-1 px-4 py-2 rounded-lg glass-card text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button onClick={addTag} className="btn-secondary">
                  Add Tag
                </button>
              </div>
              {noteTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {noteTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => setNoteTags(noteTags.filter((_, i) => i !== idx))}
                        className="hover:text-accent"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button onClick={handleAddNote} className="btn-primary w-full">
              Save Note
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">📝</div>
            <p>No notes yet. Start taking notes to remember key insights!</p>
          </div>
        ) : (
          notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6"
            >
              {note.highlight && (
                <div className="mb-3 p-3 bg-yellow-500/10 border-l-4 border-yellow-500 rounded">
                  <div className="text-xs text-yellow-400 mb-1">Highlight:</div>
                  <div className="text-sm italic text-gray-300">&ldquo;{note.highlight}&rdquo;</div>
                </div>
              )}

              <p className="text-gray-200 mb-3 leading-relaxed">{note.content}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  {note.section && (
                    <span className="text-primary">📍 {note.section}</span>
                  )}
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex gap-2">
                      {note.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  {note.id && (
                    <button
                      onClick={() => handleDeleteNote(note.id!)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

