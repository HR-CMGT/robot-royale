import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Rotate } from "./rotate.js";
import { Forward } from "./forward.js";
import { GameObject } from "../gameobject.js";
import { Vector2 } from "../vector.js";

export class RotateAndMoveComposite extends Behavior {

    private currentBehaviorCounter  : number        = 0;
    private behaviors               : Behavior[]    = []
    private activeBehavior          : Behavior
    private targetObject            : GameObject

    constructor(behavioralObject : BehavioralObject, targetObject : GameObject) {
        super(behavioralObject)

        this.targetObject = targetObject
    }

    public performUpdate() {
        this.activeBehavior.performUpdate()
    }

    public onActivateBehavior() : void {
        this.BehavioralObject.Direction = this.getDirectionToObject(this.targetObject)

        let rotationOptions : RotationOptions = this.getAngleToDirection()

        this.behaviors.push(new Rotate(this.BehavioralObject, rotationOptions.angle, rotationOptions.rotateClockWise))
        this.behaviors.push(new Forward(this.BehavioralObject))

        // First Rotate 
        this.activeBehavior = this.behaviors[this.currentBehaviorCounter++]
    }
    public gotoNextBehavior() {
        if(this.currentBehaviorCounter < this.behaviors.length) {
            this.activeBehavior = this.behaviors[this.currentBehaviorCounter++] 
        }
        else {
            super.gotoNextBehavior()
        }
    }

    private getAngleToDirection() : RotationOptions {
        // Get direction angle (-180, 180)
        let angle = this.BehavioralObject.Direction.angle()

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