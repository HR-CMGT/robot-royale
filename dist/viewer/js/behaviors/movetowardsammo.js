import { Behavior } from "../interface/behavior.js";
import { Game } from "../game.js";
import { BehaviorComposite } from "./behaviorcomposite.js";
import { RotateToTarget } from "./rotatetotarget.js";
import { Forward } from "./forward.js";
export class MoveTowardsAmmo extends Behavior {
    constructor(behavioralObject) {
        super(behavioralObject);
    }
    performUpdate() {
        if (this.activeBehavior)
            this.activeBehavior.performUpdate();
    }
    onActivateBehavior() {
        let targetObject = this.getNearestAmmoBox();
        if (targetObject) {
            let behavioralComposite = new BehaviorComposite(this.BehavioralObject);
            behavioralComposite.addBehavior(new RotateToTarget(this.BehavioralObject, targetObject));
            behavioralComposite.addBehavior(new Forward(this.BehavioralObject));
            behavioralComposite.onActivateBehavior();
            this.activeBehavior = behavioralComposite;
        }
        else {
            console.log("No target found in MoveTowardsAmmo");
            this.activeBehavior = new Forward(this.BehavioralObject);
        }
    }
    gotoNextBehavior() {
        this.activeBehavior.gotoNextBehavior();
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
}
