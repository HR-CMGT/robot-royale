import { Settings } from "../interface/settings.js"
import { Tank } from "../gameobjects/tank/tank.js"

export class StatusBar {

    // Fields
    private bar         : HTMLElement
    private damageBar   : HTMLElement
    private nameBar     : HTMLElement
    private ammoBar     : HTMLElement
    private rankBar     : HTMLElement
    private data        : Settings

    // Properties
    public get Data() : Settings { return this.data}  // eigenlijk alleen voor nickname en color
    public set Health(health:number) { 
        this.damageBar.style.width = (100 - health) + "%" 
    }

    public set Kills(kills: number) {
        // rank image
        let rank = Math.min(Math.floor(kills / 2), 4)
        this.rankBar.style.backgroundImage = `url(./images/ranks/rank${rank}.png)`
        this.rankBar.innerHTML = `${kills}`
    }

    public set Ammo(ammo: number) {
        this.ammoBar.innerHTML = ammo.toString()
    }

    constructor(data : Settings) {
        this.data = data

        let list = document.querySelector("#robotlist")
        this.bar = document.createElement("statusbar")
        this.bar.style.filter = `hue-rotate(${data.color}deg)`
        
        this.rankBar = document.createElement("div")
        this.rankBar.style.backgroundImage = "url(./images/ranks/rank0.png)"
        this.rankBar.innerHTML = "0"
        
        this.ammoBar = document.createElement("div")
        this.ammoBar.innerHTML = "0"
        
        this.nameBar = document.createElement("div")
        this.nameBar.innerHTML = data.nickname

        // three elements of the status bar
        this.bar.appendChild(this.rankBar)
        this.bar.appendChild(this.ammoBar)
        this.bar.appendChild(this.nameBar) 
        
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