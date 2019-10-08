import { GameObject } from "../../gameobject.js";
import { Game } from "../../game.js";
import { Tank } from "./tank.js";
import { Vector2 } from "../../vector.js";
import { ExplosionSmall } from "../explosionsmall.js";
export class Bullet extends GameObject {
    constructor(parent) {
        super("bullet");
        this.damage = 20;
        this.Position = parent.Position;
        this.Rotation = parent.Rotation;
        this.Direction = Vector2.getVectorFromAngle(parent.Rotation);
        this.Speed = 5;
        this.parentTurret = parent;
        let dist = 40;
        this.Position = this.Position.add(this.Direction.scale(dist));
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
