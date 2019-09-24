import { GameObject } from "../gameobject.js";

export class DebugInfo extends GameObject {

    private lastUpdate = performance.now()
    private text: HTMLElement;

    constructor() {
        super("FPS")

        this.text = document.createElement("div")
        this.text.innerHTML = "test"
        this.Div.appendChild(this.text)
    }

    public update() : void {
        let updateTime = performance.now() - this.lastUpdate

        this.text.innerHTML = " "+Math.round(1000/updateTime)

        this.lastUpdate = performance.now()
    }
}