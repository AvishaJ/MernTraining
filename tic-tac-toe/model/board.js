const Cell = require('./cell.js')

class Board {
    constructor() {
        this.cells = []
        for (let index = 0; index < 9; index++) {
            let temp = new Cell()
            this.cells.push(temp)
        }
    }
    isInValidCell(cellNo) {
        return cellNo < 0 || cellNo > 8
    }

    resultAnalyse(player) {
        
        return this.horizontal(player.symbol) || this.diagonal(player.symbol) || this.vertical(player.symbol)

    }

    // displayBoard() {
    //     for (let i = 0; i < 3; i++) {
    //         for (let j = i; j < i * 3; j++) {
    //             console.log(this.cells[j])

    //         }

    //     }
    // }
    displayBoard(){
        for(let index=0;index<9;index++){
            if(index==0 || index==3 || index==6)
            console.log(this.cells[index].mark,"|",this.cells[index+1].mark,"|",this.cells[index+2].mark);
        
        }
        console.log()
    }

    horizontal(symbol) {
        if (this.cells[0] == this.cells[1] && this.cells[1] == this.cells[2] && this.cells[0] == symbol) {
            return true
        }
        if (this.cells[3] == this.cells[4] && this.cells[4] == this.cells[5] && this.cells[3] == symbol) {
            return true
        }
        if (this.cells[6] == this.cells[7] && this.cells[7] == this.cells[8] && this.cells[6] == symbol) {
            return true
        }
        return false
    }
    diagonal(symbol) {
        if (this.cells[0] == this.cells[4] && this.cells[4] == this.cells[8] && this.cells[0] == symbol) {
            return true
        }
        if (this.cells[2] == this.cells[4] && this.cells[4] == this.cells[6] && this.cells[2] == symbol) {
            return true
        }
        return false
    }
    vertical(symbol) {
        if (this.cells[0] == this.cells[3] == this.cells[6] == symbol) {
            return true
        }
        if (this.cells[1] == this.cells[4] == this.cells[7] == symbol) {
            return true
        }
        if (this.cells[2] == this.cells[5] == this.cells[8] == symbol) {
            return true
        }
        return false
    }
}

module.exports = Board 