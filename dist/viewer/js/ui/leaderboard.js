import { DomObject } from "../core/domobject.js";
export class Leaderboard extends DomObject {
    constructor() {
        super("leaderboard");
        this.highScores = [undefined, undefined, undefined];
        const cookie = window.localStorage.getItem("tankroyale-scores");
        if (cookie) {
            this.highScores = JSON.parse(cookie);
        }
        this.drawHighScores();
    }
    drawHighScores() {
        this.Div.innerHTML = "";
        for (let score of this.highScores) {
            this.Div.appendChild(this.getStatusBar(score));
        }
    }
    getStatusBar(score) {
        const status = document.createElement("div");
        if (score) {
            let rank = (score.kills) ? Math.min(Math.floor(score.kills / 2), 4) : 0;
            status.style.backgroundImage = `url(./images/ranks/rank${rank}.png)`;
            status.innerHTML = `${score.kills || 0}  ${score.nickname}`;
        }
        return status;
    }
    checkHighScore(tank) {
        let score = tank.Data;
        score.kills = tank.Kills;
        this.highScores.push(score);
        this.highScores.sort((a, b) => b.kills - a.kills);
        if (this.highScores.length > 3) {
            this.highScores.splice(3, this.highScores.length - 3);
        }
        this.drawHighScores();
        this.saveHighScores();
    }
    saveHighScores() {
        window.localStorage.setItem('tankroyale-scores', JSON.stringify(this.highScores));
    }
    testScore() {
        return {
            id: "68hjk769",
            socketid: "67768",
            color: 66,
            nickname: "Captain Obvious",
            armor: 0,
            program: [2, 3, 0, 0, 0, 0],
            kills: 4
        };
    }
}
