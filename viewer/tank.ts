import { StatusBar } from "./ui/statusbar.js";
import { BehavioralObject } from "./interface/behavioralObject.js";
import { Forward } from "./behaviors/forward.js";
import { Vector2 } from "./vector.js";
import { GameObject } from "./gameobject.js";
import { Bullet } from "./bullet.js";
import { AmmoBox } from "./ammobox.js";
import { Turret } from "./turret.js";

export class Tank extends BehavioralObject{
    
    // Fields
    private data    : TankData
    private status  : StatusBar
    private health  : number = 100
    private ammo    : number = 0
    private turret  : Turret

    // Properties
    public get Data() : TankData   { return this.data      }

    public get Health() : number    { return this.health    }
    public set Health(v:number)     { this.health = v       }
    
    public get Ammo() : number      { return this.ammo      }
    public set Ammo(v : number)     { 
        this.ammo = v        
        this.status.Ammo = this.ammo
    }
    
    
    public get Turret() : Turret    { return this.turret    }
    

    constructor(data : TankData, status : StatusBar) {
        super("tank-body")
        
        // Default
        // Todo how to handle this?
        this.Behavior = new Forward(this)

        this.data   = data
        this.status = status
        this.Ammo   = 10

        // this.Div.style.backgroundColor = data.color
        this.Div.innerHTML = data.name

        this.Position = new Vector2(
            Math.random() * (window.innerWidth - 300), 
            Math.random() * (window.innerHeight - 100))
        
            
        // let rad = this.Rotation / (180/Math.PI)
        this.Direction = new Vector2(Math.random(), Math.random())
        this.Rotation = this.Direction.angle()
        
        this.Speed  = (Math.random() * 4) + 1 // todo dependent on armor
        
        this.turret = new Turret(this)

        this.update()
    }

    public collide(collider : GameObject) : void {
        if(collider instanceof Bullet) {
            if (collider.ParentTurret instanceof Turret) {
                if(collider.ParentTurret != this.Turret) {
                    console.log("Tank got hit!")
                    this.health -= collider.Damage
                    this.data.health = this.health
                    this.status.update(this.data.health)
    
                    if(this.health <= 0) this.CanDestroy = true
                }
            }
        }
        if(collider instanceof AmmoBox) {
            this.Ammo += collider.Ammo
        }
    }

    public update(){
        super.update()
        this.Behavior.performUpdate()
        
        this.turret.update()
    }
    
    public destroy() {
        console.log("Tank died")
        this.status.remove()
        super.destroy()
    }
}