// In-memory Notes model
class Note {
    constructor(title, content) {
        this.id = Note.generateId();
        this.title = title;
        this.content = content;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }

    update(title, content) {
        if (title !== undefined) this.title = title;
        if (content !== undefined) this.content = content;
        this.updatedAt = new Date();
    }
}

// In-memory storage
class NotesStorage {
    constructor() {
        this.notes = [];
        // Add some sample notes
        this.addSampleData();
    }

    addSampleData() {
        const sampleNotes = [
            new Note("Welcome Note", "This is your first note in the Notes API!"),
            new Note("API Guide", "Use POST /api/notes to create, GET /api/notes to list all notes"),
            new Note("Development Tips", "Remember to test each endpoint as you build the application")
        ];
        this.notes = sampleNotes;
    }

    getAllNotes() {
        return this.notes;
    }

    getNoteById(id) {
        return this.notes.find(note => note.id === id);
    }

    createNote(title, content) {
        const note = new Note(title, content);
        this.notes.push(note);
        return note;
    }

    updateNote(id, title, content) {
        const note = this.getNoteById(id);
        if (!note) return null;
        
        note.update(title, content);
        return note;
    }

    deleteNote(id) {
        const index = this.notes.findIndex(note => note.id === id);
        if (index === -1) return null;
        
        return this.notes.splice(index, 1)[0];
    }

    getNotesCount() {
        return this.notes.length;
    }
}

// Create a singleton instance
const notesStorage = new NotesStorage();

module.exports = {
    Note,
    NotesStorage,
    notesStorage
};