import { Randomizer } from "./randomizer.js";
export class Settings extends EventTarget {
    constructor() {
        super();
        this._id = Randomizer.generateID();
    }
    static getInstance() {
        if (!Settings.instance) {
            Settings.instance = new Settings();
        }
        return Settings.instance;
    }
    set socketid(sid) {
        this._socketid = sid;
    }
    get nickname() {
        return this._nickname;
    }
    get armor() {
        return this._armor;
    }
    get program() {
        return this._program;
    }
    get color() {
        return this._color;
    }
    adjustProgram(position, p) {
        this._program[position] = p;
        this.update();
    }
    randomize() {
        this._color = Math.floor(Math.random() * 360);
        this._nickname = Randomizer.generateName();
        this._armor = Math.floor(Math.random() * 3);
        this._program = [5, 2, 0, 0, 0, 0];
        this.update();
    }
    update() {
        this.dispatchEvent(new Event("update"));
    }
    createJSON() {
        return JSON.stringify({
            id: this._id,
            socketid: this._socketid,
            color: this._color,
            nickname: this._nickname,
            armor: this._armor,
            program: this._program
        });
    }
}
Settings.Behaviors = ["EMPTY", "STOP AND SHOOT", "AIM AND SHOOT", "FIND AMMO", "FIND HEALTH", "MOVE FORWARD"];
