import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { Plus, Trash2, StickyNote } from 'lucide-react';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: '', content: '', tags: '' });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await axios.get('/notes');
            setNotes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addNote = async (e) => {
        e.preventDefault();
        if (!newNote.title || !newNote.content) return;

        const tagsArray = newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

        try {
            const res = await axios.post('/notes', { ...newNote, tags: tagsArray });
            setNotes([res.data, ...notes]);
            setNewNote({ title: '', content: '', tags: '' });
            setIsAdding(false);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`/notes/${id}`);
            setNotes(notes.filter((n) => n._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Notes</h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                    <Plus size={18} /> New Note
                </button>
            </div>

            {isAdding && (
                <div className="mb-8 bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-neutral-700">
                    <form onSubmit={addNote} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                            <input
                                type="text"
                                value={newNote.title}
                                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-neutral-700 dark:text-white"
                                placeholder="Note Title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                            <textarea
                                value={newNote.content}
                                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 h-32 dark:bg-neutral-700 dark:text-white"
                                placeholder="Write your thoughts..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label>
                            <input
                                type="text"
                                value={newNote.tags}
                                onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-neutral-700 dark:text-white"
                                placeholder="ideas, work, important"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-700 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700"
                            >
                                Save Note
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <div key={note._id} className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-gray-200 dark:border-neutral-700 hover:shadow-md transition-shadow relative group">
                        <button
                            onClick={() => deleteNote(note._id)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={18} />
                        </button>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{note.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 whitespace-pre-wrap">{note.content}</p>
                        <div className="flex flex-wrap gap-2">
                            {note.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 text-xs rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <div className="mt-4 text-xs text-gray-400 flex items-center gap-1">
                            <StickyNote size={12} />
                            {new Date(note.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
            {notes.length === 0 && !isAdding && (
                <div className="text-center py-12 text-gray-400">
                    No notes yet. Create one!
                </div>
            )}
        </div>
    );
};

export default NoteList;
