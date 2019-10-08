export class BehavioralIterator {
    constructor() {
        this.behaviors = [];
        this.current = 0;
    }
    next() {
        if (this.current > this.behaviors.length - 1)
            this.current = 0;
        return this.behaviors[this.current++];
    }
    add(behavior) {
        this.behaviors.push(behavior);
    }
    isNotEmpty() {
        return this.behaviors.length != 0;
    }
    clear() {
        this.behaviors = [];
    }
}
