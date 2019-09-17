import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Game } from "../game.js";
import { Bullet } from "../bullet.js";
import { Robot } from "../robot.js";

export class Shoot extends Behavior{
    
    private fireRate : number = 40
    private robot : Robot

    constructor(behavioralObject : BehavioralObject) {
        super(behavioralObject)
        console.log("Behavior: rotate")

        this.lifeTime = 100
        this.robot = behavioralObject as Robot
    }

    performUpdate(): void {
        super.performUpdate()

        if(this.timer % this.fireRate === 0 && this.robot.Ammo > 0) {
            this.shoot()
        }
    }

    private shoot() : void {
        // console.log("Fire")
        // TODO solve 
        this.robot.Ammo--
        Game.Instance.addBullet(new Bullet(this.BehavioralObject))
    }

    protected gotoNextBehavior() : void {
        console.log("activateNextBehavior Shoot")
        super.gotoNextBehavior()
    }
}