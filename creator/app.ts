import { GeneratorView } from "./generatorview.js"

export class App {

    private socket: SocketIOClient.Socket
    private view : HTMLElement
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
        // create generator view
        this.view = new GeneratorView()
        document.body.appendChild(this.view)   
    }
}

window.addEventListener("DOMContentLoaded", () => new App())