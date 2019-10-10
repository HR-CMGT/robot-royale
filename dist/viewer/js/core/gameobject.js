export class GameObject {
    constructor() {
        this.speed = 0;
        this.rotation = 0;
        this.color = 0;
        this.canDestroy = false;
    }
    get Position() { return this.position; }
    set Position(v) { this.position = v; }
    get Direction() { return this.direction; }
    set Direction(v) { this.direction = v; }
    get Speed() { return this.speed; }
    set Speed(v) { this.speed = v; }
    get CanDestroy() { return this.canDestroy; }
    set CanDestroy(v) { this.canDestroy = v; }
    get Rotation() { return this.rotation; }
    set Rotation(deg) { this.rotation = deg; }
    collide(collider) {
    }
    update() {
        this.draw();
    }
}
