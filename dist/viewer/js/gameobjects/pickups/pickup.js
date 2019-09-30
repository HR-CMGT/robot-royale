import { GameObject } from "../../gameobject.js";
import { Vector2 } from "../../vector.js";
import { Tank } from "../tank/tank.js";
export class PickUp extends GameObject {
    constructor(tag) {
        super(tag);
        this.ammo = 0;
        this.health = 0;
        this.Position = new Vector2(Math.random() * (window.innerWidth - 200 - this.Width), Math.random() * (window.innerHeight - this.Height));
        this.draw();
    }
    get Ammo() { return this.ammo; }
    get Health() { return this.health; }
    update() { }
    collide(collider) {
        if (collider instanceof Tank) {
            this.CanDestroy = true;
        }
    }
}
PickUp.MAX_PICKUPS = 5;
PickUp.INTERVAL_NEW_PICKUP = 20;
PickUp.NUMBER_OF_PICKUPS = 0;
PickUp.DELTA_TIME_PICKUPS = 0;
