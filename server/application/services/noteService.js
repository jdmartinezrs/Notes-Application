const NoteRepository = require('../../domain/repositories/noteRepository');

class NoteService {
    constructor() {
        this.noteRepository = new NoteRepository();
    }

    async createNoteService(noteData) {
        return await this.noteRepository.createNoteRepository(noteData);
    }

    async getAllNotesService() {
        return await this.noteRepository.getAllNotesRepository();
    }

    async getNoteByIdService(noteId) {
        return await this.noteRepository.getNoteByIdRepository(noteId);
    }

    async updateNoteService(noteId, newData) {
        return await this.noteRepository.updateNoteRepository(noteId, newData);
    }

    async deleteNoteService(noteId) {
        return await this.noteRepository.deleteNoteByIdRepository(noteId);
    }

}

module.exports = NoteService;