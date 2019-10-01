import { Settings } from "../interface/settings.js"

export class StatusBar {

    // Fields
    private bar         : HTMLElement
    private damagebar   : HTMLElement
    private ammo        : HTMLElement
    private info        : HTMLElement
    private killBar     : HTMLElement
    private rank        : HTMLImageElement
    private data        : Settings
    private imagePath   : string = "images/ranks/"
    private ranks       : string[] = ["1.svg", "2.svg", "3.svg", "4.svg"]

    // Properties
    public get Data() : Settings { return this.data}

    public set Ammo(v : number)      { this.ammo.innerHTML = "Projectiles "+v  }
    public set Health(health:number) { this.damagebar.style.width = (100 - health) + "%" }
    public set LifeTime(frames:number) {
        // the app is running roughly 60 fps
        let minutes : number = Math.floor(frames/3600)
        let seconds : number = Math.floor((frames%3600)/60)

        let min : string = minutes < 10 ? "0" + minutes : "" + minutes
        let sec : string = seconds < 10 ? "0" + seconds : "" + seconds

        this.info.innerHTML = this.data.nickname + " " + min + ":" + sec
    }
    public set Kills(kills: number) {
        // this.killBar.innerHTML = "Kills "+kills
        this.rank.src = this.imagePath
        if(kills < 2) this.rank.src += this.ranks[0]
        else if(kills < 5) this.rank.src += this.ranks[1]
        else if(kills < 7) this.rank.src += this.ranks[2]
        else if(kills < 9) this.rank.src += this.ranks[3]
    }

    constructor(data : Settings) {
        this.data = data

        let list = document.querySelector("#robotlist")
        this.bar = document.createElement("statusbar")

        this.damagebar = document.createElement("div")
        this.damagebar.classList.add("damage")
        this.damagebar.style.width = "0%"
        
        this.ammo = document.createElement("div")
        this.ammo.style.top = "20px"
        this.ammo.style.fontSize = "1em"
        
        this.info = document.createElement("div")
        this.info.innerHTML = data.nickname + " 0:03"

        this.killBar = document.createElement("div")
        this.killBar.classList.add("killbar")
        // this.killBar.style.top = "40px"
        // this.killBar.innerHTML = "Kills none"
        this.rank = document.createElement("img")
        this.killBar.appendChild(this.rank)
        this.Kills = 0

        this.bar.style.filter = `hue-rotate(${data.color}deg)`
        this.bar.appendChild(this.damagebar)
        this.bar.appendChild(this.info)
        this.bar.appendChild(this.ammo)
        this.bar.appendChild(this.killBar)

        list.appendChild(this.bar)
    }

    public remove(){
        this.bar.remove()
    }
}