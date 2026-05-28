const path = require('node:path');
const {
    listNotes,
    listANote,
    addNote,
    updateNote,
    removeNote
} = require(path.join(process.cwd(), 'src', 'services', 'notes.service'));

exports.getAll = async (req, res) => {
    const ownerId = req.user.userId;
    const tag = req.query.tag;

    const notes = await listNotes(ownerId, tag);

    return res.status(200).json(notes);
}

exports.getOne = async (req, res) => {
    const noteId = req.params.id;
    const ownerId = req.user.userId;

    const note = await listANote(noteId, ownerId);

    return res.status(200).json(note);
}

exports.add = async (req, res) => {
    const { title, body, tags } = req.body;

    const ownerId = req.user.userId;

    console.log(ownerId);

    const noteId = await addNote(ownerId, title, body, tags);
    
    return res.status(201).json({
        message: `note created: ${noteId}`
    });
}

exports.update = async (req, res) => {
    const noteId = req.params.id;

    const { title, body, tags } = req.body;

    await updateNote(noteId, title, body, tags);

    return res.status(200).json({
        message: 'note updated'
    });
}

exports.remove = async (req, res) => {
    const noteId = req.params.id;

    await removeNote(noteId);

    return res.status(204).json();
}
