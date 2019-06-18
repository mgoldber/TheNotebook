const Note = require('./notesModel');

exports.listNotes = async () => {
    try {
        const notes = await Note.find({});
        return notes;
    } catch (e) {
        throw e;
    }
}