const TaskManager = require('./task_manager.js');

const manager = new TaskManager();

manager.on('taskAdded', (name) => {
    console.log(`NEW: Task "${name}" is now pending`);
});

manager.on('taskCompleted', (name, total) => {
    console.log(`Task "${name}" finished. Total completed ${total}`);

    if(total === 3) {
        console.log('--- Milestone achieved: Three tasks finished!---');
    }
});

manager.addTask('Setup Database');
manager.addTask('Write API endpoints');
manager.addTask('Design UI Mockups');

manager.completeTask('Setup Database');
manager.completeTask('Write API endpoints');
manager.completeTask('Design UI Mockups');

