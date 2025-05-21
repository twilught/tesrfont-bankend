import { useEffect, useState } from 'react';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [input, setInput] = useState('');

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/notes`;

    // 📥 Load notes
    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setNotes(data));
    }, []);

    // ➕ Create note
    const addNote = async () => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });
        const newNote = await res.json();
        setNotes((prev) => [...prev, newNote]);
        setInput('');
    };

    // ❌ Delete note
    const deleteNote = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        setNotes((prev) => prev.filter((note) => note.id !== id));
    };

    return (
        <div>
            <h1>📝 Notes</h1>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write something..."
            />
            <button onClick={addNote}>Add</button>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        {note.text}
                        <button onClick={() => deleteNote(note.id)}>🗑</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
