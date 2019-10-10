import { Behavior } from "../../interface/behavior.js";
import { BehavioralObject } from "../../interface/behavioralObject.js";
import { Game } from "../../game.js";
import { Vector2 } from "../../utils/vector.js";
import { GameObject } from "../../core/gameobject.js";
import { BehaviorComposite } from "./behaviorcomposite.js";
import { RotateToTarget } from "../rotatetotarget.js";
import { Forward } from "../forward.js";

export class MoveTowardsPickup extends Behavior{
    
    private activeBehavior : Behavior
    private type : string

    /**
     * Finds the nearest PickUp, Rotates towards it and then moves in that direction
     * @param behavioralObject 
     * @param type "health" | "ammo"
     */
    constructor(behavioralObject : BehavioralObject, type : string) {
        super(behavioralObject)

        this.type = type
    }

    performUpdate(): void {
        if(this.activeBehavior) this.activeBehavior.performUpdate()
    }

    public onActivateBehavior() : void {
        let targetObject : GameObject = this.getNearestPickup()
        
        // When the target is calculated a composite is started. First to rotate to the object
        // then to move to that object
        if(targetObject) {
            let behavioralComposite : BehaviorComposite = new BehaviorComposite(this.BehavioralObject)
            behavioralComposite.addBehavior(new RotateToTarget(this.BehavioralObject, targetObject))
            behavioralComposite.addBehavior(new Forward(this.BehavioralObject))
            
            behavioralComposite.onActivateBehavior()
            this.activeBehavior = behavioralComposite
        } else {
            // console.log("No target found in MoveTowardsPickup")
            // this.BehavioralObject.activateNextBehavior()
            this.activeBehavior = new Forward(this.BehavioralObject)
        }
    }

    public gotoNextBehavior() {
        this.activeBehavior.gotoNextBehavior()
    }

    private getNearestPickup() : GameObject {
        let targetBox : GameObject
        let closest : number = 0
        
        let boxes = this.type === "ammo" ? Game.Instance.AmmoBoxes : Game.Instance.RepairKits
        
        for (const pickup of boxes) {
            let diff : Vector2 = pickup.Position.difference(this.BehavioralObject.Position)
            let dist = diff.magnitude()
            
            if(dist < closest || closest == 0) { 
                closest = dist
                targetBox = pickup
            }
        }

        return targetBox
    }
}