import { GameObject } from "../gameobject.js";
import { Vector2 } from "../vector.js";
import { Tank } from "./tank/tank.js";
export class AmmoBox extends GameObject {
    constructor(tag) {
        super(tag);
        this.ammo = 0;
        this.health = 0;
        if (tag == "ammo")
            this.ammo = 5;
        else
            this.health = 20;
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
AmmoBox.MAX_AMMO_BOXES = 5;
AmmoBox.INTERVAL_NEW_BOX = 20;
AmmoBox.NUMBER_OF_AMMO_BOXES = 0;
AmmoBox.DELTA_TIME_BOX_ADDED = 0;
