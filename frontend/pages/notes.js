import { useEffect, useState } from 'react';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [input, setInput] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/notes`;

    // 📥 โหลดโน้ตจาก backend
    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setNotes(data));
    }, []);

    // ➕ เพิ่มโน้ต
    const addNote = async () => {
        if (!input.trim()) return;
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });
        const newNote = await res.json();
        setNotes([...notes, newNote]);
        setInput('');
    };

    // ❌ ลบโน้ต
    const deleteNote = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        setNotes(notes.filter(note => note._id !== id));
    };

    // 📝 แก้ไขโน้ต
    const saveEdit = async (id) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: editText })
        });
        const updatedNote = await res.json();
        setNotes(notes.map(note => note._id === id ? updatedNote : note));
        setEditingId(null);
        setEditText('');
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>📝 Notes</h1>

            <div style={{ marginBottom: '1rem' }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="เขียนโน้ต..."
                />
                <button onClick={addNote}>เพิ่ม</button>
            </div>

            <ul>
                {notes.map((note) => (
                    <li key={note._id} style={{ marginBottom: '0.5rem' }}>
                        {editingId === note._id ? (
                            <>
                                <input
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button onClick={() => saveEdit(note._id)}>บันทึก</button>
                                <button onClick={() => setEditingId(null)}>ยกเลิก</button>
                            </>
                        ) : (
                            <>
                                {note.text}
                                <button onClick={() => {
                                    setEditingId(note._id);
                                    setEditText(note.text);
                                }}>✏️</button>
                                <button onClick={() => deleteNote(note._id)}>🗑</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
