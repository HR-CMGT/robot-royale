import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Game } from "../game.js";
import { Bullet } from "../gameobjects/tank/bullet.js";
import { Tank } from "../gameobjects/tank/tank.js";

export class Shoot extends Behavior{
    
    private fireRate : number = 40
    private tank : Tank

    constructor(behavioralObject : BehavioralObject) {
        super(behavioralObject)

        this.lifeTime = 100
        this.tank = behavioralObject as Tank
    }

    performUpdate(): void {
        if(this.timer % this.fireRate === 0 && this.tank.Ammo > 0) {
            this.shoot()
        }
        super.performUpdate()
    }

    private shoot() : void {
        // TODO solve 
        this.tank.Ammo--
        Game.Instance.addBullet(new Bullet((this.BehavioralObject as Tank).Turret))
    }

    // gets called from composite
    // turret can go back to its own behavior after shooting
    // and becomes active ( can start rotating again )
    public onDeactivateBehavior() : void {
        if(Game.DEBUG) console.log("Shoot:onDeactivateBehavior")
        if(!this.tank.Turret.active) this.tank.Turret.active = true
    }
}