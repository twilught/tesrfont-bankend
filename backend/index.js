const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // โหลด .env
const Note = require('./models/Note');

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ เชื่อม MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ API Routes
app.get('/api/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post('/api/notes', async (req, res) => {
    const { text } = req.body;
    const note = new Note({ text });
    await note.save();
    res.status(201).json(note);
});

app.delete('/api/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

app.put('/api/notes/:id', async (req, res) => {
    const { text } = req.body;
    const updated = await Note.findByIdAndUpdate(req.params.id, { text }, { new: true });
    res.json(updated);
});

// (optional) ทดสอบ root
app.get('/', (req, res) => {
    res.send('🟢 Backend is running');
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
