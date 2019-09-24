import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Vector2 } from "../vector.js";
import { GameObject } from "../gameobject.js";
import { Rotate } from "./rotate.js";
import { Tank } from "../gameobjects/tank/tank.js";
import { Turret } from "../gameobjects/tank/turret.js";

export class RotateTurretToTarget extends Behavior{
    
    private targetObject : GameObject
    private rotateClockWise : boolean = true
    private turret : Turret
    
    constructor(behavioralObject : BehavioralObject, target : GameObject) {
        super(behavioralObject)

        this.targetObject = target
    }

    performUpdate(): void {
        super.performUpdate()
        
        if(this.rotateClockWise) this.turret.Rotation++
        else this.turret.Rotation--
    }

    public gotoNextBehavior() : void {
        console.log("go to next behavior")
        this.onDeactivateBehavior()
        this.BehavioralObject.activateNextBehavior()
    }

    public onActivateBehavior() : void {
        console.log("onActivate van rotate turret")

        this.turret = (this.BehavioralObject as Tank).Turret
        // when rotating is finished, turret will go back to own behavior
        this.turret.active = false

        // this.BehavioralObject.Direction = this.getDirectionToObject(this.targetObject)
        let direction = this.getDirectionToObject(this.targetObject)
        let rotationOptions : RotationOptions = this.getAngleToDirection(direction)
        
        // todo fix is angle is NaN, still not working
        if(isNaN(rotationOptions.angle)) this.lifeTime = 0
        else this.lifeTime = rotationOptions.angle

        this.rotateClockWise = rotationOptions.rotateClockWise
    }

    private getAngleToDirection(direction : Vector2) : RotationOptions {
        // Get direction angle (-180, 180)
        let angle = direction.angle()
        
        // Calculate angle to rotate (0-360)
        angle = (angle - this.turret.Rotation + 720) % 360
        
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