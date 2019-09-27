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
        Settings.program = [0,0,-1,-1,-1,-1]

        // extends EventTarget, and then new Settings() will allow addEventListener on settings!
        //@ts-ignore
        // Settings.dispatchEvent(new Event('settings'))
    }

    // todo new Settings
    public static createJSON() : string {
        return JSON.stringify({
            id: Settings.id,
            socketid: Settings.socketid,
            color:Settings.color,
            nickname:Settings.nickname,
            armor:Settings.armor,
            program:Settings.program
        })
    }
}