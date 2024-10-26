const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre_usuario: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  contrasena_hash: {
    type: String,
    required: true,
  },
  fecha_y_hora_de_inicio_de_sesion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: true, updatedAt: 'updatedAt' } 
});

module.exports = mongoose.model('User', userSchema, 'usuarios');
