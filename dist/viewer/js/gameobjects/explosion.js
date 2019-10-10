import { DomObject } from "../core/domobject.js";
export class Explosion extends DomObject {
    constructor(position) {
        super("explosion");
        this.Position = position;
        super.draw();
    }
    update() {
        this.animation.update();
    }
}
