export class Behavior {
    get BehavioralObject() { return this.behavioralObject; }
    constructor(behavioralObject) {
        this.timer = 0;
        this.lifeTime = 0;
        this.behavioralObject = behavioralObject;
    }
    performUpdate() {
        this.timer++;
        if (this.timer >= this.lifeTime) {
            this.timer = 0;
            this.BehavioralObject.Behavior.gotoNextBehavior();
        }
    }
    gotoNextBehavior() {
        this.behavioralObject.activateNextBehavior();
    }
    onActivateBehavior() {
    }
    onDeactivateBehavior() {
    }
}
