import { Vector2 } from "../utils/vector.js";

export abstract class GameObject {
    
    private speed       : number    = 0
    private rotation    : number    = 0
    private color       : number    = 0 // 360 hue rotate
    private canDestroy  : boolean   = false
    private position    : Vector2
    private direction   : Vector2
    

    //Properties
    public get Position() : Vector2     { return this.position }
    public set Position(v : Vector2)    { this.position = v }

    public get Direction() : Vector2    { return this.direction }
    public set Direction(v : Vector2)   { this.direction = v }

    public get Speed() : number         { return this.speed }
    public set Speed(v : number)        { this.speed = v }

    public get CanDestroy() : boolean   { return this.canDestroy }
    public set CanDestroy(v : boolean)  { this.canDestroy = v }

    /**
     * Rotation in degrees
     */
    public get Rotation() : number      { return this.rotation }
    /**
     * Rotation is used to visually rotate the object (Css)
     * @param rotation in degrees (360)
     */
    public set Rotation(deg : number)   { this.rotation = deg }

    public abstract get Rectangle() : any

    constructor() {
        
    }

    public collide(collider : GameObject) : void {

    }

    public update() {
        this.draw()
    }
    
    public abstract remove() : void
    public abstract draw() : void
    public abstract detectCollision(target : GameObject) : boolean
}