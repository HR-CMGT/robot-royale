import { Tank } from "./gameobjects/tank/tank.js";
import { StatusBar } from "./ui/statusbar.js";
import { MoveTowardsAmmo } from "./behaviors/movetowardsammo.js";
import { ShootAtTarget } from "./behaviors/shootattarget.js";
export class BehavioralObjectFactory {
    static CreateObject(type, data) {
        let behavioralObject;
        switch (type) {
            case "tank":
                behavioralObject = new Tank(data, new StatusBar(data));
                break;
            default:
                break;
        }
        behavioralObject.AddBehavior(new MoveTowardsAmmo(behavioralObject));
        behavioralObject.AddBehavior(new ShootAtTarget(behavioralObject));
        return behavioralObject;
    }
}
