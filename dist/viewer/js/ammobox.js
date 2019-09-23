import { GameObject } from "./gameobject.js";
import { Vector2 } from "./vector.js";
import { Tank } from "./tank.js";
export class AmmoBox extends GameObject {
    constructor() {
        super("ammo");
        this.ammo = 5;
        this.Position = new Vector2(Math.random() * (window.innerWidth - 200 - this.Width), Math.random() * (window.innerHeight - this.Height));
        this.update();
    }
    get Ammo() { return this.ammo; }
    collide(collider) {
        if (collider instanceof Tank) {
            this.CanDestroy = true;
        }
    }
}
