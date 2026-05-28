const path = require('node:path');

const {
    AppError,
    generateId
} = require(path.join(process.cwd(), 'utils'));

const {
    getAllNotes,
    getANoteById,
    addNote,
    changeNote,
    deleteNote
} = require(path.join(process.cwd(), 'src', 'models', 'note.model'));

exports.listNotes = async (ownerId, tag) => {
    const notes = await getAllNotes(ownerId);
    if(!notes.length) throw new AppError('notes not found', 404);

    if(!tag) return notes;

    const filtered = notes.filter(note => note.tags.includes(tag));
    
    if(!filtered.length) throw new AppError(`${tag} notes not found`);

    return filtered;
}

exports.listANote = async (noteId, ownerId) => {
    const note = await getANoteById(noteId);

    if(!note || (note.ownerId !== ownerId)) {
        throw new AppError('note not found', 404);
    }

    return note;
}

exports.addNote = async (ownerId, title, body, tags) => {
    const noteId = generateId('n_');
    
    const note = {
        'id': noteId,
        'ownerId': ownerId,
        'title': title,
        'body': body,
        'tags': [],
        'createdAt': new Date().toISOString(),
        'updatedAt': new Date().toISOString()
    }

    if(tags?.length) note.tags = tags;

    await addNote(note);
    return noteId;
}

exports.updateNote = async (noteId, title, body, tags) => {
    const note = await getANoteById(noteId);

    if(!note) throw new AppError('note not found', 404);

    note.updatedAt = new Date().toISOString();

    if(title) note.title = title;

    if(body) note.body = body;

    if(tags?.length) {
        for(const tag of tags) {
            note.tags.push(tag);
        }
    }

    await changeNote(note);
}

exports.removeNote = async (noteId) => {
    const deleted = await deleteNote(noteId);

    if(!deleted) throw new AppError('note not found', 404);
}