import { Tank } from "./gameobjects/tank/tank.js";
import { BehavioralObjectFactory } from "./behavioralobjectfactory.js";
import { GameObject } from "./gameobject.js";
import { AmmoBox } from "./gameobjects/ammobox.js";
import { Settings } from "./interface/settings.js";

export class Game {

    // Fields
    private static instance : Game

    private gameObjects : GameObject[]  = []
    private socket      : SocketIOClient.Socket

    public gameover : boolean = false
    
    // Properties
    public get AmmoBoxes() : AmmoBox[] { 
        return this.gameObjects.filter(o => { return o instanceof AmmoBox}) as AmmoBox[]
    }
    public get Tanks() : Tank[] { 
        return this.gameObjects.filter(o => { return o instanceof Tank}) as Tank[]
    }
    
    public static get Instance() : Game {
        if(!this.instance) this.instance = new Game()
        return this.instance
    }

    private constructor() {
        this.socket = io()

        this.socket.on('new robot', (json : string) => {
            let data : Settings = JSON.parse(json)
            this.addTank(data)
        })

        // -- DEBUG!! --
        this.addTank({
            id: "123232",
            socketid : "146464",
            color: 45,
            nickname: "Old Billy Bob",
            armor: 1,
            program: [1,1,0,0,0,0]
        })

        this.socket.on('robot updated', (json : string) => {
            let settings = JSON.parse(json)
            console.log('viewer received new program for ' + settings.nickname)
        })

        for (let i = 0; i < 5; i++) {
            this.gameObjects.push(new AmmoBox())
        }

        setInterval(() => {
            this.gameObjects.push(new AmmoBox())
        }, 5000);

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
            if(obj.CanDestroy) this.removeGameObject(obj)
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
}

window.addEventListener("DOMContentLoaded", () => Game.Instance)