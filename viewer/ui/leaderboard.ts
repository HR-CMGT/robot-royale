import { DomObject } from "../core/domobject.js";
import { Settings } from "../interface/settings.js"
import { Tank } from "../gameobjects/tank/tank.js"

export class Leaderboard extends DomObject {

    private highScores: (Settings | undefined)[] = [undefined, undefined, undefined]

    constructor() {
        super("leaderboard")

        // get the top three from cookie
        const cookie = window.localStorage.getItem("tankroyale-scores")
        if (cookie) {
            this.highScores = JSON.parse(cookie)
        }

        // debug
        // this.highScores[0] = this.testScore()

        // draw 
        this.drawHighScores()
    }

    private drawHighScores(){
        this.Div.innerHTML = ""
        for(let score of this.highScores){
            this.Div.appendChild(this.getStatusBar(score))
        }
    }

    private getStatusBar(score:Settings | undefined){
        const status = document.createElement("div")
        if(score) {
            let rank = (score.kills) ? Math.min(Math.floor(score.kills / 2), 4) : 0
            status.style.backgroundImage = `url(./images/ranks/rank${rank}.png)`
            status.innerHTML = `${score.kills || 0}  ${score.nickname}`
        }
        return status
    }

    public checkHighScore(tank: Tank) {
        // TODO KILLS EN AMMO OOK IN DATA BIJHOUDEN
        let score:Settings = tank.Data
        score.kills = tank.Kills

        // array sorteren op kills
        this.highScores.push(score)
        this.highScores.sort((a:Settings, b:Settings) => b.kills - a.kills)

        // alleen eerste drie bewaren
        if(this.highScores.length > 3) {
           this.highScores.splice(3, this.highScores.length-3)
        }

        // magic !!!
        // console.table(this.highScores)

        this.drawHighScores()
        this.saveHighScores()
    }

    private saveHighScores() {
        window.localStorage.setItem('tankroyale-scores', JSON.stringify(this.highScores));
    }

    private testScore(): Settings {
        return {
            id: "68hjk769",
            socketid: "67768",
            color: 66,
            nickname: "Captain Obvious",
            armor: 0,
            program: [2, 3, 0, 0, 0, 0],
            kills: 4
        }
    }
}