import { Behavior } from "../interface/behavior.js";
import { Game } from "../game.js";
import { Bullet } from "../gameobjects/tank/bullet.js";
import { Rocket } from "../gameobjects/tank/rocket.js";
export class Shoot extends Behavior {
    constructor(behavioralObject, target = undefined) {
        super(behavioralObject);
        this.fireRate = 40;
        this.lifeTime = 100;
        this.tank = behavioralObject;
        this.target = target;
        this.fireRate = 20 + (this.tank.Data.armor * 30);
    }
    performUpdate() {
        if (this.timer % this.fireRate === 0 && this.tank.Ammo > 0) {
            this.shoot();
        }
        super.performUpdate();
    }
    shoot() {
        this.tank.Ammo--;
        const projectile = (this.tank.Data.armor == 2) ? new Rocket(this.tank, this.target) : new Bullet(this.tank);
        Game.Instance.addBullet(projectile);
    }
    onDeactivateBehavior() {
        if (!this.tank.Turret.active)
            this.tank.Turret.active = true;
    }
}
