import { Tank } from "./gameobjects/tank/tank.js";
import { Factory } from "./factory.js";
import { PickUp } from "./gameobjects/pickups/pickup.js";
import { DebugInfo } from "./ui/debuginfo.js";
import { Ammo } from "./gameobjects/pickups/ammo.js";
import { Health } from "./gameobjects/pickups/health.js";
export class Game {
    constructor() {
        this.gameObjects = [];
        this.gameover = false;
        this.gameObjects.push(new DebugInfo());
        this.socket = io();
        this.socket.on('robot created', (json) => {
            console.log("game received a new robot");
            let data = JSON.parse(json);
            this.addTank(data);
        });
        this.socket.on('robot updated', (json) => {
            let settings = JSON.parse(json);
            console.log('viewer received new program for ' + settings.nickname);
            this.updateTank(settings);
        });
        if (Game.DEBUG) {
            for (let i = 0; i < 13; i++) {
                this.addTank(this.randomSettings());
            }
        }
        this.update();
    }
    get AmmoBoxes() {
        return this.gameObjects.filter(o => { return o instanceof Ammo; });
    }
    get RepairKits() {
        return this.gameObjects.filter(o => { return o instanceof Health; });
    }
    get Tanks() {
        return this.gameObjects.filter(o => { return o instanceof Tank; });
    }
    static get Instance() {
        if (!this.instance)
            this.instance = new Game();
        return this.instance;
    }
    addTank(data) {
        let tank = Factory.CreateBehavioralObject("tank", data);
        this.gameObjects.push(tank);
        this.redrawAllTankStatus();
    }
    updateTank(data) {
        let tank = this.Tanks.find((tank) => {
            return tank.Data.id === data.id;
        });
        tank.updateProgram(data);
    }
    update() {
        if (PickUp.NUMBER_OF_PICKUPS < PickUp.MAX_PICKUPS && PickUp.DELTA_TIME_PICKUPS > PickUp.INTERVAL_NEW_PICKUP) {
            PickUp.NUMBER_OF_PICKUPS++;
            PickUp.DELTA_TIME_PICKUPS = 0;
            if (Math.random() < 0.5)
                this.gameObjects.push(new Ammo());
            else
                this.gameObjects.push(new Health());
        }
        PickUp.DELTA_TIME_PICKUPS++;
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
            if (obj.CanDestroy) {
                if (obj instanceof PickUp)
                    PickUp.NUMBER_OF_PICKUPS--;
                this.removeGameObject(obj);
            }
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
            this.redrawAllTankStatus();
            console.log("tank died: " + gameObject.Data.socketid);
            this.socket.emit('robot destroyed', gameObject.Data.socketid);
        }
    }
    addBullet(b) {
        this.gameObjects.push(b);
    }
    randomSettings() {
        return {
            id: String(Math.random() * 1000),
            socketid: String(Math.random() * 1000),
            color: Math.floor(Math.random() * 360),
            nickname: "Old Billy Bob",
            armor: Math.floor(Math.random() * 3),
            program: [1, 2, 3, 0, 0, 0]
        };
    }
    redrawAllTankStatus() {
        let tanks = this.Tanks;
        tanks.sort(function (a, b) {
            return b.Kills - a.Kills;
        });
        for (const tank of tanks) {
            tank.redrawStatus();
        }
    }
}
Game.DEBUG = true;
window.addEventListener("DOMContentLoaded", () => Game.Instance);
