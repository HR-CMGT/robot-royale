import { Settings } from "../settings.js"

export class ProgramView extends HTMLElement {

    private blocks: HTMLElement

    connectedCallback() {
        console.log("Building programmer view")
        /* todo check blockly */
        /* https://blockly-demo.appspot.com/static/demos/index.html */

        const template: HTMLTemplateElement = document.getElementById('program-template') as HTMLTemplateElement
        this.appendChild(template.content)

        this.blocks = this.querySelector(".blocks")

        const logo : HTMLElement = this.querySelector(".header")
        const field: HTMLElement = this.querySelector("#field")
        const image: HTMLElement = this.querySelector("#robot")
        const bg: HTMLElement = document.body.querySelector("#backgroundcolor")

        this.querySelector("#send-btn").addEventListener("click", () => this.onSendButton())

        field.innerText = Settings.nickname
        image.style.backgroundImage = `url(images/tank_${Settings.armor}.png)`

        const hue = `hue-rotate(${Settings.color}deg)`
        bg.style.filter = image.style.filter = logo.style.filter = this.blocks.style.filter = hue
    }

    private onSendButton() {
        // Todo, IF NO ROBOT CREATED send new robot command
        this.dispatchEvent(new Event('robotCreated'))
        
        // ELSE send new program for existing robot
        // this.dispatchEvent(new Event('programUpdated'))
    }
}

customElements.define('program-view', ProgramView)