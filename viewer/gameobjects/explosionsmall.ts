import { GameObject } from "../core/gameobject.js";
import { Vector2 } from "../utils/vector.js";
import { Animation } from "../utils/animation.js";
import { DomObject } from "../core/domobject.js";

export class ExplosionSmall extends DomObject {

    private animation : Animation

    constructor(position : Vector2) {
        super("explosion-small2")

        this.Position = position

        this.animation = new Animation(this.Div, 97, 97, 2, 5, 4)
        super.draw()
    }

    public update() : void {
        this.animation.update()
        if(this.animation.isDone) this.CanDestroy = true
    }
}