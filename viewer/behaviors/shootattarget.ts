import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Game } from "../game.js";
import { GameObject } from "../gameobject.js";
import { BehaviorComposite } from "./behaviorcomposite.js";
import { RotateToTarget } from "./rotatetotarget.js";
import { Shoot } from "./shoot.js";
import { Break } from "./break.js";
import { StartOff } from "./startoff.js";
import { RotateTurretToTarget } from "./rotateturrettotarget.js";

export class ShootAtTarget extends Behavior{
    
    private activeBehavior : Behavior

    constructor(behavioralObject : BehavioralObject) {
        super(behavioralObject)
    }

    performUpdate(): void {
        if(this.activeBehavior) this.activeBehavior.performUpdate()
    }

    public onActivateBehavior() : void {
        let targetObject : GameObject = this.getRandomEnemy()
        // When the target is calculated a composite is started. First to rotate to the object
        // then to move to that object
        if(targetObject) {
            let behavioralComposite : BehaviorComposite = new BehaviorComposite(this.BehavioralObject)
            behavioralComposite.addBehavior(new Break(this.BehavioralObject))
            behavioralComposite.addBehavior(new RotateTurretToTarget(this.BehavioralObject, targetObject))
            behavioralComposite.addBehavior(new Shoot(this.BehavioralObject))
            behavioralComposite.addBehavior(new StartOff(this.BehavioralObject))
            
        //     let tank = this.BehavioralObject as Tank
        // tank.Turret.Behavior = new Rotate(tank.Turret, rotationOptions.angle, rotationOptions.rotateClockWise)
            this.activeBehavior = behavioralComposite
            behavioralComposite.onActivateBehavior()
        } else {
            console.log("No target found in MoveTowardsAmmo")
            this.BehavioralObject.activateNextBehavior()
        }
    }

    public gotoNextBehavior() {
        this.activeBehavior.gotoNextBehavior()
    }

    /**
     * Picks a random tank from the active tanks
     * and checks if it is not this tank
     */
    private getRandomEnemy() : GameObject {
        let tanks : GameObject[] = Game.Instance.Tanks

        // kan leeg blijven
        let tank : GameObject
        for (let i = 0; i < 5; i++) {
            tank = tanks[Math.floor(Math.random() * tanks.length)]
            if(tank != this.BehavioralObject) break       
        }

        // let numberOfTries = 0
        // let tank : GameObject
        // do {
        //     numberOfTries++
        //     tank = tanks[Math.floor(Math.random() * tanks.length)]
        // } while (numberOfTries < 3 || tank == this.BehavioralObject);

        return tank
    }
}