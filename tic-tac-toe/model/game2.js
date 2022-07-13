const Player = require('./player')
const Board = require('./board')
class Game {
    constructor(nameOfPlayer1, nameOfPlayer2) {
        this.player1 = new Player(nameOfPlayer1, "X")
        this.player2 = new Player(nameOfPlayer2, "O")
        this.board = new Board();
        this.turn = 0;

    }

    turnOfPlayer(cellNumberToBeMarked,player)
    {
        this.board.cells[cellNumberToBeMarked].markCell(player);
            this.turn++
            this.board.displayBoard();
            if(this.board.resultAnalyse(player)){
                return[true,player]
            }
            return [false,"continue the game"]
    }
    
    play(cellNumberToBeMarked){
        let check =false;
        if (this.board.isInValidCell(cellNumberToBeMarked)) {
            console.log("Invalid Cell Number");
            return false;
        }

        if (this.board.cells[cellNumberToBeMarked].isMarked()) {
            console.log("Please choose another cell");
            return false;
        }
        if (this.turn % 2 == 0) 
        {
            let[isWinner,nameOfPlayer]= this.turnOfPlayer(cellNumberToBeMarked,this.player1);
            if(isWinner)
            {
                console.log(nameOfPlayer," won the game, Please restart the game");
                check = true;
                return ;
                
            }
        }
        else if(this.turn%2 ==1)
        {

            let[isWinner,nameOfPlayer]= this.turnOfPlayer(cellNumberToBeMarked,this.player2);
            if(isWinner)
            {
                console.log(nameOfPlayer," won the game, please restart the game");
                check = true;
                return ;
                
            }

        }
        if(this.turn ==9 && check != true)
        {
            console.log("Game is Draw")
        }
    }
}

module.exports=  {Game};