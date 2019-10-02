import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Vector2 } from "../vector.js";
import { Game } from "../game.js";

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

    public onDeactivateBehavior() : void {
        if(Game.DEBUG) console.log("new direction in Rotate:onDeactivateBehavior")
        this.BehavioralObject.Direction = Vector2.getVectorFromAngle(this.BehavioralObject.Rotation)
    }
}