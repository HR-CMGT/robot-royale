import { Settings } from "../settings.js"

export class BlockView extends HTMLElement {

    private behaviors: string[] = ["EMPTY", "MOVE AND SHOOT", "AIM AND SHOOT", "FIND AMMO", "FIND HEALTH"]
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

        const hue = `hue-rotate(${Settings.getInstance().color}deg)`
        blocks.style.filter = hue

        // place program blocks
        for (let [index, label] of this.behaviors.entries()) {
            let div = document.createElement("div")
            let cl = (index > 0) ? "block" : "block-empty"
            div.classList.add(cl)
            div.innerHTML = label       
            div.addEventListener("click", () => this.chooseBlock(index))
            blocks.appendChild(div)
        }
    }

    private chooseBlock(i:number) {
        // UPDATING SETTINGS WILL NOTIFY ALL SETTINGS LISTENERS
        Settings.getInstance().adjustProgram(this.index, i) 
        this.remove()

        // old
        // Settings.program[this.index] = i
        //this.dispatchEvent(new Event('blockChosen'))
    }
}

customElements.define('block-view', BlockView)