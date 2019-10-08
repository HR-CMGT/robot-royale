import { GameObject } from "../gameobject.js";
import { BehavioralIterator } from "../behavioraliterator.js";
import { Behavior } from "./behavior.js";
import { Game } from "../game.js";
import { Tank } from "../gameobjects/tank/tank.js";
import { Forward } from "../behaviors/forward.js";

/**
 * This is a GameObject with the ability to give it a (or more) behavior(a). 
 * This object has a iterator which loops through all behaviors
 */
export abstract class BehavioralObject extends GameObject{
    
    // Fields
    protected behavioralIterator : BehavioralIterator
    private behavior : Behavior
    
    // Properties
    public get Behavior()                { return this.behavior  }
    public set Behavior(b : Behavior)    { this.behavior = b     }

    public get BehavioralIterator() : BehavioralIterator { return this.behavioralIterator }
    public set BehavioralIterator(iterator : BehavioralIterator) { this.behavioralIterator = iterator }
    
    // todo remove this function
    public AddBehavior(b : Behavior) { this.behavioralIterator.add(b) }

    constructor(tag : string) {
        super(tag)
        this.behavioralIterator = new BehavioralIterator()
    }

    public activateNextBehavior(): void {
        this.behavior.onDeactivateBehavior()
        
        if(this.behavioralIterator.isNotEmpty())
            this.behavior = this.behavioralIterator.next()
        else 
            this.behavior = new Forward(this)

        this.behavior.onActivateBehavior()
        
        if(Game.DEBUG) { 
            if(this instanceof Tank) {
                console.log(this.behavior)
            } 
        }
    }
}