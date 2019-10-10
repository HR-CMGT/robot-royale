import { DomObject } from "../core/domobject.js";
export class ExplosionSmall extends DomObject {
    constructor(position) {
        super("explosion-small2");
        this.Position = position;
        super.draw();
    }
    update() {
        this.animation.update();
    }
}
