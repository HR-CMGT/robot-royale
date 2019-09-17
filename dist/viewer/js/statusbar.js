export class StatusBar {
    constructor(data) {
        let list = document.querySelector("#robotlist");
        this.bar = document.createElement("statusbar");
        this.damagebar = document.createElement("div");
        let info = document.createElement("div");
        info.innerHTML = data.name + " 0:03";
        this.damagebar.classList.add("damage");
        this.damagebar.style.width = "0%";
        this.bar.style.backgroundColor = data.color;
        this.bar.appendChild(this.damagebar);
        this.bar.appendChild(info);
        list.appendChild(this.bar);
    }
    update(health) {
        this.damagebar.style.width = (100 - health) + "%";
    }
    remove() {
        this.bar.remove();
    }
}
