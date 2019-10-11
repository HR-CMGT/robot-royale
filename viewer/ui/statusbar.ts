import { Settings } from "../interface/settings.js"
import { Tank } from "../gameobjects/tank/tank.js"

export class StatusBar {

    // Fields
    private bar         : HTMLElement
    private damageBar   : HTMLElement
    private infoBar     : HTMLElement
    private killBar     : HTMLElement
    private rankBar     : HTMLElement
    private data        : Settings

    // Properties
    public get Data() : Settings { return this.data}  // eigenlijk alleen voor nickname en color
    public set Health(health:number) { 
        this.damageBar.style.width = (100 - health) + "%" 
    }

    constructor(data : Settings) {
        this.data = data

        let list = document.querySelector("#robotlist")
        this.bar = document.createElement("statusbar")
        this.bar.style.filter = `hue-rotate(${data.color}deg)`
        
        this.rankBar = document.createElement("div")
        this.rankBar.style.backgroundImage = "url(./images/ranks/rank0.png)"
        
        this.killBar = document.createElement("div")
        this.killBar.innerHTML = "0"
        
        this.infoBar = document.createElement("div")
        this.infoBar.innerHTML = data.nickname

        // three elements of the status bar
        this.bar.appendChild(this.rankBar)  // rank image
        this.bar.appendChild(this.infoBar)  // name
        this.bar.appendChild(this.killBar)  // number of kills and ammo
        
        // damageBar transparant achter de info bar
        this.damageBar = document.createElement("div")
        this.damageBar.classList.add("damage")
        this.damageBar.style.width = "0%"
        // background of the status bar
        this.bar.appendChild(this.damageBar)

        list.appendChild(this.bar)
    }

    public updateStatus(kills: number, ammo:number) {
        this.killBar.innerHTML = `${kills}<br>${ammo}`
        // rank image
        let rank = Math.min(Math.floor(kills / 2), 4)
        this.rankBar.style.backgroundImage = `url(./images/ranks/rank${rank}.png)`
    }

    public remove(){
        this.bar.remove()
    }
}