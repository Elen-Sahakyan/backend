const path = require('node:path');

const {
    readJson,
    writeJson,
} = require(path.join(process.cwd(), 'utils'));

const habitsPath = path.join(process.cwd(), 'src', 'data', 'habits.json');

exports.getAll = async (ownerId) => {
    const habits = await readJson(habitsPath);

    return habits.filter(habit => habit.ownerId === ownerId);
}

exports.getOne = async (habitId) => {
    const habits = await readJson(habitsPath);

    return habits.find(habit => habit.id === habitId);
}

exports.addHabit = async (habitObject) => {
    const habits = await readJson(habitsPath);

    habits.push(habitObject);

    await writeJson(habitsPath, habits);
}

exports.changeHabit = async (updatedHabit) => {
    const habits = await readJson(habitsPath);

    for(let i = 0; i < habits.length; ++i) {
        if(habits[i].id === updatedHabit.id) {
            habits.splice(i, 1);
            habits.push(updatedHabit);
            await writeJson(habitsPath, habits);
        }
    }
}

exports.checkInHabit = async (ownerId, habitId) => {
    const habits = await readJson(habitsPath);
    
    const habit = habits.find(habit => {
        return habit.id === habitId && habit.ownerId === ownerId;
    }); 

    if(habit) {
        ++habit.checkIns;
        await writeJson(habitsPath, habits);
        return true;
    }
    return false;
}

exports.deleteHabit = async (ownerId, habitId) => {
    const habits = await readJson(habitsPath);

    for(let i = 0; i < habits.length; ++i) {
        if(habits[i].id === habitId && habits[i].ownerId === ownerId) {
            habits.splice(i, 1);
            await writeJson(habitsPath, habits);
            return true;
        }
    }
    return false;
}