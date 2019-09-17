import { Behavior } from "../interface/behavior.js";
import { Rotate } from "./rotate.js";
import { Forward } from "./forward.js";
import { Game } from "../game.js";
export class RotateAndMoveComposite extends Behavior {
    constructor(behavioralObject) {
        super(behavioralObject);
        this.currentBehaviorCounter = 0;
        this.behaviors = [];
        let ammoBox = Game.Instance.AmmoBoxes[0];
        let deg = ammoBox.Position.angle(this.BehavioralObject.Position);
        this.behaviors.push(new Rotate(behavioralObject, deg));
        this.behaviors.push(new Forward(behavioralObject));
        this.activeBehavior = this.behaviors[this.currentBehaviorCounter++];
    }
    performUpdate() {
        this.activeBehavior.performUpdate();
    }
    gotoNextBehavior() {
        console.log("gotoNextBehavior MoveTowardsAmmo");
        if (this.currentBehaviorCounter < this.behaviors.length) {
            this.activeBehavior = this.behaviors[this.currentBehaviorCounter++];
        }
        else {
            super.gotoNextBehavior();
        }
    }
}
