import { GameObject } from "../../gameobject.js";
import { Game } from "../../game.js";
import { Turret } from "./turret.js";
import { Tank } from "./tank.js";
import { Vector2 } from "../../vector.js";

export class Bullet extends GameObject {
    
    // Field 
    private damage : number = 20
    private parentTurret : Turret

    // Properties
    public get Damage() : number        { return this.damage }
    public get ParentTurret() : GameObject    { return this.parentTurret }
    
    constructor(parent : Turret) {
        super("bullet")
        
        this.Position     = parent.Position
        this.Rotation     = parent.Rotation 
        this.Direction    = Vector2.getVectorFromAngle(parent.Rotation)
        this.Speed        = 5
        this.parentTurret = parent

        // move the bullet in front of the barrel
        // TODO distance depends on parentt
        let dist = 40
        this.Position = this.Position.add(this.Direction.scale(dist))

        this.update()
    }

    public update() {
        this.Position = this.Position.add(this.Direction.scale(this.Speed))
        super.update();

        if(this.isInvisible()) this.CanDestroy = true

    }

    public collide(collider : GameObject){
        if (collider instanceof Tank) {
            if(this.parentTurret != collider.Turret) {
                // console.log("Bullet hit")
                this.CanDestroy = true
            }
        }
    }

    private isInvisible() {
        return (this.Position.X < -this.Width ||
           this.Position.Y < -this.Height ||
           this.Position.X > window.innerWidth - 200 ||
           this.Position.Y > window.innerHeight) 
    }
}