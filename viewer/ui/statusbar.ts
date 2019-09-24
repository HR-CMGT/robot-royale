export class StatusBar {

    // Fields
    private bar         : HTMLElement
    private damagebar   : HTMLElement
    private ammo        : HTMLElement

    // Properties
    public set Ammo(v : number)     { this.ammo.innerHTML = "Projectiles "+v  }

    constructor(data : Settings) {
        let list = document.querySelector("#robotlist")
        this.bar = document.createElement("statusbar")

        this.damagebar = document.createElement("div")
        this.damagebar.classList.add("damage")
        this.damagebar.style.width = "0%"
        
        this.ammo = document.createElement("div")
        this.ammo.style.top = "20px"
        this.ammo.style.fontSize = "1em"
        
        let info = document.createElement("div")
        info.innerHTML = data.nickname + " 0:03"

        this.bar.style.filter = `hue-rotate(${data.color}deg)`
        this.bar.appendChild(this.damagebar)
        this.bar.appendChild(info)
        this.bar.appendChild(this.ammo)

        list.appendChild(this.bar)
    }

    // todo show time alive
    public update(health : number){
        this.damagebar.style.width = (100 - health) + "%"        
    }

    public remove(){
        this.bar.remove()
    }
}