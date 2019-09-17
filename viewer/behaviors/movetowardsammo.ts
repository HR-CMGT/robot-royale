import { Behavior } from "../interface/behavior.js";
import { BehavioralObject } from "../interface/behavioralObject.js";
import { Game } from "../game.js";
import { AmmoBox } from "../ammobox.js";
import { Vector2 } from "../vector.js";
import { RotateAndMoveComposite } from "./rotatemovecomposite.js";

export class MoveTowardsAmmo extends Behavior{
    
    private targetBox : AmmoBox

    constructor(behavioralObject : BehavioralObject) {
        super(behavioralObject)

        this.targetBox = this.getNearestAmmoBox()
    }

    performUpdate(): void {
        if(this.targetBox) {
            this.BehavioralObject.Behavior = new RotateAndMoveComposite(this.BehavioralObject)
        } else {
            console.log("No target found in MoveTowardsAmmo")
            this.BehavioralObject.activateNextBehavior()
        }
    }

    private getNearestAmmoBox() {
        let targetBox : AmmoBox
        let closest : number = 0
        
        let boxes = Game.Instance.AmmoBoxes
        for (const ammoBox of boxes) {
            let iets : Vector2 = ammoBox.Position.difference(this.BehavioralObject.Position)
            // console.log(iets)
            let dist = iets.magnitude()
            // console.log(dist)
            
            if(dist < closest || closest == 0) { 
                closest = dist
                targetBox = ammoBox
            }
        }

        return targetBox
    }
}