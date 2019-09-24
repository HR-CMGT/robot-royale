import { Behavior } from "../interface/behavior.js";
import { Vector2 } from "../vector.js";
import { Rotate } from "./rotate.js";
export class RotateToTarget extends Behavior {
    constructor(behavioralObject, target) {
        super(behavioralObject);
        this.targetObject = target;
    }
    performUpdate() {
        this.activeBehavior.performUpdate();
    }
    gotoNextBehavior() {
        this.activeBehavior.gotoNextBehavior();
    }
    onActivateBehavior() {
        this.BehavioralObject.Direction = this.getDirectionToObject(this.targetObject);
        let rotationOptions = this.getAngleToDirection(this.BehavioralObject.Direction);
        this.activeBehavior = new Rotate(this.BehavioralObject, rotationOptions.angle, rotationOptions.rotateClockWise);
    }
    getAngleToDirection(direction) {
        let angle = direction.angle();
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
