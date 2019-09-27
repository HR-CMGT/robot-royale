import { Settings } from "../settings.js"
import { BlockView } from "./blockview.js"

export class ProgramView extends HTMLElement {

    private blocks : HTMLElement
    private added : boolean  = false // hackmaster hackenstein
    private behaviors: string[] = ["MOVE AND SHOOT", "AIM AND SHOOT", "FIND AMMO", "FIND HEALTH"]

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

        // place program blocks
        this.updateBlocks()
    }

    private updateBlocks() {
        this.blocks.innerHTML = ""
        for (let [i, label] of Settings.program.entries()) {
            let div = document.createElement("div")
            if(label > -1){
                div.classList.add("block")
                div.innerHTML = this.behaviors[label]
            } else {
                div.classList.add("block-empty")
                div.innerHTML = "EMPTY"
            }
            div.addEventListener("click", () => this.showBlockView(i))
            this.blocks.appendChild(div)
        }
    }

    private showBlockView(i:number): void {
        let v = new BlockView(i) // todo index as attribute <block-view index="3"></block-view> 
        document.body.appendChild(v)
        v.addEventListener('blockChosen', () => this.updateBlocks(), false)
    }

    private onSendButton() {
        if(!this.added) {
            this.dispatchEvent(new Event('robotCreated'))
            let btn = this.querySelector("#send-btn")
            btn.innerHTML = "UPDATE PROGRAM"
            this.added = true
            // TODO SHOW CONFIRMATION MODAL - YOUR ROBOT IS NOW ADDED TO THE GAME
        } else {
            this.dispatchEvent(new Event('programUpdated'))
        }
    }
}

customElements.define('program-view', ProgramView)