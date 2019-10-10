import { DomObject } from "../core/domobject.js";
export class Leaderboard extends DomObject {
    set Rank(rank) {
        this.rank.style.backgroundImage = `url(./images/ranks/rank${rank}.png)`;
    }
    set Kills(kills) {
        this.kills.innerHTML = "" + kills;
    }
    set Name(name) {
        this.name.innerHTML = name;
    }
    constructor() {
        super("leaderboard");
        this.Div.style.left = ((window.innerWidth - 200) / 2 - this.Div.clientWidth / 2) + "px";
        this.name = document.createElement("div");
        this.name.innerHTML = "Old Billy Bob";
        this.rank = document.createElement("div");
        this.rank.style.backgroundImage = "url(./images/ranks/rank0.png)";
        this.kills = document.createElement("div");
        this.kills.innerHTML = "0";
        let last = document.createElement("div");
        this.Div.appendChild(this.rank);
        this.Div.appendChild(this.kills);
        this.Div.appendChild(this.name);
        this.Div.appendChild(last);
    }
}
