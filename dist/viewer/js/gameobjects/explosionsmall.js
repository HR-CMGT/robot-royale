import { Animation } from "../utils/animation.js";
import { DomObject } from "../core/domobject.js";
export class ExplosionSmall extends DomObject {
    constructor(position) {
        super("explosion-small2");
        this.Position = position;
        this.animation = new Animation(this.Div, 97, 97, 2, 5, 4);
        super.draw();
    }
    update() {
        this.animation.update();
        if (this.animation.isDone)
            this.CanDestroy = true;
    }
}
