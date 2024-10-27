const { body, query } = require("express-validator");

class NoteValidator {
    createNoteValidator = () => [
        body('title').notEmpty().withMessage('Title is required'),
        body('content').notEmpty().withMessage('Content is required'),
        body('tags').isArray().optional().withMessage('Tags must be an array')
    ];

    updateNoteValidator = () => [
        body('title').optional().notEmpty().withMessage('Title must not be empty'),
        body('content').optional().notEmpty().withMessage('Content must not be empty'),
        body('tags').optional().isArray().withMessage('Tags must be an array'),
        query().custom((value, { req }) => {
            if (Object.keys(req.query).length > 0) throw new Error('Do not send query parameters');
            return true;
        })
    ];
}

module.exports = NoteValidator;