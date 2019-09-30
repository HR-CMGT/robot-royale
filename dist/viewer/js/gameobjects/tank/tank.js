import { BehavioralObject } from "../../interface/behavioralObject.js";
import { Forward } from "../../behaviors/forward.js";
import { Vector2 } from "../../vector.js";
import { Bullet } from "./bullet.js";
import { PickUp } from "../pickups/pickup.js";
import { Turret } from "./turret.js";
export class Tank extends BehavioralObject {
    constructor(data, status) {
        super("tank-body");
        this.health = 100;
        this.ammo = 0;
        this.Behavior = new Forward(this);
        this.data = data;
        this.status = status;
        this.Ammo = 10;
        this.Div.classList.add(`armor-${data.armor}`);
        this.Div.style.filter = `hue-rotate(${data.color}deg)`;
        this.Div.innerHTML = data.nickname;
        this.Position = new Vector2(Math.random() * (window.innerWidth - 300), Math.random() * (window.innerHeight - 100));
        this.Direction = new Vector2(Math.random(), Math.random());
        this.Rotation = this.Direction.angle();
        this.Speed = (Math.random() * 4) + 1;
        this.turret = new Turret(this);
        this.update();
    }
    get Data() { return this.data; }
    get Health() { return this.health; }
    set Health(v) {
        this.health = v;
        if (this.health > 100)
            this.health = 100;
        this.status.Health = this.health;
    }
    get Ammo() { return this.ammo; }
    set Ammo(v) {
        this.ammo = v;
        this.status.Ammo = this.ammo;
    }
    get Turret() { return this.turret; }
    collide(collider) {
        if (collider instanceof Bullet) {
            if (collider.ParentTurret instanceof Turret) {
                if (collider.ParentTurret != this.Turret) {
                    console.log("Tank got hit!");
                    this.health -= collider.Damage;
                    if (this.health <= 0)
                        this.CanDestroy = true;
                }
            }
        }
        if (collider instanceof PickUp) {
            this.Ammo += collider.Ammo;
            this.Health += collider.Health;
        }
    }
    update() {
        super.update();
        this.Behavior.performUpdate();
        this.turret.update();
    }
    destroy() {
        console.log("Tank died");
        this.status.remove();
        this.turret.destroy();
        super.destroy();
    }
}
