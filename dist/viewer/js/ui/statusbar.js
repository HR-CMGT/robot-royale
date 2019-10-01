export class StatusBar {
    constructor(data) {
        this.imagePath = "images/ranks/";
        this.ranks = ["1.svg", "2.svg", "3.svg", "4.svg"];
        this.data = data;
        let list = document.querySelector("#robotlist");
        this.bar = document.createElement("statusbar");
        this.damagebar = document.createElement("div");
        this.damagebar.classList.add("damage");
        this.damagebar.style.width = "0%";
        this.ammo = document.createElement("div");
        this.ammo.style.top = "20px";
        this.ammo.style.fontSize = "1em";
        this.info = document.createElement("div");
        this.info.innerHTML = data.nickname + " 0:03";
        this.killBar = document.createElement("div");
        this.killBar.classList.add("killbar");
        this.rank = document.createElement("img");
        this.killBar.appendChild(this.rank);
        this.Kills = 0;
        this.bar.style.filter = `hue-rotate(${data.color}deg)`;
        this.bar.appendChild(this.damagebar);
        this.bar.appendChild(this.info);
        this.bar.appendChild(this.ammo);
        this.bar.appendChild(this.killBar);
        list.appendChild(this.bar);
    }
    get Data() { return this.data; }
    set Ammo(v) { this.ammo.innerHTML = "Projectiles " + v; }
    set Health(health) { this.damagebar.style.width = (100 - health) + "%"; }
    set LifeTime(frames) {
        let minutes = Math.floor(frames / 3600);
        let seconds = Math.floor((frames % 3600) / 60);
        let min = minutes < 10 ? "0" + minutes : "" + minutes;
        let sec = seconds < 10 ? "0" + seconds : "" + seconds;
        this.info.innerHTML = this.data.nickname + " " + min + ":" + sec;
    }
    set Kills(kills) {
        this.rank.src = this.imagePath;
        if (kills < 2)
            this.rank.src += this.ranks[0];
        else if (kills < 5)
            this.rank.src += this.ranks[1];
        else if (kills < 7)
            this.rank.src += this.ranks[2];
        else if (kills < 9)
            this.rank.src += this.ranks[3];
    }
    remove() {
        this.bar.remove();
    }
}
