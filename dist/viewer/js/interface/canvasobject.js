import { GameObject } from "./gameobject.js";
export class CanvasObject extends GameObject {
    constructor(x, y, imageName) {
        super(x, y, "name");
        var canvas = document.getElementsByTagName("canvas")[0];
        this.context = canvas.getContext('2d');
        this.image = new Image();
        this.image.src = imageName;
    }
    draw() {
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
