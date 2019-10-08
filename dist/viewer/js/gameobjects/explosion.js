import { GameObject } from "../gameobject.js";
import { Animation } from "../interface/animation.js";
export class Explosion extends GameObject {
    constructor(position) {
        super("explosion");
        this.Position = position;
        this.animation = new Animation(this.Div, 146, 145, 3, 3, 7);
        super.draw();
    }
    update() {
        this.animation.update();
        if (this.animation.isDone)
            this.CanDestroy = true;
    }
}
