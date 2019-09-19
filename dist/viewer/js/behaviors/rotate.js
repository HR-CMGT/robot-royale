import { Behavior } from "../interface/behavior.js";
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
        this.BehavioralObject.Rotation = (this.targetAngle + 360) % 360;
        super.gotoNextBehavior();
    }
}
