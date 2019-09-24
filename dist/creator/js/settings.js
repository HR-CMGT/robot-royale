import { Randomizer } from "./randomizer.js";
export class Settings {
    static randomize() {
        Settings.id = Randomizer.generateID();
        Settings.color = Math.floor(Math.random() * 360);
        Settings.nickname = Randomizer.generateName();
        Settings.armor = Math.floor(Math.random() * 3);
    }
}
