import { Settings } from "../settings.js";
export class BlockView extends HTMLElement {
    constructor(i) {
        super();
        this.behaviors = ["EMPTY", "MOVE AND SHOOT", "AIM AND SHOOT", "FIND AMMO", "FIND HEALTH"];
        this.index = i;
    }
    connectedCallback() {
        console.log("Editing block " + this.index);
        const modal = document.createElement("modal");
        this.appendChild(modal);
        const blocks = document.createElement("div");
        blocks.classList.add("blocks");
        this.appendChild(blocks);
        const hue = `hue-rotate(${Settings.getInstance().color}deg)`;
        blocks.style.filter = hue;
        for (let [index, label] of this.behaviors.entries()) {
            let div = document.createElement("div");
            let cl = (index > 0) ? "block" : "block-empty";
            div.classList.add(cl);
            div.innerHTML = label;
            div.addEventListener("click", () => this.chooseBlock(index));
            blocks.appendChild(div);
        }
    }
    chooseBlock(i) {
        Settings.getInstance().adjustProgram(this.index, i);
        this.remove();
    }
}
customElements.define('block-view', BlockView);
