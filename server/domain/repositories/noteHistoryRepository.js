const NoteHistoryModel = require('../models/noteHistoryModel');

class NoteHistoryRepository {
    async getNoteHistoryRepository(noteId) {
        try {
            return await new NoteHistoryModel().getNoteHistoryById(noteId);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error retrieving note history' }));
        }
    }
}

module.exports = NoteHistoryRepository;