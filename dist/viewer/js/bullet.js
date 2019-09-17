import { GameObject } from "./gameobject.js";
export class Bullet extends GameObject {
    constructor(parent) {
        super("bullet");
        this.damage = 20;
        this.Position = parent.Position;
        this.Direction = parent.Direction;
        this.Rotation = parent.Rotation;
        this.Speed = 5;
        this.parent = parent;
        this.update();
    }
    get Damage() { return this.damage; }
    get Parent() { return this.parent; }
    update() {
        this.Position = this.Position.add(this.Direction.scale(this.Speed));
        if (this.isInvisible())
            this.CanDestroy = true;
        super.update();
    }
    collide(collider) {
        if (this.parent != collider) {
            console.log("Bullet hit");
            this.CanDestroy = true;
        }
    }
    isInvisible() {
        return (this.Position.X < -this.Width ||
            this.Position.Y < -this.Height ||
            this.Position.X > window.innerWidth - 200 ||
            this.Position.Y > window.innerHeight);
    }
}
