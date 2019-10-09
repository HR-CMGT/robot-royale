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
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            Game.DEBUG = true;
        }
        if (Game.DEBUG) {
            this.gameObjects.push(new DebugInfo());
        }
        this.socket = io();
        this.socket.emit('viewer refreshed');
        this.socket.on('robot created', (json) => {
            console.log("game received a new robot");
            let data = JSON.parse(json);
            this.addTank(data);
        });
        this.socket.on('robot updated', (json) => {
            let settings = JSON.parse(json);
            console.log('viewer received new program for ' + settings.nickname);
            this.updateTankProgram(settings);
        });
        this.socket.on('robot reconnected', (json) => {
            let settings = JSON.parse(json);
            console.log('viewer received new socket id for ' + settings.nickname);
            this.updateTankConnection(settings);
        });
        if (Game.DEBUG) {
            for (let i = 0; i < 8; i++) {
                this.addTank(this.randomSettings());
            }
        }
        this.update();
    }
    get AmmoBoxes() {
        return this.gameObjects.filter(o => o instanceof Ammo);
    }
    get RepairKits() {
        return this.gameObjects.filter(o => o instanceof Health);
    }
    get Tanks() {
        return this.gameObjects.filter(o => o instanceof Tank);
    }
    static get Instance() {
        if (!this.instance)
            this.instance = new Game();
        return this.instance;
    }
    getRandomEnemy(excludeTank) {
        let enemyTanks = this.gameObjects.filter(o => (o instanceof Tank && o != excludeTank));
        let randomTank;
        if (enemyTanks.length > 0) {
            randomTank = enemyTanks[Math.floor(Math.random() * enemyTanks.length)];
        }
        return randomTank;
    }
    AddGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }
    addTank(data) {
        let tank = Factory.CreateBehavioralObject("tank", data);
        this.gameObjects.push(tank);
        this.redrawAllTankStatus();
    }
    updateTankProgram(data) {
        let tank = this.Tanks.find((tank) => tank.Data.id === data.id);
        if (tank) {
            tank.updateProgram(data);
        }
        else {
            this.socket.emit('robot destroyed', data.socketid);
        }
    }
    updateTankConnection(data) {
        let tank = this.Tanks.find((tank) => tank.Data.id === data.id);
        if (tank) {
            console.log("updated socket id to " + tank.Data.socketid);
            tank.Data.socketid = data.socketid;
        }
        else {
            console.log("tank died while user was disconnected");
            this.socket.emit('robot destroyed', data.socketid);
        }
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
            this.socket.emit('robot destroyed', gameObject.Data.socketid);
        }
    }
    addBullet(b) {
        this.gameObjects.push(b);
    }
    randomSettings() {
        if (Math.random() < 0.3) {
            return {
                id: String(Math.random() * 1000),
                socketid: String(Math.random() * 1000),
                color: Math.floor(Math.random() * 360),
                nickname: "Old Billy Bob",
                armor: 2,
                program: [2, 3, 0, 0, 0, 0]
            };
        }
        else {
            return {
                id: String(Math.random() * 1000),
                socketid: String(Math.random() * 1000),
                color: Math.floor(Math.random() * 360),
                nickname: "Old Billy Bob",
                armor: 0,
                program: [5, 3, 0, 0, 0, 0]
            };
        }
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
Game.DEBUG = false;
window.addEventListener("DOMContentLoaded", () => Game.Instance);
