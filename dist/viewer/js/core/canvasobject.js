import { GameObject } from "./gameobject.js";
export class CanvasObject extends GameObject {
    get Rectangle() {
        return {
            left: this.Position.X,
            right: this.Position.Y + this.image.width,
            top: this.Position.Y,
            bottom: this.Position.Y + this.image.height
        };
    }
    constructor(imageName) {
        super();
        this.canvas = document.getElementsByTagName("canvas")[0];
        this.context = this.canvas.getContext('2d');
        this.image = new Image();
        this.image.src = imageName;
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let scale = 1;
        this.context.setTransform(scale, 0, 0, scale, this.Position.X, this.Position.Y);
        this.context.rotate(this.Rotation * (Math.PI / 180));
        this.context.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
    remove() {
        this.image.remove();
    }
    detectCollision(target) {
        return (this.Rectangle.left <= target.Rectangle.right &&
            this.Rectangle.top <= target.Rectangle.bottom &&
            target.Rectangle.left <= this.Rectangle.right &&
            target.Rectangle.top <= this.Rectangle.bottom);
    }
}
