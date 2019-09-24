import { Behavior } from "../interface/behavior.js";
export class Break extends Behavior {
    constructor(behavioralObject) {
        super(behavioralObject);
        this.speed = 0;
        this.lifeTime = 50;
    }
    performUpdate() {
        super.performUpdate();
        this.windowWidth = window.innerWidth - 200;
        this.windowHeight = window.innerHeight;
        this.BehavioralObject.Position =
            this.BehavioralObject.Position.add(this.BehavioralObject.Direction.scale(this.speed));
        this.speed *= 0.9;
        if (this.speed <= 0) {
            this.timer = 0;
        }
        this.checkWindowContainsObject();
    }
    onActivateBehavior() {
        this.speed = this.BehavioralObject.Speed;
        console.log(this.speed);
    }
    checkWindowContainsObject() {
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
