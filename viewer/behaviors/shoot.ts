import { Behavior }         from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { GameObject }       from "../core/gameobject.js";
import { Game }             from "../game.js";
import { Bullet }           from "../gameobjects/tank/bullet.js";
import { Rocket }           from "../gameobjects/tank/rocket.js";
import { Tank }             from "../gameobjects/tank/tank.js";

export class Shoot extends Behavior{
    
    private fireRate : number = 40
    private tank : Tank
    private target : GameObject | undefined

    constructor(behavioralObject: BehavioralObject, target: GameObject = undefined) {
        super(behavioralObject)

        this.lifeTime = 100
        this.tank = behavioralObject as Tank

        // optional target for firing projectiles, can be undefined
        this.target = target 
        
        // fireRate afhankelijk van type tank 
        this.fireRate = 20 + (this.tank.Data.armor * 30)
    }

    performUpdate(): void {
        if(this.timer % this.fireRate === 0 && this.tank.Ammo > 0) {
            this.shoot()
        }
        super.performUpdate()
    }

    private shoot() : void {
        this.tank.Ammo--

        // als heavy tank, dan projectile is homing rocket met target. als target undefined, dan bedenkt rocket zelf een target
        const projectile = (this.tank.Data.armor == 2) ? new Rocket(this.tank, this.target) : new Bullet(this.tank)

        Game.Instance.addGameObject(projectile)
    }

    // gets called from composite
    // turret can go back to its own behavior after shooting
    // and becomes active ( can start rotating again )
    public onDeactivateBehavior() : void {
        // if(Game.DEBUG) console.log("Shoot:onDeactivateBehavior")
        if(!this.tank.Turret.active) this.tank.Turret.active = true
    }
}