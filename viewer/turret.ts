import { BehavioralObject } from "./interface/behavioralObject.js";
import { Tank } from "./tank.js";
import { Vector2 } from "./vector.js";
import { Rotate } from "./behaviors/rotate.js";
import { Forward } from "./behaviors/forward.js";

export class Turret extends BehavioralObject {
    // 23
    // 31 
    // private offsetLeft : number = 23
    private tank : Tank

    constructor(tank : Tank) {
        super("tank-turret")

        this.tank = tank
        // this.Div.style.top = "24px"
        // this.Div.style.left = "24px"
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

        this.Behavior.performUpdate()

        super.update()
    }
}