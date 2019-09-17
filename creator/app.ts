import { Robot } from "./interface/robot"
import { Generator } from "./generator.js"   // have to add .js to load module in browser

export class App {

    private socket: SocketIOClient.Socket
    private field: HTMLElement
    private bg:HTMLElement
    private data : Robot
    private connectionid : string
    
    constructor() {
        this.socket = io()
        
        // use socket id to send specific message from viewer to this creator view only
        this.socket.on('connect', () => {
            console.log("creator connected to server")
            console.log(this.socket.id)
            this.connectionid = this.socket.id
            
            this.init()
        })
    }
    
    private init(){
        this.field = document.querySelector("#field")
        this.bg = document.querySelector(".middle")
        document.querySelector("#randomize").addEventListener("click", () => this.initRobot())
        document.querySelector("#sendrobot").addEventListener("click", () => this.sendData())
        document.querySelector("#powerbutton").addEventListener("click", () => this.usePower())
        this.initRobot()
    }   

    // create data object with all required values
    private initRobot() : void {
        this.randomDropdowns()

        const move = (document.querySelector("#move") as HTMLSelectElement).selectedIndex
        const armor = (document.querySelector("#armor") as HTMLSelectElement).selectedIndex
        const powerselect = (document.querySelector("#power") as HTMLSelectElement)
        const power = powerselect.selectedIndex

        this.data = {
            id: Generator.generateID(),
            connectionid: this.connectionid,
            color: Generator.generateColor(),
            name: Generator.generateName(),
            move,
            power,
            armor
        }

        // display color, name and special power button
        this.field.innerText = this.data.name
        this.bg.style.backgroundColor = this.data.color
        document.querySelector("#powerbutton").innerHTML = powerselect.options[power].text

        console.log("selected power is " + power)
        console.log("selected text is " + powerselect.options[power].text)
    }

    // set dropdowns to random values
    private randomDropdowns() {
        let selectors = document.querySelectorAll("select")
        for (let s of selectors) {
            s.selectedIndex = Math.floor(Math.random() * s.length)
        }
    }

    private sendData() {
        this.showControls()

        const json : string = JSON.stringify(this.data)
        console.log(json)

        this.socket.emit('robot created', json)
    }

    private usePower() {
        console.log("robot power " + this.data.id)
        this.socket.emit('robot power', JSON.stringify(this.data.id))
    }

    private showControls() {
        document.querySelector(".options").classList.add("disabled")
        document.querySelector(".buttonrow").classList.add("disabled")

        document.querySelector(".submitmessage").classList.remove("disabled")
        document.querySelector(".shootbuttonrow").classList.remove("disabled")
    }
}

window.addEventListener("DOMContentLoaded", () => new App())