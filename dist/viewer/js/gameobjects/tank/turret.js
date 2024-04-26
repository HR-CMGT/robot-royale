import { Vector2 } from "../../utils/vector.js";
import { Rotate } from "../../behaviors/rotate.js";
import { BehavioralObject } from "../../interface/behavioralObject.js";
export class Turret extends BehavioralObject {
    get ParentTank() { return this.tank; }
    constructor(tank) {
        super("tank-turret");
        this.active = true;
        this.tank = tank;
        this.Div.classList.add(`armor-${tank.Data.armor}`);
        this.Div.style.filter = `hue-rotate(${tank.Data.color}deg)`;
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
        if (this.active) {
            if (this.Behavior)
                this.Behavior.performUpdate();
        }
        super.update();
    }
}
