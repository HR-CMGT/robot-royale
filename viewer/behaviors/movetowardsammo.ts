import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Game } from "../game.js";
import { AmmoBox } from "../ammobox.js";
import { Vector2 } from "../vector.js";
import { RotateAndMoveComposite } from "./rotatemovecomposite.js";
import { GameObject } from "../gameobject.js";

export class MoveTowardsAmmo extends Behavior{
    
    private activeBehavior : Behavior

    constructor(behavioralObject : BehavioralObject) {
        super(behavioralObject)
    }

    performUpdate(): void {
        if(this.activeBehavior) this.activeBehavior.performUpdate()
    }

    private getNearestAmmoBox() {
        let targetBox : AmmoBox
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

    public gotoNextBehavior() {
        this.activeBehavior.gotoNextBehavior()
    }

    public onActivateBehavior() : void {
        let targetObject : GameObject = this.getNearestAmmoBox()
        
        if(targetObject) {
            let nextBehavior = new RotateAndMoveComposite(this.BehavioralObject, targetObject)
            nextBehavior.onActivateBehavior()
            this.activeBehavior = nextBehavior
        } else {
            console.log("No target found in MoveTowardsAmmo")
            this.BehavioralObject.activateNextBehavior()
        }
    }
}