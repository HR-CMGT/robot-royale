import { Settings } from "../settings.js";
export class ProgramView extends HTMLElement {
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
    }
    onSendButton() {
        this.dispatchEvent(new Event('robotCreated'));
    }
}
customElements.define('program-view', ProgramView);
