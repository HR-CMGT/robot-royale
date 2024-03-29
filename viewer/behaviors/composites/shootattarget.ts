import { Behavior }             from "../../interface/behavior.js";
import { BehavioralObject }     from "../../interface/behavioralObject.js";
import { Game }                 from "../../game.js";
import { GameObject }           from "../../core/gameobject.js";
import { BehaviorComposite }    from "./behaviorcomposite.js";
import { Shoot }                from "../shoot.js";
import { Break }                from "../break.js";
import { StartOff }             from "../startoff.js";
import { RotateTurretToTarget } from "../rotateturrettotarget.js";
import { Forward }              from "../forward.js";

export class ShootAtTarget extends Behavior{
    
    private activeBehavior : Behavior

    constructor(behavioralObject : BehavioralObject) {
        super(behavioralObject)
    }

    performUpdate(): void {
        if(this.activeBehavior) this.activeBehavior.performUpdate()
    }

    public onActivateBehavior() : void {
        if(Game.Instance.Tanks.length > 1) {
            let targetObject: GameObject | undefined = Game.Instance.getRandomEnemy(this.BehavioralObject)
            let behavioralComposite : BehaviorComposite = new BehaviorComposite(this.BehavioralObject)
            behavioralComposite.addBehavior(new Break(this.BehavioralObject))
            behavioralComposite.addBehavior(new RotateTurretToTarget(this.BehavioralObject, targetObject))
            behavioralComposite.addBehavior(new Shoot(this.BehavioralObject, targetObject))
            behavioralComposite.addBehavior(new StartOff(this.BehavioralObject))
            
            this.activeBehavior = behavioralComposite
            behavioralComposite.onActivateBehavior()
        } else {
            // console.log("No target found in Shoot at target")
            // this.BehavioralObject.activateNextBehavior()
            this.activeBehavior = new Forward(this.BehavioralObject)
        }
    }

    public gotoNextBehavior() {
        this.activeBehavior.gotoNextBehavior()
    }

    /**
     * Picks a random tank from the active tanks
     * and checks if it is not this tank
     * verplaatst naar Game.ts omdat meerdere classes een random enemy nodig hebben
     * 
     * 
    private getRandomEnemy() : GameObject {
        let tanks : GameObject[] = Game.Instance.Tanks

        console.log("Choose random tank from " + tanks.length)
        
        let tank : GameObject
        do {
            // TODO GEEN LOOPS BINNEN LOOPS 
            // if(Game.DEBUG) console.log("do while...")
            tank = tanks[Math.floor(Math.random() * tanks.length)]
        } while (tank == this.BehavioralObject);
        
        return tank
    }
    */
}