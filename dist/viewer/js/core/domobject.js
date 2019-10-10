import { GameObject } from "./gameobject.js";
export class DomObject extends GameObject {
    get Width() { return this.div.clientWidth; }
    get Height() { return this.div.clientHeight; }
    get Div() { return this.div; }
    set Div(v) { this.div = v; }
    get Rectangle() {
        return this.div.getBoundingClientRect();
    }
    constructor(tag) {
        super();
        this.div = document.createElement(tag);
        let gameview = document.querySelector("#gameview");
        gameview.appendChild(this.div);
    }
    draw() {
        this.div.style.transform = `translate(${this.Position.X - this.Width / 2}px, ${this.Position.Y - this.Height / 2}px) rotate(${this.Rotation}deg)`;
    }
    detectCollision(target) {
        return (this.Rectangle.left <= target.Rectangle.right &&
            this.Rectangle.top <= target.Rectangle.bottom &&
            target.Rectangle.left <= this.Rectangle.right &&
            target.Rectangle.top <= this.Rectangle.bottom);
    }
    remove() {
        this.div.remove();
    }
}
