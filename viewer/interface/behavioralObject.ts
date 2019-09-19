import { GameObject } from "../gameobject.js";
import { BehavioralIterator } from "../behavioraliterator.js";
import { Behavior } from "./behavior.js";
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

    public AddBehavior(b : Behavior) { this.behavioralIterator.add(b) }

    constructor(tag : string) {
        super(tag)
        this.behavioralIterator = new BehavioralIterator()
    }

    public activateNextBehavior(): void {
        let nextBehavior = this.behavioralIterator.next()
        nextBehavior.onActivateBehavior()
        this.behavior = nextBehavior
    }
}