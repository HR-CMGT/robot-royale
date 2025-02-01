import { Tank } from "./gameobjects/tank/tank.js";
import { Factory } from "./core/factory.js";
import { GameObject } from "./core/gameobject.js";
import { PickUp } from "./gameobjects/pickups/pickup.js";
import { DebugInfo } from "./ui/debuginfo.js";
import { Settings } from "./interface/settings.js";
import { Ammo } from "./gameobjects/pickups/ammo.js";
import { Health } from "./gameobjects/pickups/health.js";
import { Leaderboard } from "./ui/leaderboard.js";

export class Game {
    // static Fields
    private static instance   : Game
    public static DEBUG : boolean = false

    // Fields
    private gameObjects       : GameObject[]  = []
    private socket            : SocketIOClient.Socket
    private leaderboard       : Leaderboard

    private fps               : number = 60
    private fpsInterval       : number = 1000 / this.fps
    private startTime         : number = Date.now()
    private now               : number = 0
    private then              : number = Date.now()
    private elapsed           : number = 0

    public gameover           : boolean = false
    
    // Properties
    public get AmmoBoxes() : PickUp[] { 
        return this.gameObjects.filter(o => o instanceof Ammo) as Ammo[]
    }
    public get RepairKits() : PickUp[] { 
        return this.gameObjects.filter(o => o instanceof Health) as Health[]
    }
    public get Tanks() : Tank[] { 
        return this.gameObjects.filter(o => o instanceof Tank) as Tank[]
    }
    
    public static get Instance() : Game {
        if(!this.instance) this.instance = new Game()
        return this.instance
    }

    AddGameObject(gameObject : GameObject) {
        this.gameObjects.push(gameObject)
    }

    private constructor() {
        this.leaderboard = new Leaderboard()
        
        this.socket = io()

        this.socket.emit('viewer refreshed')

        this.socket.on('robot created', (json : string) => {
            console.log("game received a new robot")
            let data : Settings = JSON.parse(json)
            this.addTank(data)
        })

        this.socket.on('robot updated', (json : string) => {
            let settings = JSON.parse(json)
            console.log('viewer received new program for ' + settings.nickname)
            this.updateTankProgram(settings)
        })

        this.socket.on('robot reconnected', (json: string) => {
            let settings = JSON.parse(json)
            console.log('viewer received new socket id for ' + settings.nickname)
            this.updateTankConnection(settings)
        })

        this.checkDebug()
        
        this.update()
    }

