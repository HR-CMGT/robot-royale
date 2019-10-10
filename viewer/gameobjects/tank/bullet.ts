import { GameObject }       from "../../core/gameobject.js";
import { Game }             from "../../game.js";
import { Turret }           from "./turret.js";
import { Tank }             from "./tank.js";
import { Vector2 }          from "../../utils/vector.js";
import { DomObject }        from "../../core/domobject.js";
import { AnimationObject }  from "../../core/animationobject.js";

export class Bullet extends DomObject {
    
    // Field 
    private damage : number = 5
    private parentTurret : Turret

    // Properties
    public get Damage() : number        { return this.damage }
    public get ParentTurret() : GameObject    { return this.parentTurret }
    
    constructor(tank : Tank) {
            // super("./images/bullet.png") // for canvas object
        super("bullet")

        this.parentTurret = tank.Turret
        this.Position = this.parentTurret.Position
        this.Rotation = this.parentTurret.Rotation 
        this.Direction = Vector2.getVectorFromAngle(this.parentTurret.Rotation)
        this.Speed        = 5

        // move the bullet in front of the barrel // TODO distance depends on tank.Data.armor
        let dist = 40
        this.Position = this.Position.add(this.Direction.scale(dist))

        // different bullet graphic for different tanks
        // if(tank.Data.armor == 2) this.Div.classList.add("rocket")

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
                // Game.Instance.AddGameObject(new ExplosionSmall(this.Position))
                Game.Instance.AddGameObject(
                    new AnimationObject("explosion-small", this.Position, 56, 56, 1, 6, 3)
                )
            }
        }
    }

    private isInvisible() {
        return (this.Position.X < -this.Width ||
           this.Position.Y < -this.Height ||
           this.Position.X > window.innerWidth - 200 ||
           this.Position.Y > window.innerHeight) 
    }
    // for convas object
    // private isInvisible() {
    //     return (this.Position.X < -this.image.width ||
    //        this.Position.Y < -this.image.height ||
    //        this.Position.X > window.innerWidth - 200 ||
    //        this.Position.Y > window.innerHeight) 
    // }
}