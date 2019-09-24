import { GameObject } from "../gameobject.js";
import { BehavioralIterator } from "../behavioraliterator.js";
export class BehavioralObject extends GameObject {
    get Behavior() { return this.behavior; }
    set Behavior(b) { this.behavior = b; }
    get BehavioralIterator() { return this.behavioralIterator; }
    AddBehavior(b) { this.behavioralIterator.add(b); }
    constructor(tag) {
        super(tag);
        this.behavioralIterator = new BehavioralIterator();
    }
    activateNextBehavior() {
        let nextBehavior = this.behavioralIterator.next();
        nextBehavior.onActivateBehavior();
        this.behavior = nextBehavior;
    }
}
