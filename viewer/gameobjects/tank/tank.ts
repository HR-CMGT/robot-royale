import { Bullet }           from "./bullet.js";
import { Rocket }           from "./rocket.js";
import { Turret }           from "./turret.js";
import { PickUp }           from "../pickups/pickup.js";
import { StatusBar }        from "../../ui/statusbar.js";
import { BehavioralObject } from "../../interface/behavioralObject.js";
import { Forward }          from "../../behaviors/forward.js";
import { Settings }         from "../../interface/settings.js";
import { Game }             from "../../game.js";
import { Factory }          from "../../core/factory.js";
import { Vector2 }          from "../../utils/vector.js";
import { GameObject }       from "../../core/gameobject.js";
import { AnimationObject }  from "../../core/animationobject.js";
import { NullBehavior }     from "../../behaviors/nullbehavior.js";

export class Tank extends BehavioralObject{
    
    // Fields
    private data    : Settings
    private status  : StatusBar
    private health  : number = 100
    private ammo    : number = 0
    private turret  : Turret
    private lifeTime: number = 0
    private kills   : number = 0
    private just:number = 0

    // Properties
    public get Data(): Settings   { return this.data      }

    public get Health() : number    { return this.health    }
    public set Health(v:number)     { 
        this.health = v       
        if(this.health > 100) this.health = 100
        if(this.health < 0) this.health = 0

        this.status.Health = this.health
    }
    
    public get Ammo() : number      { return this.ammo      }
    public set Ammo(v : number)     { 
        this.ammo = v        
        this.status.updateStatus(this.kills, this.ammo)
    }
    public get LifeTime() : number      { return this.lifeTime      }
    public set LifeTime(v : number)     { 
        this.lifeTime = v        
        // this.status.LifeTime = this.lifeTime
    }
    public get Kills() : number      { return this.kills      }
    public set Kills(v : number)     { 
        this.kills = v     
        this.status.updateStatus(this.kills, this.ammo)
    }
    
    
    public get Turret() : Turret    { return this.turret    }
    

    constructor(data: Settings, status : StatusBar) {
        super("tank-body")
        
        // Default
        // Todo how to handle this?
        this.Behavior = new Forward(this)

        this.data   = data
        this.status = status
        this.Ammo   = 10

        this.Div.classList.add(`armor-${data.armor}`)
        this.Div.style.filter = `hue-rotate(${data.color}deg)`
        // this.Div.innerHTML = data.nickname

        this.Position = new Vector2(
            Math.random() * (window.innerWidth - 300), 
            Math.random() * (window.innerHeight - 100))
        
            
        // let rad = this.Rotation / (180/Math.PI)
        this.Direction = new Vector2(1 - (Math.random()*2), 1-(Math.random()*2))
        this.Rotation = this.Direction.angle()
        
        this.Speed  = (5 - (data.armor * 2)) // todo dependent on armor
        
        this.turret = new Turret(this)

        // TODO append the turret to the tank instead of the gameview // fix gameloop // fix bullets
        // this.Div.appendChild(this.turret.Div)

        this.update()
    }

    public collide(collider : GameObject) : void {
        if (collider instanceof Bullet || collider instanceof Rocket) {  // todo instanceof Projectile
            if (collider.ParentTurret instanceof Turret) {
                if(collider.ParentTurret != this.Turret) {
                    this.Health -= (collider.Damage - (this.data.armor * 5)) 
    
                    if(this.health <= 0) { 
                        Game.Instance.checkHighScore(this)
                        this.health = 1000 // to prevent multiple explosions
                        this.Behavior = new NullBehavior(this)
                        Game.Instance.AddGameObject(
                            new AnimationObject("explosion", this.Position, this, 146, 145, 3, 4, 6)
                        )

                        collider.ParentTurret.ParentTank.Kills++
                    }
                }
            }
        }
        if(collider instanceof PickUp) {
            this.Ammo += collider.Ammo
            this.Health += collider.Health
        }
    }

    public update(){
        this.LifeTime++
        this.Behavior.performUpdate()
        super.update()
        this.turret.update()
    }

    public updateProgram(data : Settings) {
        this.data.socketid = data.socketid
        this.BehavioralIterator = Factory.CreateBehavioralIterator(this, data)
    }
    
    // als er een tank bij komt of weg gaat worden de statusbars opnieuw getekend
    public redrawStatus() {
        let statusBar : StatusBar = new StatusBar(this.status.Data)
        statusBar.Health = this.Health
        statusBar.updateStatus(this.kills, this.ammo)
        this.status.remove()
        this.status = statusBar
    }

    public remove() {
        this.status.remove()
        this.turret.remove()
        super.remove()
    }
}