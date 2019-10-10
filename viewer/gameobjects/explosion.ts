import { Vector2 } from "../utils/vector.js";
import { Animation } from "../utils/animation.js";
import { DomObject } from "../core/domobject.js";

export class Explosion extends DomObject {

    private animation : Animation

    constructor(position : Vector2) {
        super("explosion")

        this.Position = position

        this.animation = new Animation(this.Div, 146, 145, 3, 3, 7)
        super.draw()
    }

    public update() : void {
        this.animation.update()
        if(this.animation.isDone) this.CanDestroy = true
    }
}