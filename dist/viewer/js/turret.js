import { BehavioralObject } from "./interface/behavioralObject.js";
import { Vector2 } from "./vector.js";
import { Rotate } from "./behaviors/rotate.js";
export class Turret extends BehavioralObject {
    get ParentTank() { return this.tank; }
    constructor(tank) {
        super("tank-turret");
        this.tank = tank;
        this.Behavior = new Rotate(this, 90, false);
        this.AddBehavior(new Rotate(this, 45, true));
        this.AddBehavior(new Rotate(this, 90, false));
        this.AddBehavior(new Rotate(this, 180, true));
        this.update();
    }
    update() {
        this.Position = new Vector2(this.tank.Position.X, this.tank.Position.Y);
        this.Direction = this.tank.Direction;
        this.Speed = this.tank.Speed;
        this.Behavior.performUpdate();
        super.update();
    }
}
