import { Tank } from "./tank.js";
import { BehavioralObjectFactory } from "./behavioralobjectfactory.js";
import { AmmoBox } from "./ammobox.js";
export class Game {
    constructor() {
        this.gameObjects = [];
        this.ammoBoxes = [];
        this.gameover = false;
        this.socket = io();
        this.socket.on('new robot', (json) => {
            let data = JSON.parse(json);
            this.addRobot(data);
        });
        this.socket.on('robot power', (id) => {
            console.log("special power for: " + id);
        });
        for (let i = 0; i < 5; i++) {
            this.gameObjects.push(new AmmoBox());
        }
        setInterval(() => {
            this.gameObjects.push(new AmmoBox());
        }, 5000);
        this.update();
    }
    get AmmoBoxes() {
        return this.gameObjects.filter(o => { return o instanceof AmmoBox; });
    }
    static get Instance() {
        if (!this.instance)
            this.instance = new Game();
        return this.instance;
    }
    addRobot(data) {
        let robot = BehavioralObjectFactory.CreateObject("robot", data);
        this.gameObjects.push(robot);
    }
    update() {
        for (let object1 of this.gameObjects) {
            object1.update();
            for (let object2 of this.gameObjects) {
                if (object1 != object2 && object1.detectCollision(object2)) {
                    object1.collide(object2);
                    object2.collide(object1);
                }
            }
        }
        for (let obj of this.gameObjects) {
            if (obj.CanDestroy)
                this.removeGameObject(obj);
        }
        if (!this.gameover)
            requestAnimationFrame(() => this.update());
    }
    removeGameObject(gameObject) {
        let index = this.gameObjects.indexOf(gameObject);
        if (index > -1) {
            let objs = this.gameObjects.splice(index, 1);
            objs[0].destroy();
        }
        if (gameObject instanceof Tank) {
            this.socket.emit('robot destroyed', gameObject.Data.id);
        }
    }
    addBullet(b) {
        this.gameObjects.push(b);
    }
}
window.addEventListener("DOMContentLoaded", () => Game.Instance);
