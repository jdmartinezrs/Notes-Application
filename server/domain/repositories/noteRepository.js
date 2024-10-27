const NoteModel = require('../../domain/models/noteModel');

class NoteRepository {

    async createNoteRepository(noteData) {
        try {
            return await new NoteModel().createNoteModel(noteData);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error creating note' }));
        }
    }

    async updateNoteRepository(noteId, newData) {
        try {
            return await new NoteModel().updateNoteModel(noteId, newData);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating note' }));
        }
    }
}

module.exports = NoteRepository;