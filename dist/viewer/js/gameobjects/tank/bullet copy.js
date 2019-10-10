import { GameObject } from "../../gameobject.js";
import { Game } from "../../game.js";
import { Tank } from "./tank.js";
import { Vector2 } from "../../vector.js";
import { ExplosionSmall } from "../explosionsmall.js";
export class Bullet extends GameObject {
    constructor(tank) {
        super("bullet");
        this.damage = 20;
        this.parentTurret = tank.Turret;
        this.Position = this.parentTurret.Position;
        this.Rotation = this.parentTurret.Rotation;
        this.Direction = Vector2.getVectorFromAngle(this.parentTurret.Rotation);
        this.Speed = 5;
        let dist = 40;
        this.Position = this.Position.add(this.Direction.scale(dist));
        if (tank.Data.armor == 2)
            this.Div.classList.add("rocket");
        this.update();
    }
    get Damage() { return this.damage; }
    get ParentTurret() { return this.parentTurret; }
    update() {
        this.Position = this.Position.add(this.Direction.scale(this.Speed));
        super.update();
        if (this.isInvisible())
            this.CanDestroy = true;
    }
    collide(collider) {
        if (collider instanceof Tank) {
            if (this.parentTurret != collider.Turret) {
                this.CanDestroy = true;
                Game.Instance.AddGameObject(new ExplosionSmall(this.Position));
            }
        }
    }
    isInvisible() {
        return (this.Position.X < -this.Width ||
            this.Position.Y < -this.Height ||
            this.Position.X > window.innerWidth - 200 ||
            this.Position.Y > window.innerHeight);
    }
}
