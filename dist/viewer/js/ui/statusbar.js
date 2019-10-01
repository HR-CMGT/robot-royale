export class StatusBar {
    get Data() { return this.data; }
    set Health(health) {
        this.damageBar.style.width = (100 - health) + "%";
    }
    set Kills(kills) {
        this.killBar.innerHTML = kills.toString();
        let rank = Math.floor(kills / 2);
        this.rankBar.style.backgroundImage = `url(./images/ranks/rank${rank}.png)`;
    }
    constructor(data) {
        this.data = data;
        let list = document.querySelector("#robotlist");
        this.bar = document.createElement("statusbar");
        this.bar.style.filter = `hue-rotate(${data.color}deg)`;
        this.infoBar = document.createElement("div");
        this.infoBar.innerHTML = data.nickname;
        this.killBar = document.createElement("div");
        this.killBar.innerHTML = "0";
        this.rankBar = document.createElement("div");
        this.rankBar.style.backgroundImage = "url(./images/ranks/rank0.png)";
        this.bar.appendChild(this.rankBar);
        this.bar.appendChild(this.infoBar);
        this.bar.appendChild(this.killBar);
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
