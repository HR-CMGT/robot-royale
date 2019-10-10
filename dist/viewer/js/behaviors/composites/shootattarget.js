import { Behavior } from "../../interface/behavior.js";
import { Game } from "../../game.js";
import { BehaviorComposite } from "./behaviorcomposite.js";
import { Shoot } from "../shoot.js";
import { Break } from "../break.js";
import { StartOff } from "../startoff.js";
import { RotateTurretToTarget } from "../rotateturrettotarget.js";
import { Forward } from "../forward.js";
export class ShootAtTarget extends Behavior {
    constructor(behavioralObject) {
        super(behavioralObject);
    }
    performUpdate() {
        if (this.activeBehavior)
            this.activeBehavior.performUpdate();
    }
    onActivateBehavior() {
        if (Game.Instance.Tanks.length > 1) {
            let targetObject = Game.Instance.getRandomEnemy(this.BehavioralObject);
            let behavioralComposite = new BehaviorComposite(this.BehavioralObject);
            behavioralComposite.addBehavior(new Break(this.BehavioralObject));
            behavioralComposite.addBehavior(new RotateTurretToTarget(this.BehavioralObject, targetObject));
            behavioralComposite.addBehavior(new Shoot(this.BehavioralObject, targetObject));
            behavioralComposite.addBehavior(new StartOff(this.BehavioralObject));
            this.activeBehavior = behavioralComposite;
            behavioralComposite.onActivateBehavior();
        }
        else {
            this.activeBehavior = new Forward(this.BehavioralObject);
        }
    }
    gotoNextBehavior() {
        this.activeBehavior.gotoNextBehavior();
    }
}
