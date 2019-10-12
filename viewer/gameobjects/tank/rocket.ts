
import { Game }             from "../../game.js";
import { Turret }           from "./turret.js";
import { Tank }             from "./tank.js";
import { GameObject }       from "../../core/gameobject.js";
import { Vector2 }          from "../../utils/vector.js";
import { DomObject }        from "../../core/domobject.js";
import { AnimationObject } from "../../core/animationobject.js";

export class Rocket extends DomObject {
    private readonly LIFETIME : number = 300

    // Field 
    private timer           : number = 0
    private damage          : number = 30
    private parentTurret    : Turret
    private target          : GameObject

    // Properties
    public get Damage() : number        { return this.damage }
    public get ParentTurret() : GameObject    { return this.parentTurret }
    
    constructor(tank : Tank, target : GameObject = undefined) {
        super("rocket")

        this.parentTurret   = tank.Turret
        this.Position       = this.parentTurret.Position
        this.Rotation       = this.parentTurret.Rotation 
        this.Direction      = Vector2.getVectorFromAngle(this.parentTurret.Rotation)
        this.Speed          = 3

        // als de rocket geen target heeft meegekregen, dan zelf eentje uitzoeken
        this.target = (target) ? target : Game.Instance.getRandomEnemy(tank)
        
        /*
        if(target) {
            console.log("rocket already has a target")
        } else if (this.target) {
            console.log("rocket aquired new target")
        } else {
            console.log("rocket didn't start with a target")
        }
        */

        // move the rocket in front of the barrel // TODO distance depends on tank.Data.armor
        let dist = 43
        this.Position = this.Position.add(this.Direction.scale(dist))

        this.update()
    }

    public update() {
        // life timer
        // if(this.timer++ >= this.LIFETIME) this.destroy()

        if(this.target && !this.target.CanDestroy){
            let difference = this.target.Position.difference(this.Position)
            this.Direction = difference.normalize()
            this.Rotation = this.Direction.angle()
        } else {
            console.log("HALPS rocket lost target")
        }
        
        this.Position = this.Position.add(this.Direction.scale(this.Speed))
        super.update();

        if(this.isInvisible()) this.CanDestroy = true

    }

    public collide(collider : GameObject){
        if (collider instanceof Tank) {
            if(this.parentTurret != collider.Turret) {
                this.destroy()
            }
        }
    }

    private isInvisible() {
        return (this.Position.X < -this.Width ||
           this.Position.Y < -this.Height ||
           this.Position.X > window.innerWidth - 200 ||
           this.Position.Y > window.innerHeight) 
    }

    private destroy() {
        this.CanDestroy = true
        
        Game.Instance.AddGameObject(
            new AnimationObject("explosion-small2", this.Position, this, 97, 97, 2, 5, 4)
        )
    }
}