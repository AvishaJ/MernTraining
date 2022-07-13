const Player = require('./player')

class Cell {
    constructor() {
        this.mark = ""
    }
    isMarked() {
        return this.mark != ""
    }
    markCell(player) {
        this.mark = player.symbol
    }
}

module.exports = Cell