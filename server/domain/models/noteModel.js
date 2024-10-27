const Note = require("../../adapters/noteSchema");

class NoteModel {

    async createNoteModel(noteData) {
        const newNote = new Note(noteData);
        return await newNote.save();
    }


    async getAllNotesModel() {
        return await Note.find(); 
    }


    async getNoteByIdModel(noteId) {
        const note = await Note.findById(noteId);
        if (!note) throw new Error(JSON.stringify({ status: 404, message: "Note not found" }));
        return note;
    }

    async updateNoteModel(noteId, newData) {
        const note = await Note.findById(noteId);
        if (!note) throw new Error(JSON.stringify({ status: 404, message: "Note not found" }));

        note.history.push({
            title: note.title,
            content: note.content,
            updatedAt: note.updatedAt
        });

        note.title = newData.title;
        note.content = newData.content;
       
        return await note.save();
    }

    
    async deleteNoteByIdModel(noteId) {
        const result = await Note.findByIdAndDelete(noteId);
        if (!result) throw new Error(JSON.stringify({ status: 404, message: "Note not found" }));
        return result; 
    }

}

module.exports = NoteModel;