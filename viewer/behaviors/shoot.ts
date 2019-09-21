import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Game } from "../game.js";
import { Bullet } from "../bullet.js";
import { Tank } from "../tank.js";

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

    public gotoNextBehavior() : void {
        super.gotoNextBehavior()
    }
}