    private checkDebug(){
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            Game.DEBUG = true
            this.gameObjects.push(new DebugInfo())
            for (let i = 0; i < 10; i++) {
                this.addTank(this.randomSettings())
            }
        }
    }

    public getRandomEnemy(excludeTank:GameObject) : GameObject | undefined {
        let enemyTanks: GameObject[] = this.gameObjects.filter(o => (o instanceof Tank && o != excludeTank)) as Tank[]
        // console.log("Total enemy tanks: " + enemyTanks.length)

        // pick random
        let randomTank
        if (enemyTanks.length > 0) {
            randomTank = enemyTanks[Math.floor(Math.random() * enemyTanks.length)]
        } 
        
        return randomTank
    }

    private addTank(data : Settings) {
        // status bar on the right receives data
        // let bar = new StatusBar(data)

        // actual moving tank, receives its corresponding data and status bar
        let tank : GameObject = Factory.CreateBehavioralObject("tank", data)
        this.gameObjects.push(tank)

        this.redrawAllTankStatus()
    }

    private updateTankProgram(data : Settings) {
        let tank : Tank = this.Tanks.find((tank) => tank.Data.id === data.id)
        if(tank) {
            tank.updateProgram(data)
        } else {
            // the tank died while the user updated the program
            this.socket.emit('robot destroyed', data.socketid)
        }
    }

    private updateTankConnection(data: Settings) {
        let tank: Tank = this.Tanks.find((tank) => tank.Data.id === data.id)
        if(tank) {
            console.log("updated socket id to " + tank.Data.socketid)
            tank.Data.socketid = data.socketid
        } else {
            // the tank died while the user was disconnected
            console.log("tank died while user was disconnected")
            this.socket.emit('robot destroyed', data.socketid)
        }
    }

    private update(){
        this.now = Date.now();
        this.elapsed = this.now - this.then;

        // if enough time has elapsed, draw the next frame
        if (this.elapsed > this.fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            this.then = this.now - (this.elapsed % this.fpsInterval);

            // Put your drawing code here
            // Todo when adding a lot of tanks on runtime. error in update loop
            if(PickUp.NUMBER_OF_PICKUPS < PickUp.MAX_PICKUPS && PickUp.DELTA_TIME_PICKUPS > PickUp.INTERVAL_NEW_PICKUP) {
                PickUp.NUMBER_OF_PICKUPS++
                PickUp.DELTA_TIME_PICKUPS = 0

                if (Math.random() < 0.5) this.gameObjects.push(new Ammo())
                else this.gameObjects.push(new Health())
            }
            PickUp.DELTA_TIME_PICKUPS++

            for (let object1 of this.gameObjects) {
                object1.update()
                for (let object2 of this.gameObjects) {
                    if (object1 != object2 && object1.detectCollision(object2)) {
                        object1.collide(object2)
                        object2.collide(object1)
                    }
                }
            }

            // Remove all dead objects
            for (let obj of this.gameObjects) {
                if(obj.CanDestroy) {
                    if(obj instanceof PickUp) PickUp.NUMBER_OF_PICKUPS--
                    this.removeGameObject(obj)
                }

            }

            if(this.Tanks.length < 6) {
                this.addTank(this.randomSettings())
            }
        }


        if(!this.gameover) requestAnimationFrame(() => this.update())
    }

    // if a robot is destroyed here, also update the list on the server
    public removeGameObject(gameObject : GameObject) {
        // console.log("dead: " + gameObject.Data.id)
        let index = this.gameObjects.indexOf(gameObject)
        if(index > -1) { 
            let objs : GameObject[] = this.gameObjects.splice(index,1)
            objs[0].remove()
        }
        
        // let the player know that this robot has died
        if(gameObject instanceof Tank) {
            this.redrawAllTankStatus()

            // use the tank connection id, so we can send a message to this specific tank
            // console.log("tank died: " + gameObject.Data.socketid)
            this.socket.emit('robot destroyed', gameObject.Data.socketid)
        }
    }

    public checkHighScore(t:Tank) {
        this.leaderboard.checkHighScore(t)
    }

    // just for debugging
    private randomSettings() : Settings {
        if(Math.random() < 0.3) {
            return {
                id: String(Math.random() * 1000),
                socketid: String(Math.random() * 1000),
                color: Math.floor(Math.random() * 360),
                nickname: "Billy Bob",
                armor: 2,//Math.floor(Math.random() * 3), 
                program: [2, 3, 0, 0, 0, 0] // ["EMPTY", "STOP AND SHOOT", "AIM AND SHOOT", "FIND AMMO", "FIND HEALTH", "MOVE FORWARD"]
            }
        } else {
            return {
                id: String(Math.random() * 1000),
                socketid: String(Math.random() * 1000),
                color: Math.floor(Math.random() * 360),
                nickname: "Evil Erik",
                armor: 0,//Math.floor(Math.random() * 3),
                program: [2, 3, 0, 0, 0, 0] // ["EMPTY", "STOP AND SHOOT", "AIM AND SHOOT", "FIND AMMO", "FIND HEALTH", "MOVE FORWARD"]
            }
        }
 
        
    }

    private redrawAllTankStatus() {
        let tanks : Tank[] = this.Tanks
        tanks.sort(function (a, b) {
            // longest lifetime first
            return b.Kills - a.Kills;
        })
        
        for (const tank of tanks) {
            tank.redrawStatus()
        }
        
    }
   
}

window.addEventListener("DOMContentLoaded", () => Game.Instance)