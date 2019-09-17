import { Behavior } from "../interface/behavior.js";
export class Forward extends Behavior {
    constructor(behavioralObject) {
        super(behavioralObject);
        console.log("Behavior: forward");
        this.lifeTime = 100;
    }
    performUpdate() {
        super.performUpdate();
        this.windowWidth = window.innerWidth - 200;
        this.windowHeight = window.innerHeight;
        this.BehavioralObject.Position =
            this.BehavioralObject.Position.add(this.BehavioralObject.Direction.scale(this.BehavioralObject.Speed));
        if (this.BehavioralObject.Position.X < -this.BehavioralObject.Width) {
            this.BehavioralObject.Position.X = this.windowWidth;
        }
        if (this.BehavioralObject.Position.Y < -this.BehavioralObject.Height) {
            this.BehavioralObject.Position.Y = this.windowHeight;
        }
        if (this.BehavioralObject.Position.X > this.windowWidth) {
            this.BehavioralObject.Position.X = -this.BehavioralObject.Width;
        }
        if (this.BehavioralObject.Position.Y > this.windowHeight) {
            this.BehavioralObject.Position.Y = -this.BehavioralObject.Height;
        }
    }
}
