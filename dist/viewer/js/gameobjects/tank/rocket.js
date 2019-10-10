import { Game } from "../../game.js";
import { Tank } from "./tank.js";
import { Vector2 } from "../../utils/vector.js";
import { DomObject } from "../../core/domobject.js";
import { AnimationObject } from "../../core/animationobject.js";
export class Rocket extends DomObject {
    constructor(tank, target = undefined) {
        super("rocket");
        this.LIFETIME = 150;
        this.timer = 0;
        this.damage = 30;
        this.parentTurret = tank.Turret;
        this.Position = this.parentTurret.Position;
        this.Rotation = this.parentTurret.Rotation;
        this.Direction = Vector2.getVectorFromAngle(this.parentTurret.Rotation);
        this.Speed = 3;
        this.target = (target) ? target : Game.Instance.getRandomEnemy(tank);
        let dist = 43;
        this.Position = this.Position.add(this.Direction.scale(dist));
        this.update();
    }
    get Damage() { return this.damage; }
    get ParentTurret() { return this.parentTurret; }
    update() {
        if (this.timer++ >= this.LIFETIME)
            this.destroy();
        if (this.target) {
            let difference = this.target.Position.difference(this.Position);
            this.Direction = difference.normalize();
            this.Rotation = this.Direction.angle();
        }
        else {
            console.log("rocket lost target");
        }
        this.Position = this.Position.add(this.Direction.scale(this.Speed));
        super.update();
        if (this.isInvisible())
            this.CanDestroy = true;
    }
    collide(collider) {
        if (collider instanceof Tank) {
            if (this.parentTurret != collider.Turret) {
                this.destroy();
            }
        }
    }
    isInvisible() {
        return (this.Position.X < -this.Width ||
            this.Position.Y < -this.Height ||
            this.Position.X > window.innerWidth - 200 ||
            this.Position.Y > window.innerHeight);
    }
    destroy() {
        this.CanDestroy = true;
        Game.Instance.AddGameObject(new AnimationObject("explosion-small2", this.Position, this, 97, 97, 2, 5, 4));
    }
}
