const mongoose = require('mongoose');

const noteHistorySchema = new mongoose.Schema({
  title: String,
  content: String,
});

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, {
  timestamps: { createdAt: true, updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('Note', noteSchema, 'notes');