import { Generator } from "./generator.js";
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
        this.field = document.querySelector("#field");
        this.bg = document.querySelector(".middle");
        document.querySelector("#randomize").addEventListener("click", () => this.initRobot());
        document.querySelector("#sendrobot").addEventListener("click", () => this.sendData());
        document.querySelector("#powerbutton").addEventListener("click", () => this.usePower());
        this.initRobot();
    }
    initRobot() {
        this.randomDropdowns();
        const move = document.querySelector("#move").selectedIndex;
        const armor = document.querySelector("#armor").selectedIndex;
        const powerselect = document.querySelector("#power");
        const power = powerselect.selectedIndex;
        this.data = {
            id: Generator.generateID(),
            connectionid: this.connectionid,
            color: Generator.generateColor(),
            name: Generator.generateName(),
            move,
            power,
            armor
        };
        this.field.innerText = this.data.name;
        this.bg.style.backgroundColor = this.data.color;
        document.querySelector("#powerbutton").innerHTML = powerselect.options[power].text;
        console.log("selected power is " + power);
        console.log("selected text is " + powerselect.options[power].text);
    }
    randomDropdowns() {
        let selectors = document.querySelectorAll("select");
        for (let s of selectors) {
            s.selectedIndex = Math.floor(Math.random() * s.length);
        }
    }
    sendData() {
        this.showControls();
        const json = JSON.stringify(this.data);
        console.log(json);
        this.socket.emit('robot created', json);
    }
    usePower() {
        console.log("robot power " + this.data.id);
        this.socket.emit('robot power', JSON.stringify(this.data.id));
    }
    showControls() {
        document.querySelector(".options").classList.add("disabled");
        document.querySelector(".buttonrow").classList.add("disabled");
        document.querySelector(".submitmessage").classList.remove("disabled");
        document.querySelector(".shootbuttonrow").classList.remove("disabled");
    }
}
window.addEventListener("DOMContentLoaded", () => new App());
