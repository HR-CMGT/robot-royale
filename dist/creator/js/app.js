import { GeneratorView } from "./views/generatorview.js";
import { ProgramView } from "./views/programview.js";
import { ConfirmView } from "./views/confirmview.js";
import { Settings } from "./settings.js";
export class App {
    constructor() {
        console.log("starting all the things...");
        this.socket = io();
        this.socket.on('connect', () => this.init(this.socket.id));
    }
    init(socketid) {
        console.log("creator connects " + socketid);
        Settings.getInstance().socketid = socketid;
        Settings.getInstance().randomize();
        this.showGeneratorView();
    }
    showGeneratorView() {
        let v = new GeneratorView();
        document.body.appendChild(v);
        v.addEventListener('confirm', (e) => this.showProgramView(), false);
    }
    showProgramView() {
        let v = new ProgramView();
        document.body.appendChild(v);
        v.addEventListener('robotCreated', (e) => this.robotCreated(), false);
        v.addEventListener('programUpdated', (e) => this.programUpdated(), false);
    }
    showConfirmBox(msg) {
        let v = new ConfirmView(msg);
        document.body.appendChild(v);
    }
    robotCreated() {
        const json = Settings.getInstance().createJSON();
        console.log(json);
        this.socket.emit('robot created', json);
        this.showConfirmBox("was added to the game!");
    }
    programUpdated() {
        const json = Settings.getInstance().createJSON();
        console.log(json);
        this.socket.emit('robot updated', json);
        this.showConfirmBox("program was updated!");
    }
}
window.addEventListener("DOMContentLoaded", () => new App());
