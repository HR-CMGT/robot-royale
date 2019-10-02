import { Vector2 } from "./vector.js";

export abstract class GameObject {
    
    private speed       : number    = 0
    private rotation    : number    = 0
    private color       : number    = 0 // 360 hue rotate
    private canDestroy  : boolean   = false
    private position    : Vector2
    private direction   : Vector2
    private div         : HTMLElement

    //Properties
    public get Position() : Vector2     { return this.position }
    public set Position(v : Vector2)    { this.position = v }

    public get Direction() : Vector2    { return this.direction }
    public set Direction(v : Vector2)   { this.direction = v }

    public get Width() : number         { return this.div.clientWidth }
    public get Height() : number        { return this.div.clientHeight }

    public get Div() : HTMLElement      { return this.div }
    public set Div(v : HTMLElement)     { this.div = v }

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

    public get Rectangle() {
        return this.div.getBoundingClientRect()
    }

    constructor(tag : string) {
        this.div = document.createElement(tag)
        let gameview = document.querySelector("#gameview")
        gameview.appendChild(this.div)
    }

    public collide(collider : GameObject) : void {

    }

    public update() {
        this.draw()
    }
    public draw() {
        this.div.style.transform = `translate(${this.position.X - this.Width/2}px, ${this.position.Y - this.Height/2}px) rotate(${this.rotation}deg)`
        // this.div.style.transform = `translate(${this.position.X}px, ${this.position.Y}px) rotate(${this.rotation}deg)`;
        // this.div.style.filter = `hue-rotate(${this.color}deg)`
    }

    public detectCollision(target : GameObject) {
        return (
            this.Rectangle.left     <= target.Rectangle.right   &&
            this.Rectangle.top      <= target.Rectangle.bottom  &&
            target.Rectangle.left   <= this.Rectangle.right     &&
            target.Rectangle.top    <= this.Rectangle.bottom)
    }

    public destroy() {
        this.div.remove()
    }
}