export class Animation {
    constructor(htmlElement, frameWidth, frameHeight, rows, columns, animationSpeed) {
        this.timer = 0;
        this.done = false;
        this.frameWidth = 0;
        this.frameHeight = 0;
        this.animationSpeed = 0;
        this.currentRow = 0;
        this.currentColumn = 0;
        this.rows = 0;
        this.columns = 0;
        this.htmlElement = htmlElement;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.rows = rows;
        this.columns = columns;
        this.animationSpeed = animationSpeed;
    }
    get isDone() { return this.done; }
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
                    this.done = true;
                }
            }
            this.draw();
        }
    }
    draw() {
        this.htmlElement.style.backgroundPosition = `${this.currentColumn * -this.frameWidth}px ${this.currentRow * -this.frameHeight}px`;
    }
}
