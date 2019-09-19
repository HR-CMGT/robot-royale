import { Robot } from "./robot.js";
import { StatusBar } from "./ui/statusbar.js";
import { MoveTowardsAmmo } from "./behaviors/movetowardsammo.js";
export class BehavioralObjectFactory {
    static CreateObject(type, data) {
        let behavioralObject;
        switch (type) {
            case "robot":
                behavioralObject = new Robot(data, new StatusBar(data));
                break;
            default:
                break;
        }
        behavioralObject.AddBehavior(new MoveTowardsAmmo(behavioralObject));
        return behavioralObject;
    }
}
