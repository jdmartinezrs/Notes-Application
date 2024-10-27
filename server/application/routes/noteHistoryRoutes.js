const express = require('express');
const NoteHistoryController = require('../controllers/noteHistoryController');
const NoteHistoryValidator = require("../validator/noteHistoryValidator");

const router = express.Router();
const noteHistoryController = new NoteHistoryController();
const noteHistoryValidator = new NoteHistoryValidator();

router.get("/notes/:id/history", noteHistoryValidator.getNoteHistoryValidator(), (req, res) => noteHistoryController.getNoteHistoryController(req, res));

module.exports = router;