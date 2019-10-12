export class StatusBar {
    get Data() { return this.data; }
    set Health(health) {
        this.damageBar.style.width = (100 - health) + "%";
    }
    set Kills(kills) {
        let rank = Math.min(Math.floor(kills / 2), 4);
        this.rankBar.style.backgroundImage = `url(./images/ranks/rank${rank}.png)`;
        this.rankBar.innerHTML = `${kills}`;
    }
    set Ammo(ammo) {
        this.ammoBar.innerHTML = ammo.toString();
    }
    constructor(data) {
        this.data = data;
        let list = document.querySelector("#robotlist");
        this.bar = document.createElement("statusbar");
        this.bar.style.filter = `hue-rotate(${data.color}deg)`;
        this.rankBar = document.createElement("div");
        this.rankBar.style.backgroundImage = "url(./images/ranks/rank0.png)";
        this.rankBar.innerHTML = "0";
        this.ammoBar = document.createElement("div");
        this.ammoBar.innerHTML = "0";
        this.nameBar = document.createElement("div");
        this.nameBar.innerHTML = data.nickname;
        this.bar.appendChild(this.rankBar);
        this.bar.appendChild(this.ammoBar);
        this.bar.appendChild(this.nameBar);
        this.damageBar = document.createElement("div");
        this.damageBar.classList.add("damage");
        this.damageBar.style.width = "0%";
        this.bar.appendChild(this.damageBar);
        list.appendChild(this.bar);
    }
    remove() {
        this.bar.remove();
    }
}
