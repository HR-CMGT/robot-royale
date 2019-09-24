import { BehavioralObject } from "./behavioralObject.js";

export abstract class Behavior {
    // Fields
    protected   timer    : number    = 0
    protected   lifeTime : number    = 0

    private behavioralObject : BehavioralObject

    // Properties
    public get BehavioralObject() : BehavioralObject  { return this.behavioralObject    }

    constructor(behavioralObject : BehavioralObject) {
        this.behavioralObject = behavioralObject
    }
    public performUpdate() : void {
        this.timer++
        if(this.timer >= this.lifeTime) {
            this.timer = 0
            // If the Behavioral object has a composite behavior, 
            // it is important to update the behavior on the object. Not on 
            // the behavior
            this.BehavioralObject.Behavior.gotoNextBehavior()
        }
    }

    public gotoNextBehavior() : void {
        this.behavioralObject.activateNextBehavior()
    }

    public onActivateBehavior() : void {
        
    }
    public onDeactivateBehavior() : void {
        
    }
}