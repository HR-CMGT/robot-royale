import { Tank } from "./gameobjects/tank/tank.js";
import { StatusBar } from "./ui/statusbar.js";
import { Forward } from "./behaviors/forward.js";
import { Shoot } from "./behaviors/shoot.js";
import { MoveTowardsPickup } from "./behaviors/movetowardspickup.js";
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
        for (const behaviorCode of data.program) {
            switch (behaviorCode) {
                case 1:
                    behavioralObject.AddBehavior(new Shoot(behavioralObject));
                    break;
                case 2:
                    behavioralObject.AddBehavior(new ShootAtTarget(behavioralObject));
                    break;
                case 3:
                    behavioralObject.AddBehavior(new MoveTowardsPickup(behavioralObject, "ammo"));
                    break;
                case 4:
                    behavioralObject.AddBehavior(new MoveTowardsPickup(behavioralObject, "health"));
                    break;
                case 5:
                    behavioralObject.AddBehavior(new Forward(behavioralObject));
                    break;
                default:
                    break;
            }
        }
        return behavioralObject;
    }
}
