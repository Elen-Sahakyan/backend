class CustomEventEmitter {
    #events = new Map();

    on(event, listener) {
        if(typeof event !== 'string' && typeof event !== 'symbol') {
            throw new Error('event-name must be a string/symbol');
        }
        if(typeof listener !== 'function') {
            throw new Error('listener must be a function');
        }
        
        if(this.#events.has(event)) {
            this.#events.get(event).push(listener);
        } else {
            this.#events.set(event, new Array(listener));
        }
    }
    
    emit(event, ...args) {
        if(!this.#events.has(event)) return false;

        const listeners = this.#events.get(event);
        
        listeners.forEach(listener => {
            listener(...args); 
        });
        
        return true;
    }
    
    off(event, listener) {
        if(!this.#events.get(event)) return;
        
        const listeners = this.#events.get(event);

        const index = listeners.indexOf(listener);

        if(index !== -1) {
            listeners.splice(index, 1);
        }
    }
}

module.exports = CustomEventEmitter;

