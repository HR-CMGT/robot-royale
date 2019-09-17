import { GameObject } from "../gameobject.js";
import { BehavioralIterator } from "../behavioraliterator.js";
export class BehavioralObject extends GameObject {
    get Behavior() { return this.behavior; }
    set Behavior(b) { this.behavior = b; }
    AddBehavior(b) { this.behavioralIterator.add(b); }
    constructor(tag) {
        super(tag);
        this.behavioralIterator = new BehavioralIterator();
    }
    activateNextBehavior() {
        this.behavior = this.behavioralIterator.next();
        this.behavior.onActivateBehavior();
    }
}
