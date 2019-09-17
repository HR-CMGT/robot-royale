import { Behavior } from "../interface/behavior";
import { Game } from "../game";
export class MoveTowardsAmmo extends Behavior {
    constructor(behavioralObject) {
        super(behavioralObject);
        this.targetBox = this.getNearestAmmoBox();
    }
    performUpdate() {
        if (this.targetBox) {
        }
        else {
            this.BehavioralObject.activateNextBehavior();
        }
    }
    getNearestAmmoBox() {
        let targetBox;
        let boxes = Game.Instance.AmmoBoxes;
        for (const ammoBox of boxes) {
            let iets = ammoBox.Position.difference(this.BehavioralObject.Position);
            console.log(iets);
            let dist = iets.magnitude();
            console.log(dist);
        }
        return targetBox;
    }
}
