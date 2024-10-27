const NoteModel = require('../../domain/models/noteModel');

class NoteRepository {

    async createNoteRepository(noteData) {
        try {
            return await new NoteModel().createNoteModel(noteData);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error creating note' }));
        }
    }

    async getAllNotesRepository() {
        try {
            return await new NoteModel().getAllNotesModel();
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error retrieving notes' }));
        }
    }

    async getNoteByIdRepository(noteId) {
        try {
            return await new NoteModel().getNoteByIdModel(noteId);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error retrieving note' }));
        }
    }


    async updateNoteRepository(noteId, newData) {
        try {
            return await new NoteModel().updateNoteModel(noteId, newData);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating note' }));
        }
    }

    async deleteNoteByIdRepository(noteId) {
        try {
            return await new NoteModel().deleteNoteByIdModel(noteId);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error deleting note' }));
        }
    }


}

module.exports = NoteRepository;