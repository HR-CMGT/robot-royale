import { Animation } from "../interface/animation.js";
export class Die extends Animation {
    constructor(behavioralObject, frameWidth, frameHeight, rows, columns, animationSpeed) {
        super(behavioralObject, frameWidth, frameHeight, rows, columns, animationSpeed);
        this.BehavioralObject.Div.classList.add("die");
    }
}
