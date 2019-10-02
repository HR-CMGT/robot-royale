import { Settings } from "../settings.js";
export class ConfirmView extends HTMLElement {
    constructor(msg, allowClose) {
        super();
        this.msg = msg;
        this.allowClose = allowClose;
    }
    connectedCallback() {
        const modal = document.createElement("modal");
        this.appendChild(modal);
        const message = document.createElement("div");
        message.classList.add("message");
        message.innerHTML = `<h3>${Settings.getInstance().nickname}</h3><br>${this.msg}<br><br>`;
        this.appendChild(message);
        const hue = `hue-rotate(${Settings.getInstance().color}deg)`;
        message.style.filter = hue;
        if (this.allowClose) {
            const btn = document.createElement("button");
            btn.innerHTML = "OK!";
            message.appendChild(btn);
            btn.addEventListener("click", () => this.remove());
        }
    }
}
customElements.define('confirm-view', ConfirmView);
