const path = require('node:path');

const {
    readJson,
    writeJson,
} = require(path.join(process.cwd(), 'utils'));

const notesPath = path.join(process.cwd(), 'src', 'data', 'notes.json');

exports.getAllNotes = async (ownerId) => {
    const notes = await readJson(notesPath);
    return notes.filter(note => note.ownerId === ownerId);
}

exports.getANoteById = async (noteId) => {
    const notes = await readJson(notesPath);
    return notes.find(note => note.id === noteId);
}

exports.addNote = async (noteObject) => {
    const notes = await readJson(notesPath);
    notes.push(noteObject);
    await writeJson(notesPath, notes);
}

exports.changeNote = async (updatedNote) => {
    const notes = await readJson(notesPath);
    const noteId = updatedNote.id;
    const filtered = notes.filter(note => note.id !== noteId);
    filtered.push(updatedNote);
    await writeJson(notesPath, filtered);
}

exports.deleteNote = async (noteId) => {
    const notes = await readJson(notesPath);
    for(let i = 0; i < notes.length; ++i) {
        if(notes[i].id === noteId) {
            notes.splice(i, 1);
            await writeJson(notesPath, notes);
            return true;
        }
    }

    return false;
}