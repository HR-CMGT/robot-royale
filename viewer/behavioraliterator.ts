import { Behavior } from "./interface/behavior.js";

export class BehavioralIterator {
    private behaviors : Behavior[] = []

    private current : number = 0

    constructor() {
        
    }

    next() : Behavior {
        
        if(this.current > this.behaviors.length - 1) this.current = 0

        return this.behaviors[this.current++]
    }

    add(behavior : Behavior) {
        this.behaviors.push(behavior)
    }

    isNotEmpty() : boolean {
        return this.behaviors.length != 0
    }

    clear() {
        this.behaviors = []
    }
}