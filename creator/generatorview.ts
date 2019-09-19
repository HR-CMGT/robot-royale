import { Randomizer } from "./randomizer.js"
import { Settings } from "./interface/settings.js"

export class GeneratorView extends HTMLElement {

    private field : HTMLElement
    private label: HTMLElement
    private image: HTMLElement
    private bg : HTMLElement
    private connectionid : string
    private settings : Settings
    private armorlabels : string[]

    connectedCallback() {
        console.log("Building generator view")

        this.armorlabels = ["Light Armor | Fast Speed", "Medium Armor | Medium Speed", "Heavy Armor | Low Speed"]
      
        // use a template to fill this view with html - easier than lots of document.createElements
        const template: HTMLTemplateElement = document.getElementById('generator-template') as HTMLTemplateElement
        const templateContent = template.content
        this.appendChild(templateContent)

        this.label = this.querySelector("#label")
        this.field = this.querySelector("#field")
        this.image = this.querySelector("#robot")
        this.bg = document.body.querySelector("#backgroundcolor")
        this.querySelector("#generate-btn").addEventListener("click", () => this.randomSettings())
        this.querySelector("#confirm-btn").addEventListener("click", () => this.confirmSettings())

        this.randomSettings()
    }

    private randomSettings() : void {

        this.settings = {
            id: Randomizer.generateID(),
            connectionid: this.connectionid,
            color: Math.floor(Math.random() * 360),
            name: Randomizer.generateName(),
            armor : Math.floor(Math.random() * 3)
        }

        this.field.innerText = this.settings.name
        this.label.innerText = this.armorlabels[this.settings.armor]
        this.image.style.backgroundImage = `url(images/tank_${this.settings.armor}.png)`
        
        this.bg.style.filter = "hue-rotate(" + this.settings.color + "deg)"
        this.image.style.filter = "hue-rotate(" + this.settings.color + "deg)"

        // todo shadow DOM?
        // https://css-tricks.com/styling-a-web-component/

    }

    private confirmSettings(): void {

    }


    private sendData() {
        /*
        const json : string = JSON.stringify(this.data)
        console.log(json)

        this.socket.emit('robot created', json)
        */
    }

    private usePower() {
        /*
        console.log("robot power " + this.data.id)
        this.socket.emit('robot power', JSON.stringify(this.data.id))
        */
    }
}

customElements.define('generator-view', GeneratorView)