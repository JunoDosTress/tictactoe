export default class View {
  constructor(root) {
    this.root = root;
    this.root.innerHTML = `
        <div class="title">
        <h1>Let's play Tic Tac Toe!</h1>
        </div>
        <div class="header">
            <div class="turn"></div>
            <div class="status"></div>
            <button type="button" class="restart">
                <span class="material-symbols-outlined">refresh</span>
            </button>
        </div>
            <div class="board">
                <div class="tile" data-index="0"></div>
                <div class="tile" data-index="1"></div>
                <div class="tile" data-index="2"></div>
                <div class="tile" data-index="3"></div>
                <div class="tile" data-index="4"></div>
                <div class="tile" data-index="5"></div>
                <div class="tile" data-index="6"></div>
                <div class="tile" data-index="7"></div>
                <div class="tile" data-index="8"></div>
            </div>
        <div class="btn">
          <button class="previous" disabled><i class="fa-solid fa-circle-arrow-left"></i></button>
          <button class="next"><i class="fa-solid fa-circle-right"></i></button>
        </div>
        `;

    this.onTileClick = undefined;
    this.onRestartClick = undefined;
    this.onPreviousClick = 5

    this.root.querySelectorAll(".tile").forEach((tile) => {
      tile.addEventListener("click", () => {
        if (this.onTileClick) {
          this.onTileClick(tile.dataset.index);
        }
      });
    });
    this.root.querySelector(".restart").addEventListener("click", () => {
      if (this.onRestartClick) {
        this.onRestartClick();
      }
    });

    this.root.querySelector(".next").addEventListener("click", () => {
      if (this.onPreviousClick) {
      }
    });
  }

  update(newGame) {
    this.updateTurn(newGame);
    this.updateStatus(newGame);
    this.updateBoard(newGame);
  }

  // to announce who's turn
  updateTurn(newGame) {
    this.root.querySelector(".turn").textContent = `${newGame.turn}'s turn`;
  }
  updateStatus(newGame) {
    let status = "In Progress";

    if (newGame.findCombinations()) {
      status = `${newGame.turn} is the winner!`;
    } else if (!newGame.inProgress()) {
      status = `It's a tie!`;
    }
    this.root.querySelector(".status").textContent = status;
  }
  updateBoard(newGame) {
    const winCombi = newGame.findCombinations();

    for (let i = 0; i < newGame.board.length; i++) {
      const tile = this.root.querySelector(`.tile[data-index="${i}"]`);
      tile.classList.remove("tile-winner");
      tile.textContent = newGame.board[i];

      if (winCombi && winCombi.includes(i)) {
        tile.classList.add("tile-winner");
      }
    }
  }
  
  previousClick(newGame) {
    const move = newGame.move();
  }
}
