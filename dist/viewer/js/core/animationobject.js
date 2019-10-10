import { DomObject } from "./domobject.js";
export class AnimationObject extends DomObject {
    constructor(tag, position, parent, frameWidth, frameHeight, rows, columns, animationSpeed) {
        super(tag);
        this.timer = 0;
        this.frameWidth = 0;
        this.frameHeight = 0;
        this.animationSpeed = 0;
        this.currentRow = 0;
        this.currentColumn = 0;
        this.rows = 0;
        this.columns = 0;
        this.parent = parent;
        this.htmlElement = this.Div;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.rows = rows;
        this.columns = columns;
        this.animationSpeed = animationSpeed;
        this.Position = position;
        super.draw();
    }
    update() {
        this.timer++;
        if (this.timer % this.animationSpeed == 0) {
            this.currentColumn++;
            if (this.currentColumn >= this.columns) {
                this.currentColumn = 0;
                if (this.currentRow < this.rows - 1) {
                    this.currentRow++;
                }
                else {
                    this.parent.CanDestroy = true;
                    this.CanDestroy = true;
                }
            }
            this.draw();
        }
    }
    draw() {
        this.htmlElement.style.backgroundPosition = `${this.currentColumn * -this.frameWidth}px ${this.currentRow * -this.frameHeight}px`;
    }
}
