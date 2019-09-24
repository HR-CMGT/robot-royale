import { Settings } from "../settings.js";
export class BlockView extends HTMLElement {
    constructor(i) {
        super();
        this.behaviors = ["MOVE AND SHOOT", "AIM AND SHOOT", "FIND AMMO", "FIND HEALTH"];
        this.index = i;
    }
    connectedCallback() {
        console.log("Editing block " + this.index);
        const modal = document.createElement("modal");
        this.appendChild(modal);
        const blocks = document.createElement("div");
        blocks.classList.add("blocks");
        this.appendChild(blocks);
        const hue = `hue-rotate(${Settings.color}deg)`;
        blocks.style.filter = hue;
        for (let [i, b] of this.behaviors.entries()) {
            let div = document.createElement("div");
            div.classList.add("block");
            div.innerHTML = b;
            div.addEventListener("click", () => this.chooseBlock(i));
            blocks.appendChild(div);
        }
    }
    chooseBlock(i) {
        Settings.program[this.index] = i;
        this.dispatchEvent(new Event('blockChosen'));
        this.remove();
    }
}
customElements.define('block-view', BlockView);
