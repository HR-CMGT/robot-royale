import { Settings } from "../settings.js"

export class ConfirmView extends HTMLElement {

    private msg:string

    constructor(msg:string) {
        super()
        this.msg = msg
    }

    connectedCallback() {
        const modal = document.createElement("modal")
        this.appendChild(modal)

        const message = document.createElement("div")
        message.classList.add("message")
        message.innerHTML = `<h3>${Settings.getInstance().nickname}</h3><br>${this.msg}<br><br>`
        this.appendChild(message)

        const btn = document.createElement("button")
        btn.innerHTML = "OK!"
        message.appendChild(btn)

        const hue = `hue-rotate(${Settings.getInstance().color}deg)`
        message.style.filter = hue

 
        btn.addEventListener("click", () => this.remove())

    }
}

customElements.define('confirm-view', ConfirmView)