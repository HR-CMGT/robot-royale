import { Settings } from "../settings.js"
import { BlockView } from "./blockview.js"

export class ProgramView extends HTMLElement {

    private blocks : HTMLElement
    private added : boolean  = false // hackmaster hackenstein
    

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

        field.innerText = Settings.getInstance().nickname
        image.style.backgroundImage = `url(images/tank_${Settings.getInstance().armor}.png)`

        const hue = `hue-rotate(${Settings.getInstance().color}deg)`
        bg.style.filter = image.style.filter = logo.style.filter = this.blocks.style.filter = hue

        document.body.addEventListener("settingsUpdated", () => this.render())
        // place program blocks
        this.render()
    }

    private render() {
        this.blocks.innerHTML = ""
        for (let [i, label] of Settings.getInstance().program.entries()) {
            let div = document.createElement("div")
            div.innerHTML = Settings.Behaviors[label]
            let cl = (label > 0) ? "block" : "block-empty"
            div.classList.add(cl)
            div.addEventListener("click", () => this.showBlockView(i))
            this.blocks.appendChild(div)
        }
    }

    private showBlockView(i:number): void {
        let v = new BlockView(i)
        document.body.appendChild(v)
    }

    // todo robot added status is also part of settings?
    private onSendButton() {
        if(!this.added) {
            this.dispatchEvent(new Event('robotCreated'))
            let btn = this.querySelector("#send-btn")
            btn.innerHTML = "UPDATE PROGRAM"
            this.added = true
            // TODO SHOW CONFIRMATION MODAL - YOUR ROBOT IS NOW ADDED TO THE GAME
            console.log("confirm here")
        } else {
            this.dispatchEvent(new Event('programUpdated'))
        }
    }
}

customElements.define('program-view', ProgramView)