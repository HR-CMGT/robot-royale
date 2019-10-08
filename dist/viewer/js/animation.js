import { Behavior } from "./interface/behavior.js";
export class Animation extends Behavior {
    constructor(behavioralObject, frameWidth, frameHeight, animationSpeed, maxFrames) {
        super(behavioralObject);
        this.frameWidth = 0;
        this.frameHeight = 0;
        this.animationSpeed = 0;
        this.currentFrame = 0;
        this.maxFrames = 0;
        this.htmlElement = behavioralObject.Div;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.animationSpeed = animationSpeed;
        this.maxFrames = maxFrames;
        this.lifeTime = 200;
    }
    update() {
        if (this.timer % this.animationSpeed == 0)
            this.currentFrame++;
        if (this.currentFrame > this.maxFrames - 1)
            this.timer = this.lifeTime;
    }
    draw() {
        this.htmlElement.style.backgroundPosition = (this.currentFrame * -this.frameWidth) + "px 0px";
    }
}
