import { GeneratorView } from "./views/generatorview.js";
import { ProgramView } from "./views/programview.js";
import { Settings } from "./settings.js";
export class App {
    constructor() {
        this.socket = io();
        this.socket.on('connect', () => this.init(this.socket.id));
    }
    init(socketid) {
        console.log("creator connected " + socketid);
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
        v.addEventListener('programUpdated', (e) => this.updateProgram(), false);
    }
    robotCreated() {
        console.log("send new robot");
    }
    updateProgram() {
        console.log("send new program");
    }
}
window.addEventListener("DOMContentLoaded", () => new App());
