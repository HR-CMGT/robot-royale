import { GeneratorView } from "./views/generatorview.js"
import { ProgramView } from "./views/programview.js"
import { ConfirmView } from "./views/confirmview.js"
import { Settings } from "./settings.js"

export class App {

    private socket: SocketIOClient.Socket
    
    constructor() {
        console.log("starting all the things...")
        this.socket = io()
        this.socket.on('connect', () =>  this.init(this.socket.id))
    }
    
    private init(socketid:string){
        console.log("creator connects " + socketid)
        Settings.getInstance().socketid = socketid
        Settings.getInstance().randomize()

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
        v.addEventListener('programUpdated', (e) => this.programUpdated(), false)
    }   

    private showConfirmBox(msg:string):void {
        let v = new ConfirmView(msg)
        document.body.appendChild(v)
    }

    private robotCreated() : void {
        const json : string = Settings.getInstance().createJSON()
        console.log(json)
        this.socket.emit('robot created', json)
        this.showConfirmBox("was added to the game!")
    }

    private programUpdated(){
        const json: string = Settings.getInstance().createJSON()
        console.log(json)
        this.socket.emit('robot updated', json)
        this.showConfirmBox("program was updated!")
    }
}

window.addEventListener("DOMContentLoaded", () => new App())