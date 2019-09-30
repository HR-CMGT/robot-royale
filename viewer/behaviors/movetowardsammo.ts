import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Game } from "../game.js";
import { PickUp } from "../gameobjects/pickups/pickup.js";
import { Vector2 } from "../vector.js";
import { GameObject } from "../gameobject.js";
import { BehaviorComposite } from "./behaviorcomposite.js";
import { RotateToTarget } from "./rotatetotarget.js";
import { Forward } from "./forward.js";

export class MoveTowardsAmmo extends Behavior{
    
    private activeBehavior : Behavior

    constructor(behavioralObject : BehavioralObject) {
        super(behavioralObject)
    }

    performUpdate(): void {
        if(this.activeBehavior) this.activeBehavior.performUpdate()
    }

    public onActivateBehavior() : void {
        let targetObject : GameObject = this.getNearestAmmoBox()
        
        // When the target is calculated a composite is started. First to rotate to the object
        // then to move to that object
        if(targetObject) {
            let behavioralComposite : BehaviorComposite = new BehaviorComposite(this.BehavioralObject)
            behavioralComposite.addBehavior(new RotateToTarget(this.BehavioralObject, targetObject))
            behavioralComposite.addBehavior(new Forward(this.BehavioralObject))
            
            behavioralComposite.onActivateBehavior()
            this.activeBehavior = behavioralComposite
        } else {
            console.log("No target found in MoveTowardsAmmo")
            // this.BehavioralObject.activateNextBehavior()
            this.activeBehavior = new Forward(this.BehavioralObject)
        }
    }

    public gotoNextBehavior() {
        this.activeBehavior.gotoNextBehavior()
    }

    private getNearestAmmoBox() : GameObject {
        let targetBox : GameObject
        let closest : number = 0
        
        let boxes = Game.Instance.AmmoBoxes
        
        for (const ammoBox of boxes) {
            let iets : Vector2 = ammoBox.Position.difference(this.BehavioralObject.Position)
            let dist = iets.magnitude()
            
            if(dist < closest || closest == 0) { 
                closest = dist
                targetBox = ammoBox
            }
        }

        return targetBox
    }
}