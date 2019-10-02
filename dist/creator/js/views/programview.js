import { Settings } from "../settings.js";
import { BlockView } from "./blockview.js";
export class ProgramView extends HTMLElement {
    constructor() {
        super(...arguments);
        this.added = false;
    }
    connectedCallback() {
        console.log("Building programmer view");
        const template = document.getElementById('program-template');
        this.appendChild(template.content);
        this.blocks = this.querySelector(".blocks");
        const logo = this.querySelector(".header");
        const field = this.querySelector("#field");
        const image = this.querySelector("#robot");
        const bg = document.body.querySelector("#backgroundcolor");
        this.querySelector("#send-btn").addEventListener("click", () => this.onSendButton());
        field.innerText = Settings.getInstance().nickname;
        image.style.backgroundImage = `url(images/tank_${Settings.getInstance().armor}.png)`;
        const hue = `hue-rotate(${Settings.getInstance().color}deg)`;
        bg.style.filter = image.style.filter = logo.style.filter = this.blocks.style.filter = hue;
        document.body.addEventListener("settingsUpdated", () => this.render());
        this.render();
    }
    render() {
        this.blocks.innerHTML = "";
        for (let [i, label] of Settings.getInstance().program.entries()) {
            let div = document.createElement("div");
            div.innerHTML = Settings.Behaviors[label];
            let cl = (label > 0) ? "block" : "block-empty";
            div.classList.add(cl);
            div.addEventListener("click", () => this.showBlockView(i));
            this.blocks.appendChild(div);
        }
    }
    showBlockView(i) {
        let v = new BlockView(i);
        document.body.appendChild(v);
    }
    onSendButton() {
        if (!this.added) {
            this.dispatchEvent(new Event('robotCreated'));
            let btn = this.querySelector("#send-btn");
            btn.innerHTML = "UPDATE PROGRAM";
            this.added = true;
            console.log("confirm here");
        }
        else {
            this.dispatchEvent(new Event('programUpdated'));
        }
    }
}
customElements.define('program-view', ProgramView);
