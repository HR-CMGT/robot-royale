import { Settings } from "../settings.js"

export class ConfirmView extends HTMLElement {

    private msg:string
    private allowClose:boolean

    constructor(msg:string, allowClose:boolean) {
        super()
        this.msg = msg
        this.allowClose = allowClose
    }

    connectedCallback() {
        const modal = document.createElement("modal")
        this.appendChild(modal)

        const message = document.createElement("div")
        message.classList.add("message")
        message.innerHTML = `<h3>${Settings.getInstance().nickname}</h3><br>${this.msg}<br><br>`
        this.appendChild(message)

        const hue = `hue-rotate(${Settings.getInstance().color}deg)`
        message.style.filter = hue
        
        const btn = document.createElement("button")
        message.appendChild(btn)

        if (this.allowClose) {
            btn.innerHTML = "OK!"
            btn.addEventListener("click", () => this.remove())
        } else {
            btn.innerHTML = "Restart"
            btn.addEventListener("click", () => location.reload())
        }
    }
}

customElements.define('confirm-view', ConfirmView)