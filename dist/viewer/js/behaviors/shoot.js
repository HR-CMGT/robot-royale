import { Behavior } from "../interface/behavior.js";
import { Game } from "../game.js";
import { Bullet } from "../bullet.js";
export class Shoot extends Behavior {
    constructor(behavioralObject) {
        super(behavioralObject);
        this.fireRate = 40;
        console.log("Behavior: rotate");
        this.lifeTime = 100;
        this.robot = behavioralObject;
    }
    performUpdate() {
        super.performUpdate();
        if (this.timer % this.fireRate === 0 && this.robot.Ammo > 0) {
            this.shoot();
        }
    }
    shoot() {
        this.robot.Ammo--;
        Game.Instance.addBullet(new Bullet(this.BehavioralObject));
    }
    gotoNextBehavior() {
        console.log("activateNextBehavior Shoot");
        super.gotoNextBehavior();
    }
}
