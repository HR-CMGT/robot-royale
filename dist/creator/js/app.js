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
            console.log("game reconnected");
            Settings.getInstance().socketid = this.socket.id;
        });
        this.socket.on("tank destroyed", () => this.showConfirmBox("was destroyed!!!", false));
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
