import { BehavioralObject } from "./interface/behavioralObject.js";
import { Tank } from "./tank.js";
import { StatusBar } from "./ui/statusbar.js";
import { Forward } from "./behaviors/forward.js";
import { Rotate } from "./behaviors/rotate.js";
import { Shoot } from "./behaviors/shoot.js";
import { MoveTowardsAmmo } from "./behaviors/movetowardsammo.js";

export class BehavioralObjectFactory {

    public static CreateObject(type: string, data : Settings) : BehavioralObject {
        let behavioralObject : BehavioralObject

        switch (type) {
            case "tank":
                behavioralObject = new Tank(data, new StatusBar(data))
                break;
            default:
                break;
        }

        // behavioralObject.AddBehavior(new Forward(behavioralObject))
        behavioralObject.AddBehavior(new Shoot(behavioralObject))
        // behavioralObject.AddBehavior(new Rotate(behavioralObject, 45, true))
        // behavioralObject.AddBehavior(new Rotate(behavioralObject, 45, true))
        // behavioralObject.AddBehavior(new Forward(behavioralObject))
        // behavioralObject.AddBehavior(new Forward(behavioralObject))
        behavioralObject.AddBehavior(new MoveTowardsAmmo(behavioralObject))
        behavioralObject.AddBehavior(new Forward(behavioralObject))

        return behavioralObject
    }
}