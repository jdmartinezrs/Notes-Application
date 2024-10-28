const express = require('express');
const NoteController = require('../../application/controllers/noteController');
const NoteValidator = require("../../application/validator/noteValidator");
const {auth} = require("../../application/middleware/authenticateToken")
const router = express.Router();
const noteController = new NoteController();
const noteValidator = new NoteValidator();

router.post("/notes", noteValidator.createNoteValidator(), (req, res) => noteController.createNoteController(req, res));
router.get("/notes", noteValidator.getAllNotesValidator(), (req, res) => noteController.getAllNotesController(req, res)); 
router.get("/notes/:id", noteValidator.getNoteByIdValidator(), (req, res) => noteController.getNoteByIdController(req, res)); 
router.get("/notes/search/title", noteValidator.searchNoteByTitleValidator(), (req, res) => noteController.findNotesByTitleController(req, res)); 
router.put("/notes/:id", noteValidator.updateNoteValidator(), (req, res) => noteController.updateNoteController(req, res));
router.delete("/notes/:id", noteValidator.deleteNoteByIdValidator(), (req, res) => noteController.deleteNoteController(req, res)); 


module.exports = router;