const Note = require("../../adapters/noteSchema");

class NoteModel {

    async createNoteModel(noteData) {
        const newNote = new Note(noteData);
        return await newNote.save();
    }

    async updateNoteModel(noteId, newData) {
        const note = await Note.findById(noteId);
        if (!note) throw new Error(JSON.stringify({ status: 404, message: "Note not found" }));

        // Agregar versión actual al historial
        note.history.push({
            title: note.title,
            content: note.content,
            updatedAt: note.updatedAt
        });

        // Actualizar con los nuevos datos
        note.title = newData.title;
        note.content = newData.content;
       

        return await note.save();
    }
}

module.exports = NoteModel;