import { Behavior } from "../interface/behavior.js";
export class NullBehavior extends Behavior {
    constructor(behavioralObject) {
        super(behavioralObject);
    }
    performUpdate() {
    }
}
