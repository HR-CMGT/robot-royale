import { words1, words2 } from "./words.js";
export class Generator {
    static generateName() {
        return this.capFirst(words1[this.getRandomInt(words1.length)]) + ' ' + this.capFirst(words2[this.getRandomInt(words2.length)]);
    }
    static capFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    static generateColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    static generateID() {
        let result = '';
        let i, j;
        for (j = 0; j < 32; j++) {
            if (j == 8 || j == 12 || j == 16 || j == 20)
                result = result + '-';
            i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
            result = result + i;
        }
        return result;
    }
}
