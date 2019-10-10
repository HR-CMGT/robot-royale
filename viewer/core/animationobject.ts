import { Vector2 }      from "../utils/vector.js";
import { DomObject }    from "./domobject.js";
import { GameObject } from "./gameobject.js";

/**
 * Animation
 */
export class AnimationObject extends DomObject {
    private parent          : GameObject
    private htmlElement     : HTMLElement
    
    private timer           : number = 0
    // private done            : boolean = false

    private frameWidth      : number = 0
    private frameHeight     : number = 0
    private animationSpeed  : number = 0

    private currentRow      : number = 0
    private currentColumn   : number = 0
    private rows            : number = 0
    private columns         : number = 0
    
    // Properties
    // public get isDone() : boolean { return this.done }

    constructor(tag: string, position : Vector2, parent : GameObject, frameWidth: number, frameHeight: number, rows : number, columns : number, animationSpeed: number) {
        super(tag)
        this.parent         = parent
        this.htmlElement    = this.Div
        this.frameWidth     = frameWidth
        this.frameHeight    = frameHeight
        this.rows           = rows
        this.columns        = columns
        this.animationSpeed = animationSpeed

        this.Position       = position

        super.draw()
    }
    
    public update() : void {
        this.timer++
        // next frame
        if(this.timer % this.animationSpeed == 0) {
            this.currentColumn++
            if(this.currentColumn >= this.columns) {
                this.currentColumn = 0
                if(this.currentRow < this.rows - 1) {
                    this.currentRow++
                }
                else {
                    // end of spritesheet
                    // this.done = true
                    this.parent.CanDestroy = true
                    this.CanDestroy = true
                }
            }   
            this.draw()
        }
    }
    
    public draw() : void {
        this.htmlElement.style.backgroundPosition = `${this.currentColumn * -this.frameWidth}px ${this.currentRow * -this.frameHeight}px`
    }
}