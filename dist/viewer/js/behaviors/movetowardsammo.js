import { Behavior } from "../interface/behavior.js";
import { Game } from "../game.js";
import { RotateAndMoveComposite } from "./rotatemovecomposite.js";
export class MoveTowardsAmmo extends Behavior {
    constructor(behavioralObject) {
        super(behavioralObject);
    }
    performUpdate() {
        if (this.activeBehavior)
            this.activeBehavior.performUpdate();
    }
    getNearestAmmoBox() {
        let targetBox;
        let closest = 0;
        let boxes = Game.Instance.AmmoBoxes;
        for (const ammoBox of boxes) {
            let iets = ammoBox.Position.difference(this.BehavioralObject.Position);
            let dist = iets.magnitude();
            if (dist < closest || closest == 0) {
                closest = dist;
                targetBox = ammoBox;
            }
        }
        return targetBox;
    }
    gotoNextBehavior() {
        this.activeBehavior.gotoNextBehavior();
    }
    onActivateBehavior() {
        let targetObject = this.getNearestAmmoBox();
        if (targetObject) {
            let nextBehavior = new RotateAndMoveComposite(this.BehavioralObject, targetObject);
            nextBehavior.onActivateBehavior();
            this.activeBehavior = nextBehavior;
        }
        else {
            console.log("No target found in MoveTowardsAmmo");
            this.BehavioralObject.activateNextBehavior();
        }
    }
}
