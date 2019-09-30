import { PickUp } from "./pickup.js";

export class Ammo extends PickUp {
    constructor() {
       super("ammo") 
       this.ammo = 5
    }
}