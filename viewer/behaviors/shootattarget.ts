import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";

export class ShootAtTarget extends Behavior {
    constructor(behavioralObject : BehavioralObject) {
        super(behavioralObject)
    }
}