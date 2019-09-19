export class Vector2 {
    // Fields
    private x : number = 0
    private y : number = 0

    //Properties
    public get X(): number          { return this.x;        }
    public set X(value: number)     { this.x = value;       }

    public get Y(): number          { return this.y;        }
    public set Y(value: number)     { this.y = value;       }
    
    constructor(x:number, y:number) {
        this.x = x
        this.y = y
    }

    // todo: methods static maken, nu worden ze telkens mee gekopieerd
    
    public add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y)
    }

    public difference(v: Vector2): Vector2 {
        return new Vector2(this.x - v.x, this.y - v.y)
    }

    public scale(n: number): Vector2 {
        return new Vector2(this.x * n, this.y * n)
    }

    /**
     * The length of the vector
     */
    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    
    // x en y delen door de lengte (magnitude) geeft normalized
    public normalize():Vector2 {
        let mag = this.magnitude()
        return new Vector2(this.x/mag, this.y/mag)
    }

    public static reflectX(point: Vector2, x: number) {
        return new Vector2(2 * x - point.x, point.y)
    }

    public static reflectY(point: Vector2, y: number) {
        return new Vector2(point.x, 2 * y - point.y)
    }

    public dotProduct(v : Vector2) : Vector2 {
        return new Vector2(this.x * v.x, this.y * v.y)
    }

    /**
     * The angle between two vectors in degrees
     */
    public angleBetweenVectors(vector1 : Vector2) : number {
        return Math.atan2(this.y - vector1.y, this.x - vector1.x) * (180 / Math.PI)
    }

    /**
     * The angle from a vector in degrees
     */
    public angle() : number {
        return Math.atan2(this.Y, this.X) * (180 / Math.PI)
    }
}