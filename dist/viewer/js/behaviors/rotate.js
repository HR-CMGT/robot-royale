import { Behavior } from "../interface/behavior.js";
import { Vector2 } from "../vector.js";
export class Rotate extends Behavior {
    constructor(behavioralObject, angle, rotateClockWise) {
        super(behavioralObject);
        this.rotateClockWise = true;
        this.lifeTime = angle;
        this.targetAngle = angle;
        this.rotateClockWise = rotateClockWise;
    }
    performUpdate() {
        super.performUpdate();
        if (this.rotateClockWise)
            this.BehavioralObject.Rotation++;
        else
            this.BehavioralObject.Rotation--;
    }
    gotoNextBehavior() {
        this.BehavioralObject.Direction = Vector2.getVectorFromAngle(this.BehavioralObject.Rotation);
        super.gotoNextBehavior();
    }
}
