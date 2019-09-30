export class ConfirmView extends HTMLElement {
    constructor(msg) {
        super();
    }
    connectedCallback() {
        const modal = document.createElement("modal");
        this.appendChild(modal);
        const message = document.createElement("div");
        message.classList.add("message");
        this.appendChild(message);
        message.innerHTML = "BOINKY MANS";
    }
    close() {
        this.remove();
    }
}
customElements.define('confirm-view', ConfirmView);
