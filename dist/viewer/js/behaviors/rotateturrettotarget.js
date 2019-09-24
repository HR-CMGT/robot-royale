import { Behavior } from "../interface/behavior.js";
import { Vector2 } from "../vector.js";
export class RotateTurretToTarget extends Behavior {
    constructor(behavioralObject, target) {
        super(behavioralObject);
        this.rotateClockWise = true;
        this.targetObject = target;
    }
    performUpdate() {
        super.performUpdate();
        if (this.rotateClockWise)
            this.turret.Rotation++;
        else
            this.turret.Rotation--;
    }
    gotoNextBehavior() {
        console.log("go to next behavior");
        this.onDeactivateBehavior();
        this.BehavioralObject.activateNextBehavior();
    }
    onActivateBehavior() {
        console.log("onActivate van rotate turret");
        this.turret = this.BehavioralObject.Turret;
        this.turret.active = false;
        let direction = this.getDirectionToObject(this.targetObject);
        let rotationOptions = this.getAngleToDirection(direction);
        if (isNaN(rotationOptions.angle))
            this.lifeTime = 0;
        else
            this.lifeTime = rotationOptions.angle;
        this.rotateClockWise = rotationOptions.rotateClockWise;
    }
    getAngleToDirection(direction) {
        let angle = direction.angle();
        angle = (angle - this.turret.Rotation + 720) % 360;
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
