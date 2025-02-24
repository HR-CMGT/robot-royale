import { Behavior } from "../../interface/behavior.js";
import { BehavioralObject } from "../../interface/behavioralObject.js";

export class BehaviorComposite extends Behavior {

    // Fields
    private currentBehaviorCounter  : number        = 0;
    private behaviors               : Behavior[]    = []
    private activeBehavior          : Behavior

    public addBehavior(b : Behavior) { this.behaviors.push(b) }
    
    constructor(behavioralObject : BehavioralObject) {
        super(behavioralObject)
    }

    public performUpdate() {
        this.activeBehavior.performUpdate()
    }

    // is called one time, when composite becomes active
    public onActivateBehavior() : void {
        this.currentBehaviorCounter = 0
        if(this.behaviors.length > 0) {
            this.activeBehavior = this.behaviors[this.currentBehaviorCounter++]
            this.activeBehavior.onActivateBehavior()
        } else {
            super.gotoNextBehavior()
        }
    }
    public gotoNextBehavior() {
        if(this.currentBehaviorCounter < this.behaviors.length) {
            this.activeBehavior.onDeactivateBehavior()
            this.activeBehavior = this.behaviors[this.currentBehaviorCounter++] 
            this.activeBehavior.onActivateBehavior()
            // console.log(this.activeBehavior)
        }
        else {
            super.gotoNextBehavior()
        }
    }
}