import { GeneratorView } from "./views/generatorview.js"
import { ProgramView } from "./views/programview.js"
import { Settings } from "./settings.js"

export class App {

    private socket: SocketIOClient.Socket
    
    constructor() {
        this.socket = io()
        this.socket.on('connect', () =>  this.init(this.socket.id))
    }
    
    private init(socketid:string){
        console.log("creator connected " + socketid)
        Settings.socketid = socketid
        Settings.randomize()

        this.showGeneratorView()
        // this.showProgramView()

        /* todo recalculate flexbox when the address bar hides on ios/android
        window.onresize = function() {
            document.body.height = window.innerHeight;
        }
        window.onresize(); // called to initially set the height.
        */
    }

    private showGeneratorView():void {
        let v = new GeneratorView()
        document.body.appendChild(v)
        v.addEventListener('confirm', (e) => this.showProgramView(), false)
    }

    private showProgramView() : void {
        let v = new ProgramView()
        document.body.appendChild(v)
        v.addEventListener('robotCreated', (e) => this.robotCreated(), false)
        v.addEventListener('programUpdated', (e) => this.updateProgram(), false)
    }

    private robotCreated() : void {
        console.log("send new robot")

        /*
        const json : string = JSON.stringify(this.data)
        console.log(json)

        this.socket.emit('robot created', json)
        */
    }

    private updateProgram(){
        console.log("send new program")
        
        /*
        console.log("robot power " + this.data.id)
        this.socket.emit('robot power', JSON.stringify(this.data.id))
        */
    }
}

window.addEventListener("DOMContentLoaded", () => new App())