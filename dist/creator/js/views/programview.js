import { Settings } from "../settings.js";
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
        field.innerText = Settings.nickname;
        image.style.backgroundImage = `url(images/tank_${Settings.armor}.png)`;
        const hue = `hue-rotate(${Settings.color}deg)`;
        bg.style.filter = image.style.filter = logo.style.filter = this.blocks.style.filter = hue;
        let blocks = this.querySelector(".blocks");
        for (let pr of Settings.program) {
            let div = document.createElement("div");
            div.classList.add("block");
            div.innerHTML = "MOVE AND SHOOT";
            blocks.appendChild(div);
        }
    }
    onSendButton() {
        if (!this.added) {
            this.dispatchEvent(new Event('robotCreated'));
            let btn = this.querySelector("#send-btn");
            btn.innerHTML = "UPDATE PROGRAM";
            this.added = true;
        }
        else {
            this.dispatchEvent(new Event('programUpdated'));
        }
    }
}
customElements.define('program-view', ProgramView);
