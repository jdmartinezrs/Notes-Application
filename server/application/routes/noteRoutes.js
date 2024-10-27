const express = require('express');
const NoteController = require('../../application/controllers/noteController');
const NoteValidator = require("../../application/validator/noteValidator");

const router = express.Router();
const noteController = new NoteController();
const noteValidator = new NoteValidator();

router.post("/notes", noteValidator.createNoteValidator(), (req, res) => noteController.createNoteController(req, res));
router.put("/notes/:id", noteValidator.updateNoteValidator(), (req, res) => noteController.updateNoteController(req, res));

module.exports = router;