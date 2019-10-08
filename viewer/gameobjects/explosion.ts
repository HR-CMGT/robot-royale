import { GameObject } from "../gameobject.js";
import { Vector2 } from "../vector.js";
import { Animation } from "../interface/animation.js";

export class Explosion extends GameObject {

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