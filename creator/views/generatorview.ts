import { Settings } from "../settings.js"

export class GeneratorView extends HTMLElement {

    private field : HTMLElement
    private label: HTMLElement
    private image: HTMLElement
    private logo : HTMLElement
    private bg : HTMLElement
    private armorlabels : string[]

    connectedCallback() {
        console.log("Building generator view")
        this.armorlabels = ["Light Armor | Fast Speed", "Medium Armor | Medium Speed", "Heavy Armor | Low Speed"]
      
        const template: HTMLTemplateElement = document.getElementById('generator-template') as HTMLTemplateElement
        this.appendChild(template.content)

        this.logo = this.querySelector(".header")
        this.label = this.querySelector("#label")
        this.field = this.querySelector("#field")
        this.image = this.querySelector("#robot")
        this.bg = document.body.querySelector("#backgroundcolor")

        // listeners
        this.querySelector("#generate-btn").addEventListener("click", () => Settings.getInstance().randomize())
        this.querySelector("#confirm-btn").addEventListener("click", () => this.confirmSettings())
        Settings.getInstance().addEventListener("update", () => this.render())
        
        this.render()
    }

    private render() : void {

        this.field.innerText = Settings.getInstance().nickname
        this.label.innerText = this.armorlabels[Settings.getInstance().armor]
        this.image.style.backgroundImage = `url(images/tank_${Settings.getInstance().armor}.png)`
        
        const hue = `hue-rotate(${Settings.getInstance().color}deg)`
        this.bg.style.filter = this.image.style.filter = this.logo.style.filter = hue
    }

    private confirmSettings(): void {
        this.dispatchEvent(new Event('confirm'))
        this.remove()
    }
}

customElements.define('generator-view', GeneratorView)


// todo shadow DOM?
// https://css-tricks.com/styling-a-web-component/