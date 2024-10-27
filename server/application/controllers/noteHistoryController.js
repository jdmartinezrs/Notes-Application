const NoteHistoryService = require('../services/noteHistoryService');
const { validationResult } = require('express-validator');

class NoteHistoryController {
    constructor() {
        this.noteHistoryService = new NoteHistoryService();
    }

    async getNoteHistoryController(req, res) {
        try {
            const noteId = req.params.id; // Obtiene el ID de la nota desde los parámetros
            const history = await this.noteHistoryService.getNoteHistoryService(noteId);
            res.json(history);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
}

module.exports = NoteHistoryController;