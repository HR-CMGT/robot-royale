import { StatusBar } from "./ui/statusbar.js";
import { BehavioralObject } from "./interface/behavioralObject.js";
import { Forward } from "./behaviors/forward.js";
import { Vector2 } from "./vector.js";
import { GameObject } from "./gameobject.js";
import { Bullet } from "./bullet.js";

export class Robot extends BehavioralObject{
    
    // Fields
    private data    : RobotData
    private status  : StatusBar
    private health  : number = 100
    private ammo    : number = 0
    
    // Properties
    public get Data() : RobotData   { return this.data      }

    public get Health() : number    { return this.health    }
    public set Health(v:number)     { this.health = v       }
    
    public get Ammo() : number      { return this.ammo      }
    public set Ammo(v : number)     { 
        this.ammo = v;        
        this.status.Ammo = "Bullets "+this.ammo
    }
    
    constructor(data : RobotData, status : StatusBar) {
        super("robot")

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
        this.Rotation = this.Direction.angle();
        
        this.Speed  = (Math.random() * 4) + 1 // todo dependent on armor
        
        this.update()
    }

    public collide(collider : GameObject){
        if(collider instanceof Bullet) {
            if(collider.Parent != this) {
                console.log("Robot got hit!")
                this.health -= collider.Damage
                this.data.health = this.health
                this.status.update(this.data.health)

                if(this.health <= 0) this.CanDestroy = true
                // just to test the healthbar animation
                // if (this.data.health <= 0) {
                //     console.log("Robot died")
                //     this.status.remove()
                //     Game.Instance.removeGameObject(this)
                // }
            }
        }
    }

    public update(){
        this.Behavior.performUpdate()

        super.update()
    }
    
    public destroy() {
        console.log("Robot died")
        this.status.remove()
        super.destroy()
    }
}