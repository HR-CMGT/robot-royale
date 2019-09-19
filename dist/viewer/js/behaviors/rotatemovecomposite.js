import { Behavior } from "../interface/behavior.js";
import { Rotate } from "./rotate.js";
import { Forward } from "./forward.js";
import { Vector2 } from "../vector.js";
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
        this.BehavioralObject.Direction = this.getDirectionToObject(this.targetObject);
        let rotationOptions = this.getAngleToDirection();
        this.behaviors.push(new Rotate(this.BehavioralObject, rotationOptions.angle, rotationOptions.rotateClockWise));
        this.behaviors.push(new Forward(this.BehavioralObject));
        this.activeBehavior = this.behaviors[this.currentBehaviorCounter++];
    }
    gotoNextBehavior() {
        if (this.currentBehaviorCounter < this.behaviors.length) {
            this.activeBehavior = this.behaviors[this.currentBehaviorCounter++];
        }
        else {
            super.gotoNextBehavior();
        }
    }
    getAngleToDirection() {
        let angle = this.BehavioralObject.Direction.angle();
        angle = (angle - this.BehavioralObject.Rotation + 720) % 360;
        let rotateClockWise = true;
        if (angle > 180) {
            angle = 360 - angle;
            rotateClockWise = false;
        }
        return { angle, rotateClockWise };
    }
    getDirectionToObject(object) {
        let diff = object.Position.difference(this.BehavioralObject.Position);
        let total = diff.magnitude();
        return new Vector2(diff.X / total, diff.Y / total);
    }
}
