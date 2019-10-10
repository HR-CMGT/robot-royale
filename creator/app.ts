import { GeneratorView } from "./views/generatorview.js"
import { ProgramView } from "./views/programview.js"
import { ConfirmView } from "./views/confirmview.js"
import { Settings } from "./settings.js"

export class App {

    private socket: SocketIOClient.Socket
    
    constructor() {
        Settings.getInstance().init()
        this.showGeneratorView()
        // connection can close and reopen while the game is running (browser sleeping/tab pausing) // set timeout to prevent glitch
        this.socket = io({ timeout: 60000 })
        this.socket.on('connect', () => Settings.getInstance().socketid = this.socket.id)

        this.socket.on('disconnect', (reason:string) => {
            console.log("game is disconnecting...")
            if (reason === 'io server disconnect') {
                // disconnection initiated by server, you need to reconnect manually, else the socket will automatically try to reconnect
                this.socket.connect()
            }
        })

        // successful reconnect: https://socket.io/docs/client-api/#Event-‘reconnect’
        this.socket.on('reconnect', (attemptNumber:number) => {
            console.log("creator reconnected")
            // this tank now has a new socketid
            Settings.getInstance().socketid = this.socket.id
            // resend whole tank to the server, because socketid has changed
            this.robotReconnected()
        })

        // this tank is destroyed! note: only works when socket id did not change
        this.socket.on("tank destroyed", () => this.showConfirmBox("was destroyed!!!", false))

        // viewer refreshed
        this.socket.on("viewer refreshed", () => this.showConfirmBox("game was ended 😱", false))
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

    private robotCreated() : void {
        const json : string = Settings.getInstance().createJSON()
        console.log(json)
        this.socket.emit('robot created', json)
        this.showConfirmBox("was added to the game!", true)
    }

    private robotReconnected(){
        const json: string = Settings.getInstance().createJSON()
        this.socket.emit('robot reconnected', json)
    }

    private programUpdated() {
        const json: string = Settings.getInstance().createJSON()
        console.log(json)
        this.socket.emit('robot updated', json)
        this.showConfirmBox("program was updated!", true)
    }

    // test: what if the gameoverbox shows while another box is still open?
    private showConfirmBox(msg: string, allowClose:boolean): void {
        let v = new ConfirmView(msg, allowClose)
        document.body.appendChild(v)
    }
}

window.addEventListener("DOMContentLoaded", () => new App())

/* todo recalculate flexbox when the address bar hides on ios/android
window.onresize = function() {
    document.body.height = window.innerHeight;
}
*/