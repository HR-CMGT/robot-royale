import { DomObject } from "../core/domobject.js";
export class DebugInfo extends DomObject {
    constructor() {
        super("FPS");
        this.lastUpdate = performance.now();
        this.text = document.createElement("div");
        this.text.innerHTML = "test";
        this.Div.appendChild(this.text);
    }
    update() {
        let updateTime = performance.now() - this.lastUpdate;
        this.text.innerHTML = " " + Math.round(1000 / updateTime);
        this.lastUpdate = performance.now();
    }
}
