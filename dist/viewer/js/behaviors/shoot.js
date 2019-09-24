import { Behavior } from "../interface/behavior.js";
import { Game } from "../game.js";
import { Bullet } from "../gameobjects/tank/bullet.js";
export class Shoot extends Behavior {
    constructor(behavioralObject) {
        super(behavioralObject);
        this.fireRate = 40;
        this.lifeTime = 100;
        this.tank = behavioralObject;
    }
    performUpdate() {
        if (this.timer % this.fireRate === 0 && this.tank.Ammo > 0) {
            this.shoot();
        }
        super.performUpdate();
    }
    shoot() {
        this.tank.Ammo--;
        Game.Instance.addBullet(new Bullet(this.BehavioralObject.Turret));
    }
    onDeactivateBehavior() {
        if (!this.tank.Turret.active)
            this.tank.Turret.active = true;
    }
}
