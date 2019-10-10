import { Bullet } from "./bullet.js";
import { Rocket } from "./rocket.js";
import { Turret } from "./turret.js";
import { PickUp } from "../pickups/pickup.js";
import { StatusBar } from "../../ui/statusbar.js";
import { BehavioralObject } from "../../interface/behavioralObject.js";
import { Forward } from "../../behaviors/forward.js";
import { Game } from "../../game.js";
import { Factory } from "../../core/factory.js";
import { Vector2 } from "../../utils/vector.js";
import { AnimationObject } from "../../core/animationobject.js";
import { NullBehavior } from "../../behaviors/nullobject.js";
export class Tank extends BehavioralObject {
    constructor(data, status) {
        super("tank-body");
        this.health = 100;
        this.ammo = 0;
        this.lifeTime = 0;
        this.kills = 0;
        this.just = 0;
        this.Behavior = new Forward(this);
        this.data = data;
        this.status = status;
        this.Ammo = 10;
        this.Div.classList.add(`armor-${data.armor}`);
        this.Div.style.filter = `hue-rotate(${data.color}deg)`;
        this.Position = new Vector2(Math.random() * (window.innerWidth - 300), Math.random() * (window.innerHeight - 100));
        this.Direction = new Vector2(1 - (Math.random() * 2), 1 - (Math.random() * 2));
        this.Rotation = this.Direction.angle();
        this.Speed = (5 - (data.armor * 2));
        this.turret = new Turret(this);
        this.update();
    }
    get Data() { return this.data; }
    get Health() { return this.health; }
    set Health(v) {
        this.health = v;
        if (this.health > 100)
            this.health = 100;
        this.status.Health = this.health;
    }
    get Ammo() { return this.ammo; }
    set Ammo(v) {
        this.ammo = v;
    }
    get LifeTime() { return this.lifeTime; }
    set LifeTime(v) {
        this.lifeTime = v;
    }
    get Kills() { return this.kills; }
    set Kills(v) {
        this.kills = v;
        this.status.Kills = this.kills;
    }
    get Turret() { return this.turret; }
    collide(collider) {
        if (collider instanceof Bullet || collider instanceof Rocket) {
            if (collider.ParentTurret instanceof Turret) {
                if (collider.ParentTurret != this.Turret) {
                    this.Health -= (collider.Damage - (this.data.armor * 5));
                    if (this.health <= 0) {
                        this.Behavior = new NullBehavior(this);
                        Game.Instance.AddGameObject(new AnimationObject("explosion", this.Position, this, 146, 145, 3, 4, 7));
                        collider.ParentTurret.ParentTank.Kills++;
                    }
                }
            }
        }
        if (collider instanceof PickUp) {
            this.Ammo += collider.Ammo;
            this.Health += collider.Health;
        }
    }
    update() {
        this.LifeTime++;
        this.Behavior.performUpdate();
        super.update();
        this.turret.update();
    }
    updateProgram(data) {
        this.data.socketid = data.socketid;
        this.BehavioralIterator = Factory.CreateBehavioralIterator(this, data);
    }
    redrawStatus() {
        let statusBar = new StatusBar(this.status.Data);
        statusBar.Health = this.Health;
        statusBar.Kills = this.Kills;
        this.status.remove();
        this.status = statusBar;
    }
    remove() {
        this.status.remove();
        this.turret.remove();
        super.remove();
    }
}
