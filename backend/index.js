const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Note = require('./models/Note');

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ เปิด CORS ให้ frontend access ได้
app.use(cors({
    origin: 'https://tesrfont-bankend.onrender.com', // ✅ ใส่ URL frontend ของคุณ
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// ✅ middleware
app.use(express.json());

// ✅ เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ CRUD Routes

// [GET] /api/notes
app.get('/api/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

// [POST] /api/notes
app.post('/api/notes', async (req, res) => {
    const { text } = req.body;
    const note = new Note({ text });
    await note.save();
    res.status(201).json(note);
});

// [DELETE] /api/notes/:id
app.delete('/api/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

// [PUT] /api/notes/:id
app.put('/api/notes/:id', async (req, res) => {
    const { text } = req.body;
    const updated = await Note.findByIdAndUpdate(
        req.params.id,
        { text },
        { new: true }
    );
    res.json(updated);
});

// (optional) root route
app.get('/', (req, res) => {
    res.send('🟢 Backend is running.');
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
