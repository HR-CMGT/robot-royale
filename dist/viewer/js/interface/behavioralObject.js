import { GameObject } from "../gameobject.js";
import { BehavioralIterator } from "../behavioraliterator.js";
import { Game } from "../game.js";
export class BehavioralObject extends GameObject {
    get Behavior() { return this.behavior; }
    set Behavior(b) { this.behavior = b; }
    get BehavioralIterator() { return this.behavioralIterator; }
    set BehavioralIterator(iterator) { this.behavioralIterator = iterator; }
    AddBehavior(b) { this.behavioralIterator.add(b); }
    constructor(tag) {
        super(tag);
        this.behavioralIterator = new BehavioralIterator();
    }
    activateNextBehavior() {
        this.behavior.onDeactivateBehavior();
        this.behavior = this.behavioralIterator.next();
        this.behavior.onActivateBehavior();
        if (Game.DEBUG) {
        }
    }
}
