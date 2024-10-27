const NoteService = require('../services/noteService');
const { validationResult } = require('express-validator');

class NoteController {
    constructor() {
        this.noteService = new NoteService();
    }

    async createNoteController(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const note = await this.noteService.createNoteService(req.body);
            res.status(201).json(note);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getAllNotesController(req, res) {
        try {
            const notes = await this.noteService.getAllNotesService();
            res.json(notes);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getNoteByIdController(req, res) {
        try {
            const note = await this.noteService.getNoteByIdService(req.params.id);
            res.json(note);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }


    async updateNoteController(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const note = await this.noteService.updateNoteService(req.params.id, req.body);
            res.json(note);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteNoteController(req, res) {
        try {
            await this.noteService.deleteNoteService(req.params.id);
            res.status(204).send(); 
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

}

module.exports = NoteController;