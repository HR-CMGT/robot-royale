import { Tank } from "./tank.js";
import { StatusBar } from "./ui/statusbar.js";
import { Forward } from "./behaviors/forward.js";
import { Shoot } from "./behaviors/shoot.js";
import { MoveTowardsAmmo } from "./behaviors/movetowardsammo.js";
export class BehavioralObjectFactory {
    static CreateObject(type, data) {
        let behavioralObject;
        switch (type) {
            case "robot":
                behavioralObject = new Tank(data, new StatusBar(data));
                break;
            default:
                break;
        }
        behavioralObject.AddBehavior(new Shoot(behavioralObject));
        behavioralObject.AddBehavior(new MoveTowardsAmmo(behavioralObject));
        behavioralObject.AddBehavior(new Forward(behavioralObject));
        return behavioralObject;
    }
}
