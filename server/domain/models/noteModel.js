const Note = require("../../adapters/noteSchema");
const NoteHistory = require("../../adapters/noteHistorySchema");

class NoteModel {

    async createNoteModel(noteData) {
        const newNote = new Note(noteData);
        return await newNote.save();
    }


    async getAllNotesModel() {
        return await Note.find().sort({ createdAt: -1 }); 
    }


    async getNoteByIdModel(noteId) {
        const note = await Note.findById(noteId);
        if (!note) throw new Error(JSON.stringify({ status: 404, message: "Note not found" }));
        return note;
    }

    async findNotesByTitleModel(title) {
        try {
            return await Note.find({ title: { $regex: title, $options: 'i' } });
        } catch (error) {
            console.error("Error in findNotesByTitleModel:", error); // Log del error
            throw new Error("Error retrieving notes from database"); // Mensaje de error genérico
        }
    }
    async updateNoteModel(noteId, newData) {
        const note = await Note.findById(noteId);
        if (!note) throw new Error(JSON.stringify({ status: 404, message: "Note not found" }));

        
        const historyEntry = new NoteHistory({
            noteId: noteId,
            title: note.title,
            content: note.content,
            tags: note.tags,
            updatedAt: note.updatedAt 
        });
        await historyEntry.save(); 

        
        note.title = newData.title;
        note.content = newData.content;
        note.tags = newData.tags;

        return await note.save();
    }


    async deleteNoteByIdModel(noteId) {
        const result = await Note.findByIdAndDelete(noteId);
        if (!result) throw new Error(JSON.stringify({ status: 404, message: "Note not found" }));
        return result; 
    }

}

module.exports = NoteModel;