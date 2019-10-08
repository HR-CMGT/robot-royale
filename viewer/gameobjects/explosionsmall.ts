import { GameObject } from "../gameobject.js";
import { Vector2 } from "../vector.js";
import { Animation } from "../interface/animation.js";

export class ExplosionSmall extends GameObject {

    private animation : Animation

    constructor(position : Vector2) {
        super("explosion-small")

        this.Position = position

        this.animation = new Animation(this.Div, 58, 58, 1, 6, 7)
        super.draw()
    }

    public update() : void {
        this.animation.update()
        if(this.animation.isDone) this.CanDestroy = true
    }
}