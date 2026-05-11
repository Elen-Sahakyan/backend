const CustomEventEmitter = require('./events.js');

class TaskManager extends CustomEventEmitter {
    #task_count = 0;
    constructor() {
        super();
    }

    addTask(taskName) {
        console.log(`Task added: ${taskName}`);
        
        this.emit('taskAdded', taskName);
    }

    completeTask(taskName) {
        this.#task_count++;

        this.emit('taskCompleted', taskName, this.#task_count);
    }

}

module.exports = TaskManager;