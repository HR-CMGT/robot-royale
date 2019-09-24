import { GeneratorView } from "./views/generatorview.js";
import { ProgramView } from "./views/programview.js";
import { Settings } from "./settings.js";
export class App {
    constructor() {
        this.socket = io();
        this.socket.on('connect', () => this.init(this.socket.id));
    }
    init(socketid) {
        console.log("creator connects " + socketid);
        Settings.socketid = socketid;
        Settings.randomize();
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
    robotCreated() {
        const json = Settings.createJSON();
        console.log(json);
        this.socket.emit('robot created', json);
    }
    programUpdated() {
        const json = Settings.createJSON();
        console.log(json);
        this.socket.emit('robot updated', json);
    }
}
window.addEventListener("DOMContentLoaded", () => new App());
