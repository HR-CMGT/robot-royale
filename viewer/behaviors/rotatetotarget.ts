import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Vector2 } from "../vector.js";
import { GameObject } from "../gameobject.js";
import { Rotate } from "./rotate.js";

export class RotateToTarget extends Behavior{
    
    private targetObject : GameObject
    private activeBehavior : Behavior
    
    constructor(behavioralObject : BehavioralObject, target : GameObject) {
        super(behavioralObject)

        this.targetObject = target
    }

    performUpdate(): void {
        this.activeBehavior.performUpdate()
    }

    public gotoNextBehavior() : void {
        // Rotate is the active behavior
        this.activeBehavior.gotoNextBehavior()
    }

    public onDeactivateBehavior() : void {
        this.activeBehavior.onDeactivateBehavior()
    }

    public onActivateBehavior() : void {
        this.BehavioralObject.Direction = this.getDirectionToObject(this.targetObject)

        let rotationOptions : RotationOptions = this.getAngleToDirection(this.BehavioralObject.Direction)
        
        this.activeBehavior = new Rotate(this.BehavioralObject, rotationOptions.angle, rotationOptions.rotateClockWise)
    }

    private getAngleToDirection(direction : Vector2) : RotationOptions {
        // Get direction angle (-180, 180)
        let angle = direction.angle()

        // Calculate angle to rotate (0-360)
        angle = (angle - this.BehavioralObject.Rotation + 720) % 360
        
        // // get acute angle and choose rotation direction (shortest angle, 0 - 180)
        let rotateClockWise = true
        if (angle > 180) {
            angle = 360 - angle
            rotateClockWise = false
        } 

        return { angle, rotateClockWise }
    }

    private getDirectionToObject(object : GameObject) : Vector2 {
        // Calculate new Direction (tank to object)
        let diff = object.Position.difference(this.BehavioralObject.Position)
        let total = diff.magnitude()
        return new Vector2(diff.X/total, diff.Y/total)
    }
}

interface RotationOptions {
    angle : number,
    rotateClockWise : boolean
}