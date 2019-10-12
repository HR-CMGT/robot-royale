import { Settings } from "../settings.js";
export class GeneratorView extends HTMLElement {
    connectedCallback() {
        console.log("Building generator view");
        this.armorlabels = ["Low Armor | Fast | High Firerate", "Medium Armor | Medium Speed", "Heavy Armor | Slow | Missiles"];
        const template = document.getElementById('generator-template');
        this.appendChild(template.content);
        this.logo = this.querySelector(".header");
        this.label = this.querySelector("#label");
        this.field = this.querySelector("#field");
        this.image = this.querySelector("#robot");
        this.bg = document.body.querySelector("#backgroundcolor");
        this.querySelector("#generate-btn").addEventListener("click", () => Settings.getInstance().randomize());
        this.querySelector("#confirm-btn").addEventListener("click", () => this.confirmSettings());
        document.body.addEventListener("settingsUpdated", () => this.render());
        this.render();
    }
    disconnectedCallback() {
    }
    render() {
        this.field.innerText = Settings.getInstance().nickname;
        this.label.innerText = this.armorlabels[Settings.getInstance().armor];
        this.image.style.backgroundImage = `url(images/tank_${Settings.getInstance().armor}.png)`;
        const hue = `hue-rotate(${Settings.getInstance().color}deg)`;
        this.bg.style.filter = this.image.style.filter = this.logo.style.filter = hue;
    }
    confirmSettings() {
        this.dispatchEvent(new Event('confirm'));
        this.remove();
    }
}
customElements.define('generator-view', GeneratorView);
