import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Game } from "../game.js";

export class Rotate extends Behavior{
    
    private rotateClockWise : boolean = true;

    constructor(behavioralObject : BehavioralObject, degrees : number) {
        super(behavioralObject)
        console.log("Behavior: rotate")

        this.onActivateBehavior()
    }

    performUpdate(): void {
        super.performUpdate()

        if(this.rotateClockWise) this.BehavioralObject.Rotation++
        else this.BehavioralObject.Rotation--
    }

    protected gotoNextBehavior() : void {
        // console.log("gotoNextBehavior Rotate")
        super.gotoNextBehavior()
    }

    public onActivateBehavior() : void {
        // console.log("onActivateBehavior rotate")
        let ammoBox = Game.Instance.AmmoBoxes[0]
        // let degrees = ammoBox.Position.angle(this.BehavioralObject.Position) + this.BehavioralObject.Rotation

        // angle in degrees between two points (-180, 180)
        let angle = ammoBox.Position.angle(this.BehavioralObject.Position)
        // the angle from 0 - 360
        if(angle < 0) angle = 360 - (-angle) 
        // the angle minus the orientation
        angle = (angle - this.BehavioralObject.Rotation) % 360
        // get acute angle (shortest angle)
        if (360 - angle < angle) angle = 360 - angle

        if(angle < 0) this.rotateClockWise = false
        this.lifeTime = Math.abs(angle)

        console.log("Robot rotation: "+this.BehavioralObject.Rotation)
        console.log("Angle "+ ammoBox.Position.angle(this.BehavioralObject.Position))
        console.log("richting: "+this.rotateClockWise)
        console.log("Lifetime "+this.lifeTime)
        
    }
}