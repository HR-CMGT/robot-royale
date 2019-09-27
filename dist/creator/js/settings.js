import { Randomizer } from "./randomizer.js";
export class Settings {
    static randomize() {
        Settings.id = Randomizer.generateID();
        Settings.color = Math.floor(Math.random() * 360);
        Settings.nickname = Randomizer.generateName();
        Settings.armor = Math.floor(Math.random() * 3);
        Settings.program = [0, 0, -1, -1, -1, -1];
    }
    static createJSON() {
        return JSON.stringify({
            id: Settings.id,
            socketid: Settings.socketid,
            color: Settings.color,
            nickname: Settings.nickname,
            armor: Settings.armor,
            program: Settings.program
        });
    }
}
