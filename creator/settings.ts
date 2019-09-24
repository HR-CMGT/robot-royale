import { Randomizer } from "./randomizer.js"

export class Settings {
    public static id: string
    public static socketid: string // use socket id to send specific message from viewer to this creator only
    public static color: number
    public static nickname: string
    public static armor: number
    public static program : number[]

    public static randomize(){
        Settings.id = Randomizer.generateID()
        Settings.color =  Math.floor(Math.random() * 360)
        Settings.nickname = Randomizer.generateName()
        Settings.armor = Math.floor(Math.random() * 3)

        // only elements can dispatch events
        //@ts-ignore
        // Settings.dispatchEvent(new Event('settings'))
    }
}