import { GameObject } from "../../gameobject.js";
import { Vector2 } from "../../vector.js";
import { Tank } from "../tank/tank.js";

export class PickUp extends GameObject{
    
    // Consts
    public static readonly MAX_PICKUPS   : number = 5
    public static readonly INTERVAL_NEW_PICKUP : number = 20
    public static NUMBER_OF_PICKUPS      : number = 0
    public static DELTA_TIME_PICKUPS      : number = 0

    
    protected ammo    : number = 0
    protected health  : number = 0

    /**
     * @returns the amount of ammo
     */
    public get Ammo() : number { return this.ammo }
    /**
     * @returns the amount of health gained by the Game Object
     */
    public get Health() : number { return this.health }

    constructor(tag : string) {
        super(tag)

        this.Position = new Vector2(
            Math.random() * (window.innerWidth - 200 - this.Width), 
            Math.random() * (window.innerHeight - this.Height))
  
        this.draw()
    }

    public update() { }

    public collide(collider : GameObject){
        if(collider instanceof Tank) {
            this.CanDestroy = true
        }
    }
}