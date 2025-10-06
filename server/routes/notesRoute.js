const express = require('express');
const {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
} = require('../controllers/notesController');

const router = express.Router();

// Routes
router.route('/')
    .get(getAllNotes)       // GET /api/notes - Get all notes
    .post(createNote);      // POST /api/notes - Create a new note

router.route('/:id')
    .get(getNoteById)       // GET /api/notes/:id - Get a specific note
    .put(updateNote)        // PUT /api/notes/:id - Update a note
    .delete(deleteNote);    // DELETE /api/notes/:id - Delete a note

module.exports = router;