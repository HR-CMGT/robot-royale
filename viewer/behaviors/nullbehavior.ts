import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";

export class NullBehavior extends Behavior{
    constructor(behavioralObject : BehavioralObject) {
        super(behavioralObject)

    }

    performUpdate() {

    }
}