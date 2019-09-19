import { Randomizer } from "./randomizer.js";
export class GeneratorView extends HTMLElement {
    connectedCallback() {
        console.log("Building generator view");
        this.armorlabels = ["Light Armor | Fast Speed", "Medium Armor | Medium Speed", "Heavy Armor | Low Speed"];
        const template = document.getElementById('generator-template');
        const templateContent = template.content;
        this.appendChild(templateContent);
        this.label = this.querySelector("#label");
        this.field = this.querySelector("#field");
        this.image = this.querySelector("#robot");
        this.bg = document.body.querySelector("#backgroundcolor");
        this.querySelector("#generate-btn").addEventListener("click", () => this.randomSettings());
        this.querySelector("#confirm-btn").addEventListener("click", () => this.confirmSettings());
        this.randomSettings();
    }
    randomSettings() {
        this.settings = {
            id: Randomizer.generateID(),
            connectionid: this.connectionid,
            color: Math.floor(Math.random() * 360),
            name: Randomizer.generateName(),
            armor: Math.floor(Math.random() * 3)
        };
        this.field.innerText = this.settings.name;
        this.label.innerText = this.armorlabels[this.settings.armor];
        this.image.style.backgroundImage = `url(images/tank_${this.settings.armor}.png)`;
        this.bg.style.filter = "hue-rotate(" + this.settings.color + "deg)";
        this.image.style.filter = "hue-rotate(" + this.settings.color + "deg)";
    }
    confirmSettings() {
    }
    sendData() {
    }
    usePower() {
    }
}
customElements.define('generator-view', GeneratorView);
