export class GameObject {
    constructor(tag) {
        this.speed = 0;
        this.rotation = 0;
        this.color = 0;
        this.canDestroy = false;
        this.div = document.createElement(tag);
        this.color = Math.random() * 360;
        let gameview = document.querySelector("#gameview");
        gameview.appendChild(this.div);
    }
    get Position() { return this.position; }
    set Position(v) { this.position = v; }
    get Direction() { return this.direction; }
    set Direction(v) { this.direction = v; }
    get Width() { return this.div.clientWidth; }
    get Height() { return this.div.clientHeight; }
    get Div() { return this.div; }
    set Div(v) { this.div = v; }
    get Speed() { return this.speed; }
    set Speed(v) { this.speed = v; }
    get CanDestroy() { return this.canDestroy; }
    set CanDestroy(v) { this.canDestroy = v; }
    get Rotation() { return this.rotation; }
    set Rotation(deg) { this.rotation = deg; }
    get Rectangle() {
        return this.div.getBoundingClientRect();
    }
    collide(collider) {
    }
    update() {
        this.draw();
    }
    draw() {
        this.div.style.transform = `translate(${this.position.X - this.Width / 2}px, ${this.position.Y - this.Height / 2}px) rotate(${this.rotation}deg)`;
        this.div.style.filter = `hue-rotate(${this.color}deg)`;
    }
    detectCollision(target) {
        return (this.Rectangle.left <= target.Rectangle.right &&
            this.Rectangle.top <= target.Rectangle.bottom &&
            target.Rectangle.left <= this.Rectangle.right &&
            target.Rectangle.top <= this.Rectangle.bottom);
    }
    destroy() {
        this.div.remove();
    }
}
