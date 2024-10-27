const NoteHistory = require('../../adapters/noteHistorySchema');

class NoteHistoryModel {
    async getNoteHistoryById(noteId) {
        return await NoteHistory.find({ noteId: noteId }).sort({ updatedAt: -1 });
    }
}

module.exports = NoteHistoryModel;