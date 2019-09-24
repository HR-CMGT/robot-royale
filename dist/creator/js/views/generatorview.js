import { Settings } from "../settings.js";
export class GeneratorView extends HTMLElement {
    connectedCallback() {
        console.log("Building generator view");
        this.armorlabels = ["Light Armor | Fast Speed", "Medium Armor | Medium Speed", "Heavy Armor | Low Speed"];
        const template = document.getElementById('generator-template');
        this.appendChild(template.content);
        this.logo = this.querySelector(".header");
        this.label = this.querySelector("#label");
        this.field = this.querySelector("#field");
        this.image = this.querySelector("#robot");
        this.bg = document.body.querySelector("#backgroundcolor");
        this.querySelector("#generate-btn").addEventListener("click", () => {
            Settings.randomize();
            this.updateDisplay();
        });
        this.querySelector("#confirm-btn").addEventListener("click", () => this.confirmSettings());
        document.body.addEventListener("settings", () => this.updateDisplay());
        this.updateDisplay();
    }
    updateDisplay() {
        this.field.innerText = Settings.nickname;
        this.label.innerText = this.armorlabels[Settings.armor];
        this.image.style.backgroundImage = `url(images/tank_${Settings.armor}.png)`;
        const hue = `hue-rotate(${Settings.color}deg)`;
        this.bg.style.filter = this.image.style.filter = this.logo.style.filter = hue;
    }
    confirmSettings() {
        this.dispatchEvent(new Event('confirm'));
        this.remove();
    }
}
customElements.define('generator-view', GeneratorView);
