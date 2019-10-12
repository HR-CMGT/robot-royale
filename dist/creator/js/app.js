import { GeneratorView } from "./views/generatorview.js";
import { ProgramView } from "./views/programview.js";
import { ConfirmView } from "./views/confirmview.js";
import { Settings } from "./settings.js";
export class App {
    constructor() {
        Settings.getInstance().init();
        this.showGeneratorView();
        this.socket = io({ timeout: 60000 });
        this.socket.on('connect', () => Settings.getInstance().socketid = this.socket.id);
        this.socket.on('disconnect', (reason) => {
            console.log("game is disconnecting...");
            if (reason === 'io server disconnect') {
                this.socket.connect();
            }
        });
        this.socket.on('reconnect', (attemptNumber) => {
            console.log("creator reconnected");
            Settings.getInstance().socketid = this.socket.id;
            this.robotReconnected();
        });
        this.socket.on("tank destroyed", () => this.showConfirmBox("was destroyed!!!", false));
        this.socket.on("viewer refreshed", () => this.showConfirmBox("game was ended 😱", false));
        this.resizeUI();
    }
    resizeUI() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
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
        const json = Settings.getInstance().createJSON();
        console.log(json);
        this.socket.emit('robot created', json);
        this.showConfirmBox("was added to the game!", true);
    }
    robotReconnected() {
        const json = Settings.getInstance().createJSON();
        this.socket.emit('robot reconnected', json);
    }
    programUpdated() {
        const json = Settings.getInstance().createJSON();
        console.log(json);
        this.socket.emit('robot updated', json);
        this.showConfirmBox("program was updated!", true);
    }
    showConfirmBox(msg, allowClose) {
        let v = new ConfirmView(msg, allowClose);
        document.body.appendChild(v);
    }
}
window.addEventListener("DOMContentLoaded", () => new App());
