const { notesStorage } = require('../models/notesModel');

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getAllNotes = (req, res) => {
    try {
        const notes = notesStorage.getAllNotes();
        console.log(`📖 Retrieved ${notes.length} notes`);
        
        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes
        });
    } catch (error) {
        console.error('❌ Error fetching notes:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Public
const getNoteById = (req, res) => {
    try {
        const note = notesStorage.getNoteById(req.params.id);
        
        if (!note) {
            console.log(`❌ Note not found with id: ${req.params.id}`);
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }
        
        console.log(`📝 Retrieved note: ${note.title}`);
        res.status(200).json({
            success: true,
            data: note
        });
    } catch (error) {
        console.error('❌ Error fetching note:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Create new note
// @route   POST /api/notes
// @access  Public
const createNote = (req, res) => {
    try {
        const { title, content } = req.body;
        
        // Validation
        if (!title || !content) {
            console.log('❌ Validation failed: Title and content are required');
            return res.status(400).json({
                success: false,
                message: 'Please provide both title and content'
            });
        }
        
        const note = notesStorage.createNote(title, content);
        console.log(`✅ Created new note: ${note.title} (ID: ${note.id})`);
        
        res.status(201).json({
            success: true,
            data: note
        });
    } catch (error) {
        console.error('❌ Error creating note:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Public
const updateNote = (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;
        
        const updatedNote = notesStorage.updateNote(id, title, content);
        
        if (!updatedNote) {
            console.log(`❌ Note not found with id: ${id}`);
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }
        
        console.log(`🔄 Updated note: ${updatedNote.title} (ID: ${id})`);
        res.status(200).json({
            success: true,
            data: updatedNote
        });
    } catch (error) {
        console.error('❌ Error updating note:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Public
const deleteNote = (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = notesStorage.deleteNote(id);
        
        if (!deletedNote) {
            console.log(`❌ Note not found with id: ${id}`);
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }
        
        console.log(`🗑️  Deleted note: ${deletedNote.title} (ID: ${id})`);
        res.status(200).json({
            success: true,
            message: 'Note deleted successfully',
            data: deletedNote
        });
    } catch (error) {
        console.error('❌ Error deleting note:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};