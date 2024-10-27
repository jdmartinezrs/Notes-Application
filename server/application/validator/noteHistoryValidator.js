const { param } = require('express-validator');

class NoteHistoryValidator {
    getNoteHistoryValidator = () => [
        param('id')
            .isMongoId()
            .withMessage('Invalid note ID format') // Validar que sea un ID de MongoDB válido
    ];
}

module.exports = NoteHistoryValidator;