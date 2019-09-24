import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Vector2 } from "../vector.js";

export class Rotate extends Behavior{
    
    private rotateClockWise : boolean = true

    constructor(behavioralObject : BehavioralObject, angle : number, rotateClockWise : boolean) {
        super(behavioralObject)

        this.lifeTime           = angle
        this.rotateClockWise    = rotateClockWise
    }

    performUpdate(): void {
        super.performUpdate()

        if(this.rotateClockWise) this.BehavioralObject.Rotation++
        else this.BehavioralObject.Rotation--
    }

    // public gotoNextBehavior() : void {
    //     super.gotoNextBehavior()
    // }

    public onDeactivateBehavior() : void {
        this.BehavioralObject.Direction = Vector2.getVectorFromAngle(this.BehavioralObject.Rotation)
    }
}