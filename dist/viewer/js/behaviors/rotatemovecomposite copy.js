import { Behavior } from "../interface/behavior.js";
import { Forward } from "./forward.js";
import { RotateToTarget } from "./rotatetotarget.js";
export class RotateAndMoveComposite extends Behavior {
    constructor(behavioralObject, targetObject) {
        super(behavioralObject);
        this.currentBehaviorCounter = 0;
        this.behaviors = [];
        this.targetObject = targetObject;
    }
    performUpdate() {
        this.activeBehavior.performUpdate();
    }
    onActivateBehavior() {
        this.behaviors.push(new RotateToTarget(this.BehavioralObject, this.targetObject));
        this.behaviors.push(new Forward(this.BehavioralObject));
        this.activeBehavior = this.behaviors[this.currentBehaviorCounter++];
        this.activeBehavior.onActivateBehavior();
    }
    gotoNextBehavior() {
        if (this.currentBehaviorCounter < this.behaviors.length) {
            this.activeBehavior = this.behaviors[this.currentBehaviorCounter++];
        }
        else {
            super.gotoNextBehavior();
        }
    }
}
