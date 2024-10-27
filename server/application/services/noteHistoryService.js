const NoteHistoryRepository = require('../../domain/repositories/noteHistoryRepository');

class NoteHistoryService {
    constructor() {
        this.noteHistoryRepository = new NoteHistoryRepository();
    }

    async getNoteHistoryService(noteId) {
        return await this.noteHistoryRepository.getNoteHistoryRepository(noteId);
    }
}

module.exports = NoteHistoryService;