import { GameObject } from "../gameobject.js";
import { Vector2 } from "../vector.js";
import { Tank } from "./tank/tank.js";

export class AmmoBox extends GameObject{

    private ammo : number = 5

    /**
     * @returns the amount of ammo
     */
    public get Ammo() : number { return this.ammo }
    

    constructor() {
        super("ammo")

        this.Position = new Vector2(
            Math.random() * (window.innerWidth - 200 - this.Width), 
            Math.random() * (window.innerHeight - this.Height))
  
        this.update()
    }

    public collide(collider : GameObject){
        if(collider instanceof Tank) {
            this.CanDestroy = true
        }
    }
}