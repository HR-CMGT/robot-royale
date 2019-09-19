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
        // TODO solve 
        this.robot.Ammo--
        Game.Instance.addBullet(new Bullet(this.BehavioralObject))
    }

    public gotoNextBehavior() : void {
        super.gotoNextBehavior()
    }
}