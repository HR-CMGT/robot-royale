import { Behavior } from "../interface/behavior.js";
import { Game } from "../game.js";
import { Bullet } from "../bullet.js";
export class Shoot extends Behavior {
    constructor(behavioralObject) {
        super(behavioralObject);
        this.fireRate = 40;
        this.lifeTime = 100;
        this.robot = behavioralObject;
    }
    performUpdate() {
        if (this.timer % this.fireRate === 0 && this.robot.Ammo > 0) {
            this.shoot();
        }
        super.performUpdate();
    }
    shoot() {
        this.robot.Ammo--;
        Game.Instance.addBullet(new Bullet(this.BehavioralObject));
    }
    gotoNextBehavior() {
        super.gotoNextBehavior();
    }
}
