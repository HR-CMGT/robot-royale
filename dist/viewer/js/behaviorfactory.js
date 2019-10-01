import { BehavioralIterator } from "./behavioraliterator.js";
export class BehaviorFactory {
    static CreateBehavioralIterator(behavioralObject, data) {
        let iterator = new BehavioralIterator();
        for (const behaviorCode of data.program) {
            switch (behaviorCode) {
                case 1:
                    iterator.add(new Shoot(behavioralObject));
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
    }
}
