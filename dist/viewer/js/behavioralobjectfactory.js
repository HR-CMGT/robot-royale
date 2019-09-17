import { Robot } from "./robot.js";
import { StatusBar } from "./ui/statusbar.js";
import { Forward } from "./behaviors/forward.js";
import { Rotate } from "./behaviors/rotate.js";
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
        behavioralObject.AddBehavior(new Rotate(behavioralObject, 45));
        behavioralObject.AddBehavior(new Forward(behavioralObject));
        behavioralObject.AddBehavior(new Forward(behavioralObject));
        behavioralObject.AddBehavior(new Forward(behavioralObject));
        return behavioralObject;
    }
}
