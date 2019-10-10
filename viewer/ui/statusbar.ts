import { Settings } from "../interface/settings.js"

export class StatusBar {

    // Fields
    private bar         : HTMLElement
    private damageBar   : HTMLElement
    private infoBar     : HTMLElement
    private killBar     : HTMLElement
    private rankBar     : HTMLElement
    private data        : Settings

    // Properties
    public get Data() : Settings { return this.data}
    public set Health(health:number) { 
        this.damageBar.style.width = (100 - health) + "%" 
    }

    public set Kills(kills: number) {
        this.killBar.innerHTML = kills.toString()
        // rank image
        let rank = Math.min(Math.floor(kills/2), 4)
        this.rankBar.style.backgroundImage = `url(./images/ranks/rank${rank}.png)`
    }

    constructor(data : Settings) {
        this.data = data

        let list = document.querySelector("#robotlist")
        this.bar = document.createElement("statusbar")
        this.bar.style.filter = `hue-rotate(${data.color}deg)`
        
        this.infoBar = document.createElement("div")
        this.infoBar.innerHTML = data.nickname

        this.killBar = document.createElement("div")
        this.killBar.innerHTML = "0"
    
        this.rankBar = document.createElement("div")
        this.rankBar.style.backgroundImage = "url(./images/ranks/rank0.png)"

        // three elements of the status bar
        this.bar.appendChild(this.rankBar)
        this.bar.appendChild(this.killBar)
        this.bar.appendChild(this.infoBar)


        // damageBar transparant achter de info bar
        this.damageBar = document.createElement("div")
        this.damageBar.classList.add("damage")
        this.damageBar.style.width = "0%"
        // background of the status bar
        this.bar.appendChild(this.damageBar)

        list.appendChild(this.bar)
    }

    public remove(){
        this.bar.remove()
    }
}