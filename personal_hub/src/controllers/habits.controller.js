const path = require('node:path');
const {
    listAll,
    listOne,
    add,
    change,
    checkIns,
    removeHabit
} = require(path.join(process.cwd(), 'src', 'services', 'habits.service'));

exports.listHabits = async (req, res) => {
    const ownerId = req.user.userId;

    const habits = await listAll(ownerId);

    return res.status(200).json(habits);
}

exports.listHabit = async (req, res) => {
    const ownerId = req.user.userId;
    const habitId = req.params.id;

    const habit = await listOne(ownerId, habitId);

    return res.status(200).json(habit);
}

exports.create = async (req, res) => {
    const ownerId = req.user.userId;
    const { name, frequency } = req.body;

    await add(ownerId, name, frequency);

    return res.status(204).json();
}

exports.update = async (req, res) => {
    const ownerId = req.user.userId;
    const habitId = req.params.id;
    const { name, frequency } = req.body;

    await change(ownerId, habitId, name, frequency);

    return res.status(204).json();
}

exports.checkIn = async (req, res) => {
    const ownerId = req.user.userId;
    const habitId = req.params.id;

    await checkIns(ownerId, habitId);

    return res.status(204).json();
}

exports.remove = async (req, res) => {
    const ownerId = req.user.userId;
    const habitId = req.params.id;

    await removeHabit(ownerId, habitId);

    return res.status(204).json();
}