import { Behavior } from "../interface/behavior.js";
import { Game } from "../game.js";
import { BehaviorComposite } from "./behaviorcomposite.js";
import { RotateToTarget } from "./rotatetotarget.js";
import { Forward } from "./forward.js";
export class MoveTowardsPickup extends Behavior {
    constructor(behavioralObject, type) {
        super(behavioralObject);
        this.type = type;
    }
    performUpdate() {
        if (this.activeBehavior)
            this.activeBehavior.performUpdate();
    }
    onActivateBehavior() {
        let targetObject = this.getNearestPickup();
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
    getNearestPickup() {
        let targetBox;
        let closest = 0;
        let boxes = this.type === "ammo" ? Game.Instance.AmmoBoxes : Game.Instance.RepairKits;
        for (const pickup of boxes) {
            let diff = pickup.Position.difference(this.BehavioralObject.Position);
            let dist = diff.magnitude();
            if (dist < closest || closest == 0) {
                closest = dist;
                targetBox = pickup;
            }
        }
        return targetBox;
    }
}
