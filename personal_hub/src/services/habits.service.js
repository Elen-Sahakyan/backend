const path = require('node:path');
const { 
    AppError,
    generateId
} = require(path.join(process.cwd(), 'utils'));
const {
    getAll,
    getOne,
    addHabit,
    changeHabit,
    checkInHabit,
    deleteHabit
} = require(path.join(process.cwd(), 'src', 'models', 'habit.model'));

const FREQUENCY = {
    'daily': 'daily',
    'weekly': 'weekly',
    'monthly': 'monthly'
}

exports.listAll = async (ownerId) => {
    const habits = await getAll(ownerId);

    if(!habits.length) throw new AppError('habits not found', 404);

    return habits;
}

exports.listOne = async (ownerId, habitId) => {
    const habit = await getOne(habitId);

    if(!habit || habit.ownerId !== ownerId) throw new AppError('habit not found', 404);

    return habit;
}

exports.add = async (ownerId, name, freq = FREQUENCY.daily) => {
    const habit = {
        'id': generateId('h_'),
        'ownerId': ownerId,
        'name': name,
        'frequency': freq,
        'checkIns': 0,
        'createdAt': new Date().toISOString(),
        'updatedAt': new Date().toISOString()
    }

    await addHabit(habit);
}

exports.change = async (ownerId, habitId, name, freq) => {

    const habit = await getOne(habitId);

    if(!habit || habit.ownerId !== ownerId) {
        throw new AppError('habit not found', 404);
    }

    if(name) habit.name = name;

    if(freq) habit.frequency = freq;

    habit.updatedAt = new Date().toISOString();

    await changeHabit(habit);
}

exports.checkIns = async (ownerId, habitId) => {
    const chekedIn = await checkInHabit(ownerId, habitId);

    if(!chekedIn) throw new AppError('habit not found', 404);

}

exports.removeHabit = async (ownerId, habitId) => {
    const deleted = await deleteHabit(ownerId, habitId);

    if(!deleted) throw new AppError('habit not found', 404);
}