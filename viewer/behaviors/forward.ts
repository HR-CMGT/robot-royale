import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";

export class Forward extends Behavior{
    
    private windowWidth : number
    private windowHeight : number

    constructor(behavioralObject : BehavioralObject) {
        super(behavioralObject)
        this.lifeTime = 100
    }

    performUpdate(): void {
        super.performUpdate()

        this.windowWidth = window.innerWidth - 200
        this.windowHeight = window.innerHeight

        // update position 
        this.BehavioralObject.Position = 
            this.BehavioralObject.Position.add(
                this.BehavioralObject.Direction.scale(this.BehavioralObject.Speed)
            )

        this.checkWindowContainsObject()
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