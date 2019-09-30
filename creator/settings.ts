import { Randomizer } from "./randomizer.js"

export class Settings extends EventTarget {
    private static instance: Settings
    
    public static getInstance() {
        if (!Settings.instance) {
            Settings.instance = new Settings()
        }
        return Settings.instance
    }

    private constructor() { 
        super()
        this._id = Randomizer.generateID()
    }

    private _id: string
    private _socketid: string // use socket id to send specific message from viewer to this creator only
    private _program : number[]  
    private _color: number
    private _nickname: string
    private _armor: number

    set socketid(sid:string) {
        this._socketid = sid
    }

    get nickname() : string {
        return this._nickname
    }

    get armor(): number {
        return this._armor
    }

    get program(): number[] {
        return this._program
    }

    get color(): number {
        return this._color
    }

    public adjustProgram(position:number, p:number) {
        this._program[position] = p
        this.update()
    }

    public randomize(){
        this._color =  Math.floor(Math.random() * 360)
        this._nickname = Randomizer.generateName()
        this._armor = Math.floor(Math.random() * 3)
        this._program = [1,1,0,0,0,0]
        this.update()
    }

    private update(){
        this.dispatchEvent(new Event("update"))
    }

    // todo new Settings
    public createJSON() : string {
        return JSON.stringify({
            id: this._id,
            socketid: this._socketid,
            color:this._color,
            nickname:this._nickname,
            armor:this._armor,
            program:this._program
        })
    }
}