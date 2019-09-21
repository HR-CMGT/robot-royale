import { GameObject } from "./gameobject.js";
import { Tank } from "./tank.js";
import { Vector2 } from "./vector.js";
export class Bullet extends GameObject {
    constructor(parent) {
        super("bullet");
        this.damage = 20;
        this.Position = parent.Position;
        this.Rotation = parent.Rotation;
        this.Direction = Vector2.getVectorFromAngle(parent.Rotation);
        this.Speed = 5;
        this.parentTurret = parent;
        this.update();
    }
    get Damage() { return this.damage; }
    get ParentTurret() { return this.parentTurret; }
    update() {
        this.Position = this.Position.add(this.Direction.scale(this.Speed));
        if (this.isInvisible())
            this.CanDestroy = true;
        super.update();
    }
    collide(collider) {
        if (collider instanceof Tank) {
            if (this.parentTurret != collider.Turret) {
                console.log("Bullet hit");
                this.CanDestroy = true;
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
