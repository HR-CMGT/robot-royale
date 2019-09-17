import { GameObject } from "./gameobject.js";
import { Game } from "./game.js";

export class Bullet extends GameObject {
    
    // Field 
    private damage : number = 20
    private parent : GameObject

    // Properties
    public get Damage() : number        { return this.damage }
    public get Parent() : GameObject    { return this.parent }
    
    constructor(parent : GameObject) {
        super("bullet")
        
        this.Position   = parent.Position
        this.Direction  = parent.Direction
        this.Rotation   = parent.Rotation 
        this.Speed      = 5
        this.parent     = parent

        this.update()
    }

    public update() {
        this.Position = this.Position.add(this.Direction.scale(this.Speed))

        if(this.isInvisible()) this.CanDestroy = true

        super.update();
    }

    public collide(collider : GameObject){
        if(this.parent != collider) {
            console.log("Bullet hit")
            this.CanDestroy = true
        }
    }

    private isInvisible() {
        return (this.Position.X < -this.Width ||
           this.Position.Y < -this.Height ||
           this.Position.X > window.innerWidth - 200 ||
           this.Position.Y > window.innerHeight) 
    }
}