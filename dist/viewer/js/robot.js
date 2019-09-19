import { BehavioralObject } from "./interface/behavioralObject.js";
import { Forward } from "./behaviors/forward.js";
import { Vector2 } from "./vector.js";
import { Bullet } from "./bullet.js";
export class Robot extends BehavioralObject {
    constructor(data, status) {
        super("robot");
        this.health = 100;
        this.ammo = 0;
        this.Behavior = new Forward(this);
        this.data = data;
        this.status = status;
        this.Ammo = 10;
        this.Div.innerHTML = data.name;
        this.Position = new Vector2(Math.random() * (window.innerWidth - 300), Math.random() * (window.innerHeight - 100));
        this.Direction = new Vector2(Math.random(), Math.random());
        this.Rotation = this.Direction.angle();
        this.Speed = (Math.random() * 4) + 1;
        this.update();
    }
    get Data() { return this.data; }
    get Health() { return this.health; }
    set Health(v) { this.health = v; }
    get Ammo() { return this.ammo; }
    set Ammo(v) {
        this.ammo = v;
        this.status.Ammo = "Bullets " + this.ammo;
    }
    collide(collider) {
        if (collider instanceof Bullet) {
            if (collider.Parent != this) {
                console.log("Robot got hit!");
                this.health -= collider.Damage;
                this.data.health = this.health;
                this.status.update(this.data.health);
                if (this.health <= 0)
                    this.CanDestroy = true;
            }
        }
    }
    update() {
        this.Behavior.performUpdate();
        super.update();
    }
    destroy() {
        console.log("Robot died");
        this.status.remove();
        super.destroy();
    }
}
