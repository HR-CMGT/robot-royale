import { Behavior } from "../interface/behavior.js";
import { Game } from "../game.js";
export class Rotate extends Behavior {
    constructor(behavioralObject, degrees) {
        super(behavioralObject);
        this.rotateClockWise = true;
        console.log("Behavior: rotate");
        this.onActivateBehavior();
    }
    performUpdate() {
        super.performUpdate();
        if (this.rotateClockWise)
            this.BehavioralObject.Rotation++;
        else
            this.BehavioralObject.Rotation--;
    }
    gotoNextBehavior() {
        super.gotoNextBehavior();
    }
    onActivateBehavior() {
        let ammoBox = Game.Instance.AmmoBoxes[0];
        let angle = ammoBox.Position.angle(this.BehavioralObject.Position);
        if (angle < 0)
            angle = 360 - (-angle);
        angle = (angle - this.BehavioralObject.Rotation) % 360;
        if (360 - angle < angle)
            angle = 360 - angle;
        if (angle < 0)
            this.rotateClockWise = false;
        this.lifeTime = Math.abs(angle);
        console.log("Robot rotation: " + this.BehavioralObject.Rotation);
        console.log("Angle " + ammoBox.Position.angle(this.BehavioralObject.Position));
        console.log("richting: " + this.rotateClockWise);
        console.log("Lifetime " + this.lifeTime);
    }
}
