const mongoose = require('mongoose');

const noteHistorySchema = new mongoose.Schema({
  noteId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Note' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NoteHistory', noteHistorySchema, 'noteHistories');