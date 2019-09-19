export class Vector2 {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    get X() { return this.x; }
    set X(value) { this.x = value; }
    get Y() { return this.y; }
    set Y(value) { this.y = value; }
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    difference(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    scale(n) {
        return new Vector2(this.x * n, this.y * n);
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        let mag = this.magnitude();
        return new Vector2(this.x / mag, this.y / mag);
    }
    static reflectX(point, x) {
        return new Vector2(2 * x - point.x, point.y);
    }
    static reflectY(point, y) {
        return new Vector2(point.x, 2 * y - point.y);
    }
    dotProduct(v) {
        return new Vector2(this.x * v.x, this.y * v.y);
    }
    angleBetweenVectors(vector1) {
        return Math.atan2(this.y - vector1.y, this.x - vector1.x) * (180 / Math.PI);
    }
    angle() {
        return Math.atan2(this.Y, this.X) * (180 / Math.PI);
    }
}
