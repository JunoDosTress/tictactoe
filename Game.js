export default class Game {
    constructor(){
        this.turn = "X";
        this.board = new Array(9).fill(null);
        this.moves = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.history = [];
    }
    newTurn() {
        this.turn = this.turn === "X" ? "O" : "X";
    }
        
    move(i) {
        if (!this.inProgress()) {
            return;
        }

        if (this.board[i]){
            return;
        }
        this.board[i] = this.turn;
        this.moves[i] = this.turn;
        this.history.push(this.moves);
      
        if (!this.findCombinations()){
            this.newTurn();
        }
    }
    findCombinations() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (const combination of winningCombinations) {
            const [cell1, cell2, cell3] = combination;

            if (this.board[cell1] && (this.board[cell1] ===  this.board[cell2] && this.board[cell1] === this.board[cell3])) {
                return combination;
            }
        }
        return null;
    }
    inProgress(){
        return !this.findCombinations() && this.board.includes(null);
    }
}
    
