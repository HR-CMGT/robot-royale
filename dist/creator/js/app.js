import { GeneratorView } from "./generatorview.js";
export class App {
    constructor() {
        this.socket = io();
        this.socket.on('connect', () => {
            console.log("creator connected to server");
            console.log(this.socket.id);
            this.connectionid = this.socket.id;
            this.init();
        });
    }
    init() {
        this.view = new GeneratorView();
        document.body.appendChild(this.view);
    }
}
window.addEventListener("DOMContentLoaded", () => new App());
