import { Robot } from "./robot.js";
import { BehavioralObjectFactory } from "./behavioralobjectfactory.js";
import { GameObject } from "./gameobject.js";
import { AmmoBox } from "./ammobox.js";

export class Game {

    // Fields
    private static instance : Game

    private gameObjects : GameObject[]  = []
    private ammoBoxes   : AmmoBox[]     = []
    private socket      : SocketIOClient.Socket

    public gameover : boolean = false
    // Properties
    public get AmmoBoxes() : AmmoBox[] { return this.ammoBoxes }
    
    public static get Instance() : Game {
        if(!this.instance) this.instance = new Game()
        return this.instance
    }

    private constructor() {
        this.socket = io()

        this.socket.on('new robot', (json : string) => {
            let data : RobotData = JSON.parse(json)
            this.addRobot(data)
        })

        this.socket.on('robot power', (id : string) => {
            console.log("special power for: " + id)
        })

        for (let i = 0; i < 5; i++) {
            this.ammoBoxes.push(new AmmoBox())
        }

        this.update()
    }

    private addRobot(data : RobotData) {
        // status bar on the right receives data
        // let bar = new StatusBar(data)

        // actual moving robot, receives its corresponding data and status bar
        let robot : GameObject = BehavioralObjectFactory.CreateObject("robot", data)

        
        // ROBOT KRIJGT NU DRIE INDEXES BINNEN
        // ARMOR
        // SPECIAL POWER
        // MOVE
        this.gameObjects.push(robot)
    }

    private update(){
        // Todo when adding a lot of robots on runtime. error in update loop

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
        if(gameObject instanceof Robot) {
            this.socket.emit('robot destroyed', gameObject.Data.id)
        }
    }

    public addBullet(b : GameObject) {
        this.gameObjects.push(b)
    }
}

window.addEventListener("DOMContentLoaded", () => Game.Instance)