import { GameObject } from "../gameobject.js";
import { Animation } from "../interface/animation.js";
export class ExplosionSmall extends GameObject {
    constructor(position) {
        super("explosion-small");
        this.Position = position;
        this.animation = new Animation(this.Div, 58, 58, 1, 6, 7);
        super.draw();
    }
    update() {
        this.animation.update();
        if (this.animation.isDone)
            this.CanDestroy = true;
    }
}
