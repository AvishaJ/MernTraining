const  Game  = require('./model/game')
console.log("Welcome to Tic tac toe game")
const newGame = new Game("Avisha", "arpit")
newGame.play(0) //x
newGame.play(1) //0
newGame.play(2) //x

//  0|1|2
//  3|4|5
//  6|7|8
