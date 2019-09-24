import { Settings } from "../settings.js"

export class BlockView extends HTMLElement {

    private behaviors: string[] = ["MOVE AND SHOOT", "AIM AND SHOOT", "FIND AMMO", "FIND HEALTH"]
    private index : number

    constructor(i:number) {
        super()
        this.index = i // which block are we editing
    }

    connectedCallback() {
        console.log("Editing block " + this.index)
        
        const modal = document.createElement("modal")
        this.appendChild(modal)

        const blocks = document.createElement("div")
        blocks.classList.add("blocks")
        this.appendChild(blocks)

        const hue = `hue-rotate(${Settings.color}deg)`
        blocks.style.filter = hue

        // place program blocks
        for (let [i, b] of this.behaviors.entries()) {
            let div = document.createElement("div")
            div.classList.add("block")
            div.innerHTML = b            
            div.addEventListener("click", () => this.chooseBlock(i))
            blocks.appendChild(div)
        }
    }

    private chooseBlock(i:number) {
        Settings.program[this.index] = i
        this.dispatchEvent(new Event('blockChosen'))
        this.remove()
    }
}

customElements.define('block-view', BlockView)