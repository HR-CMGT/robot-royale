import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Vector2 } from "../vector.js";

export class Rotate extends Behavior{
    
    private rotateClockWise : boolean = true

    private targetAngle: number

    constructor(behavioralObject : BehavioralObject, angle : number, rotateClockWise : boolean) {
        super(behavioralObject)

        this.lifeTime           = angle
        this.targetAngle        = angle
        this.rotateClockWise    = rotateClockWise
    }

    performUpdate(): void {
        super.performUpdate()

        if(this.rotateClockWise) this.BehavioralObject.Rotation++
        else this.BehavioralObject.Rotation--
    }

    public gotoNextBehavior() : void {
        
        this.BehavioralObject.Direction = Vector2.getVectorFromAngle(this.BehavioralObject.Rotation)
        
        super.gotoNextBehavior()
    }
    
    // public onActivateBehavior() : void {

    //     let ammoBox = Game.Instance.AmmoBoxes[0]

    //     // Calculate new Direction (tank to ammo)
    //     let diff = ammoBox.Position.difference(this.BehavioralObject.Position)
    //     let total = diff.magnitude()
    //     this.BehavioralObject.Direction = new Vector2(diff.X/total, diff.Y/total)

    //     // Get direction angle (-180, 180)
    //     let angle = this.BehavioralObject.Direction.angle()

    //     // Calculate angle to rotate (0-360)
    //     angle = (angle - this.BehavioralObject.Rotation + 720) % 360
        
    //     // // get acute angle and choose rotation direction (shortest angle, 0 - 180)
    //     if (angle > 180) {
    //         angle = 360 - angle
    //         this.rotateClockWise = false
    //         this.targetAngle = this.BehavioralObject.Rotation - angle
    //     } else {
    //         this.rotateClockWise = true
    //         this.targetAngle = this.BehavioralObject.Rotation + angle
    //     }

    //     this.lifeTime = angle
    // }

    
}