const NoteRepository = require('../../domain/repositories/noteRepository');

class NoteService {
    constructor() {
        this.noteRepository = new NoteRepository();
    }

    async createNoteService(noteData) {
        return await this.noteRepository.createNoteRepository(noteData);
    }

    async updateNoteService(noteId, newData) {
        return await this.noteRepository.updateNoteRepository(noteId, newData);
    }
}

module.exports = NoteService;