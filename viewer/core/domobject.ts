import { GameObject } from "./gameobject.js";

export class DomObject extends GameObject{

    // Fields
    private div         : HTMLElement

    // Properties
    public get Width() : number         { return this.div.clientWidth }
    public get Height() : number        { return this.div.clientHeight }

    public get Div() : HTMLElement      { return this.div }
    public set Div(v : HTMLElement)     { this.div = v }

    public get Rectangle() {
        return this.div.getBoundingClientRect()
    }

    constructor(tag : string) {
        super()
        this.div = document.createElement(tag)
        let gameview = document.querySelector("#gameview")
        gameview.appendChild(this.div)
    }

    public draw() {
        this.div.style.transform = `translate(${this.Position.X - this.Width/2}px, ${this.Position.Y - this.Height/2}px) rotate(${this.Rotation}deg)`
    }

    public detectCollision(target : GameObject) {
        return (
            this.Rectangle.left     <= target.Rectangle.right   &&
            this.Rectangle.top      <= target.Rectangle.bottom  &&
            target.Rectangle.left   <= this.Rectangle.right     &&
            target.Rectangle.top    <= this.Rectangle.bottom)
    }

    public remove() {
        this.div.remove()
    }
}