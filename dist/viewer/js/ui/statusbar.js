export class StatusBar {
    set Ammo(v) { this.ammo.innerHTML = v; }
    constructor(data) {
        let list = document.querySelector("#robotlist");
        this.bar = document.createElement("statusbar");
        this.damagebar = document.createElement("div");
        this.damagebar.classList.add("damage");
        this.damagebar.style.width = "0%";
        this.ammo = document.createElement("div");
        this.ammo.style.top = "20px";
        this.ammo.style.fontSize = "1em";
        let info = document.createElement("div");
        info.innerHTML = data.name + " 0:03";
        this.bar.style.backgroundColor = data.color;
        this.bar.appendChild(this.damagebar);
        this.bar.appendChild(info);
        this.bar.appendChild(this.ammo);
        list.appendChild(this.bar);
    }
    update(health) {
        this.damagebar.style.width = (100 - health) + "%";
    }
    remove() {
        this.bar.remove();
    }
}
