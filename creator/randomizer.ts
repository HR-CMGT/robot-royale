import { words1, words2 } from "./words.js"

export class Randomizer {

    public static generateName() {
        return this.capFirst(words1[this.getRandomInt(words1.length)]) + ' ' + this.capFirst(words2[this.getRandomInt(words2.length)]);
    }

    public static capFirst(string : string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    public static getRandomInt(max : number) {
        return Math.floor(Math.random() * max)
    }

    public static generateHexcolor() {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    public static generateID() {
        let result : string = ''
        let i, j : number
        for (j = 0; j < 32; j++) {
            if (j == 8 || j == 12 || j == 16 || j == 20)
                result = result + '-'
            i = Math.floor(Math.random() * 16).toString(16).toUpperCase()
            result = result + i
        }
        return result
    }

}
