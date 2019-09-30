import { Tank } from "./gameobjects/tank/tank.js";
import { BehavioralObjectFactory } from "./behavioralobjectfactory.js";
import { GameObject } from "./gameobject.js";
import { PickUp } from "./gameobjects/pickups/pickup.js";
import { DebugInfo } from "./ui/debuginfo.js";
import { Settings } from "./interface/settings.js";
import { Ammo } from "./gameobjects/pickups/ammo.js";
import { Health } from "./gameobjects/pickups/health.js";

export class Game {
    // static Fields
    private static instance   : Game

    // Fields
    private gameObjects       : GameObject[]  = []
    private socket            : SocketIOClient.Socket
    public gameover           : boolean = false
    
    // Properties
    public get AmmoBoxes() : PickUp[] { 
        return this.gameObjects.filter(o => { return o instanceof Ammo}) as Ammo[]
    }
    public get RepairKits() : PickUp[] { 
        return this.gameObjects.filter(o => { return o instanceof Health}) as Health[]
    }
    public get Tanks() : Tank[] { 
        return this.gameObjects.filter(o => { return o instanceof Tank}) as Tank[]
    }
    
    public static get Instance() : Game {
        if(!this.instance) this.instance = new Game()
        return this.instance
    }

    private constructor() {
        this.gameObjects.push(new DebugInfo())

        this.socket = io()

        this.socket.on('new robot', (json : string) => {
            console.log("game received a new robot")
            let data : Settings = JSON.parse(json)
            this.addTank(data)
        })

        // -- DEBUG!! --
        for(let i = 0; i<3; i++) {
            this.addTank(this.randomSettings())
        }

        this.socket.on('robot updated', (json : string) => {
            let settings = JSON.parse(json)
            console.log('viewer received new program for ' + settings.nickname)
        })

        // for (let i = 0; i < 3; i++) {
        //     this.gameObjects.push(new AmmoBox())
        // }

        // setInterval(() => {
        //     this.gameObjects.push(new AmmoBox())
        // }, 5000);

        this.update()
    }

    private addTank(data : Settings) {
        // status bar on the right receives data
        // let bar = new StatusBar(data)

        // actual moving tank, receives its corresponding data and status bar
        let tank : GameObject = BehavioralObjectFactory.CreateObject("tank", data)

        this.gameObjects.push(tank)
    }

    private update(){
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

        if(!this.gameover) requestAnimationFrame(() => this.update())
    }

    // if a robot is destroyed here, also update the list on the server
    public removeGameObject(gameObject : GameObject) {
        // console.log("dead: " + gameObject.Data.id)
        let index = this.gameObjects.indexOf(gameObject)
        if(index > -1) { 
            let objs : GameObject[] = this.gameObjects.splice(index,1)
            objs[0].destroy()
        }
        
        // let the player know that this robot has died
        if(gameObject instanceof Tank) {
            this.socket.emit('robot destroyed', gameObject.Data.id)
        }
    }

    public addBullet(b : GameObject) {
        this.gameObjects.push(b)
    }

    // just for debugging
    private randomSettings() : Settings {
        return {
            id: String(Math.random() * 1000),
            socketid: String(Math.random() * 1000),
            color: Math.floor(Math.random() * 360),
            nickname: "Old Billy Bob",
            armor: Math.floor(Math.random() * 3), // 0 1 2 ?
            program: [1, 1, 0, 0, 0, 0]
        }
    }
}

window.addEventListener("DOMContentLoaded", () => Game.Instance)