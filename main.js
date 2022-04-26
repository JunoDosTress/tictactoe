import Game from "./Game.js";
import View from "./View.js";

let newGame = new Game();
let gameView = new View(document.getElementById("app"));

//functions for onTile and onRestart
gameView.onTileClick = function (i) {
  newGame.move(i);
  gameView.update(newGame);
};
gameView.onRestartClick = function (i) {
    newGame = new Game();
    gameView.update(newGame);
};
gameView.update(newGame);

gameView.onPreviousClick = function(i) {
  newGame.move(i);
  gameView.update(newGame);
}