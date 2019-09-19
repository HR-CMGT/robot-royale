import { GameObject } from "./gameobject.js";
import { Vector2 } from "./vector.js";

export class AmmoBox extends GameObject{
    constructor() {
        super("ammo")

        this.Position = new Vector2(
            Math.random() * (window.innerWidth - 200 - this.Width), 
            Math.random() * (window.innerHeight - this.Height))
  
        this.update()
    }
}