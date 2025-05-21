const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// 📝 In-memory storage
let notes = [];

// ✅ [GET] Get all notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// ✅ [POST] Create new note
app.post('/api/notes', (req, res) => {
    const { text } = req.body;
    const newNote = { id: uuidv4(), text };
    notes.push(newNote);
    res.status(201).json(newNote);
});

// ✅ [DELETE] Delete note by id
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    notes = notes.filter(note => note.id !== id);
    res.status(204).end();
});

// ✅ [PUT] Update note by id (optional)
app.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const note = notes.find(n => n.id === id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    note.text = text;
    res.json(note);
});

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(PORT, () => {
    console.log(`✅ Backend running at http://localhost:${PORT}`);
});
