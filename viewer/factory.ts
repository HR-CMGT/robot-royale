import { BehavioralObject } from "./interface/behavioralObject.js";
import { Tank } from "./gameobjects/tank/tank.js";
import { StatusBar } from "./ui/statusbar.js";
import { Forward } from "./behaviors/forward.js";
import { Shoot } from "./behaviors/shoot.js";
import { MoveTowardsPickup } from "./behaviors/movetowardspickup.js";
import { ShootAtTarget } from "./behaviors/shootattarget.js";
import { Settings } from "./interface/settings.js";
import { BehavioralIterator } from "./behavioraliterator.js";

export class Factory {

    public static CreateBehavioralObject(type: string, data : Settings) : BehavioralObject {
        let behavioralObject : BehavioralObject

        switch (type) {
            case "tank":
                behavioralObject = new Tank(data, new StatusBar(data))
                break;
            default:
                break;
        }

        behavioralObject.BehavioralIterator = Factory.CreateBehavioralIterator(behavioralObject, data)

        return behavioralObject
    }

    public static CreateBehavioralIterator(behavioralObject : BehavioralObject, data : Settings) {
        let iterator : BehavioralIterator = new BehavioralIterator()

        // ["EMPTY", "STOP AND SHOOT", "AIM AND SHOOT", "FIND AMMO", "FIND HEALTH", "MOVE FORWARD"]
        for (const behaviorCode of data.program) {
            switch (behaviorCode) {
                case 1:
                    iterator.add(new Shoot(behavioralObject))
                    break;
                case 2:
                    iterator.add(new ShootAtTarget(behavioralObject))
                    break;
                case 3:
                    iterator.add(new MoveTowardsPickup(behavioralObject, "ammo"))
                    break;
                case 4:
                    iterator.add(new MoveTowardsPickup(behavioralObject, "health"))
                    break; 
                case 5:
                    iterator.add(new Forward(behavioralObject))
                    break; 
                default:
                    break;
            }
        }

        return iterator
    }
}