import { Behavior } from "../interface/behavior.js";
export class Forward extends Behavior {
    constructor(gameObject) {
        super(gameObject);
        this.LifeTime = 100;
    }
    performUpdate() {
        super.performUpdate();
        this.GameObject.X += this.GameObject.XDir * this.GameObject.Speed;
        this.GameObject.Y += this.GameObject.YDir * this.GameObject.Speed;
        if (this.GameObject.X < 0 || this.GameObject.X + 120 > (window.innerWidth - 200)) {
            this.GameObject.XDir *= -1;
        }
        if (this.GameObject.Y < 0 || this.GameObject.Y + 120 > (window.innerHeight)) {
            this.GameObject.YDir *= -1;
        }
    }
}
