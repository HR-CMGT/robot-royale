import { Behavior } from "../interface/behavior.js";
export class Rotate extends Behavior {
    constructor(behavioralObject, degrees) {
        super(behavioralObject);
        console.log("Behavior: rotate");
        this.LifeTime = degrees;
    }
    performUpdate() {
        super.performUpdate();
        this.BehavioralObject.Rotate++;
    }
}
