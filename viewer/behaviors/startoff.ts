import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";

export class StartOff extends Behavior{
    
    private windowWidth : number
    private windowHeight : number
    private speed : number = 0.1

    constructor(behavioralObject : BehavioralObject) {
        super(behavioralObject)
        this.lifeTime = 70
    }

    performUpdate(): void {
        super.performUpdate()

        this.windowWidth = window.innerWidth - 200
        this.windowHeight = window.innerHeight

        // update position 
        this.BehavioralObject.Position = this.BehavioralObject.Position.add(
            this.BehavioralObject.Direction.scale(this.speed))

        this.speed *= 1.05
        if(this.speed >= this.BehavioralObject.Speed) {
            this.BehavioralObject.Behavior.gotoNextBehavior()
        }

        this.checkWindowContainsObject()
    }

    public onActivateBehavior() : void {
        this.speed = 0.1
    }

    private checkWindowContainsObject() : void {
        // move outside one side and enter opposite side
        if(this.BehavioralObject.Position.X < -this.BehavioralObject.Width) {
            this.BehavioralObject.Position.X = this.windowWidth
        }
         if(this.BehavioralObject.Position.Y < -this.BehavioralObject.Height) {
            this.BehavioralObject.Position.Y = this.windowHeight
        }
         if(this.BehavioralObject.Position.X > this.windowWidth) {
            this.BehavioralObject.Position.X = -this.BehavioralObject.Width
        }
         if(this.BehavioralObject.Position.Y > this.windowHeight) {
            this.BehavioralObject.Position.Y = -this.BehavioralObject.Height
        }
    }
}