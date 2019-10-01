import { PickUp } from "./pickup.js";
export class Health extends PickUp {
    constructor() {
        super("repair");
        this.health = 5;
    }
}
