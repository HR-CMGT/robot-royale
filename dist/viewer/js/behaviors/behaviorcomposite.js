import { Behavior } from "../interface/behavior.js";
export class BehaviorComposite extends Behavior {
    constructor(behavioralObject) {
        super(behavioralObject);
        this.currentBehaviorCounter = 0;
        this.behaviors = [];
    }
    addBehavior(b) { this.behaviors.push(b); }
    performUpdate() {
        this.activeBehavior.performUpdate();
    }
    onActivateBehavior() {
        this.currentBehaviorCounter = 0;
        if (this.behaviors.length > 0) {
            this.activeBehavior = this.behaviors[this.currentBehaviorCounter++];
            this.activeBehavior.onActivateBehavior();
        }
        else {
            super.gotoNextBehavior();
        }
    }
    gotoNextBehavior() {
        if (this.currentBehaviorCounter < this.behaviors.length) {
            this.activeBehavior.onDeactivateBehavior();
            this.activeBehavior = this.behaviors[this.currentBehaviorCounter++];
            this.activeBehavior.onActivateBehavior();
            console.log(this.activeBehavior);
        }
        else {
            super.gotoNextBehavior();
        }
    }
}
