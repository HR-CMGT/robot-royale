import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Rotate } from "./rotate.js";
import { Forward } from "./forward.js";
import { Game } from "../game.js";

export class RotateAndMoveComposite extends Behavior {

    private currentBehaviorCounter  : number        = 0;
    private behaviors               : Behavior[]    = []
    private activeBehavior          : Behavior

    constructor(behavioralObject : BehavioralObject) {
        super(behavioralObject)

        let ammoBox = Game.Instance.AmmoBoxes[0]
        let deg : number = ammoBox.Position.angle(this.BehavioralObject.Position)

        this.behaviors.push(new Rotate(behavioralObject, deg))
        this.behaviors.push(new Forward(behavioralObject))

        // First Rotate 
        this.activeBehavior = this.behaviors[this.currentBehaviorCounter++]
    }

    public performUpdate() {
        this.activeBehavior.performUpdate()
    }

    protected gotoNextBehavior() {
        console.log("gotoNextBehavior MoveTowardsAmmo")
        if(this.currentBehaviorCounter < this.behaviors.length) {
            this.activeBehavior = this.behaviors[this.currentBehaviorCounter++] 
        }
        else {
            super.gotoNextBehavior()
        }
    }
}