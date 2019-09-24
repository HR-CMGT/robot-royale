import { Behavior } from "../interface/behavior.js";
import { Game } from "../game.js";
import { BehaviorComposite } from "./behaviorcomposite.js";
import { Shoot } from "./shoot.js";
import { Break } from "./break.js";
import { StartOff } from "./startoff.js";
import { RotateTurretToTarget } from "./rotateturrettotarget.js";
export class ShootAtTarget extends Behavior {
    constructor(behavioralObject) {
        super(behavioralObject);
    }
    performUpdate() {
        if (this.activeBehavior)
            this.activeBehavior.performUpdate();
    }
    onActivateBehavior() {
        let targetObject = this.getRandomEnemy();
        if (targetObject) {
            let behavioralComposite = new BehaviorComposite(this.BehavioralObject);
            behavioralComposite.addBehavior(new Break(this.BehavioralObject));
            behavioralComposite.addBehavior(new RotateTurretToTarget(this.BehavioralObject, targetObject));
            behavioralComposite.addBehavior(new Shoot(this.BehavioralObject));
            behavioralComposite.addBehavior(new StartOff(this.BehavioralObject));
            this.activeBehavior = behavioralComposite;
            behavioralComposite.onActivateBehavior();
        }
        else {
            console.log("No target found in MoveTowardsAmmo");
            this.BehavioralObject.activateNextBehavior();
        }
    }
    gotoNextBehavior() {
        this.activeBehavior.gotoNextBehavior();
    }
    getRandomEnemy() {
        let tanks = Game.Instance.Tanks;
        let tank;
        for (let i = 0; i < 5; i++) {
            tank = tanks[Math.floor(Math.random() * tanks.length)];
            if (tank != this.BehavioralObject)
                break;
        }
        return tank;
    }
}
