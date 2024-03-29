import { BehavioralIterator } from "../behavioraliterator.js";
import { Game } from "../game.js";
import { Forward } from "../behaviors/forward.js";
import { DomObject } from "../core/domobject.js";
export class BehavioralObject extends DomObject {
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
        if (this.behavioralIterator.isNotEmpty())
            this.behavior = this.behavioralIterator.next();
        else
            this.behavior = new Forward(this);
        this.behavior.onActivateBehavior();
        if (Game.DEBUG) {
        }
    }
}
