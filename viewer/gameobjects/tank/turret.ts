import { Tank } from "./tank.js";
import { Vector2 } from "../../utils/vector.js";
import { Rotate } from "../../behaviors/rotate.js";
import { BehavioralObject } from "../../interface/behavioralObject.js";

export class Turret extends BehavioralObject {
    
    // Fields
    private tank : Tank
    public active : boolean = true
    // Properties
    public get ParentTank() : Tank { return this.tank }
    
    constructor(tank : Tank) {
        super("tank-turret")

        this.tank = tank
        this.Div.classList.add(`armor-${tank.Data.armor}`)
        this.Div.style.filter = `hue-rotate(${tank.Data.color}deg)`
        this.Behavior = new Rotate(this, 90, false)
        
        this.AddBehavior(new Rotate(this, 45, true))
        this.AddBehavior(new Rotate(this, 90, false))
        this.AddBehavior(new Rotate(this, 180, true))

        this.update()
    }

    public update() {
        this.Position   = new Vector2(this.tank.Position.X, this.tank.Position.Y)
        this.Direction  = this.tank.Direction
        this.Speed      = this.tank.Speed
        // this.Rotation   = this.tank.Rotation
        
        if(this.active) {
            if(this.Behavior) this.Behavior.performUpdate()
        }

        super.update()
    }

    // override turret draw only rotation, add when turret is child of tank dom element
    /*
    public draw() {
        this.Div.style.transform = `rotate(${this.Rotation}deg)`
    }
    */
}