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
    clear() {
        this.behaviors = [];
    }
}
