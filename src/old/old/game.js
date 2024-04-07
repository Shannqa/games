import { gameEnd } from "./dom.js";

const players = {
  current: null,
  human: null,
  AI: null,
  prepare: null,
};

class Ship {
  constructor(length, id) {
    this.length = length;
    this.hits = 0;
    this.destroyed = false;
    this.id = id;
  }

  hit() {
    this.hits += 1;
    this.isSunk();
  }

  isSunk() {
    if (this.hits >= this.length) {
      this.destroyed = true;
      return true;
    }
    return false;
  }
}

class Gameboard {
  constructor(owner) {
    this.grid = this.createGrid();
    this.owner = owner;
    this.shipsList = [];
    this.receivedHits = 0;
    this.lostGame = false;
    this.AIqueue = [];
    this.AIhits = [];
  }
  static shipLengths = [2, 3, 4, 5];

  placeShip(length, coordsStart, coordsEnd) {
    const id = this.shipsList.length;
    const placedShip = new Ship(length, id);

    // if the ship's length > 2, mark the other squares too
    this.shipsList.push(placedShip);
    if (coordsStart[0] !== coordsEnd[0]) {
      for (let i = coordsStart[0]; i <= coordsEnd[0]; i++) {
        this.grid[i][coordsStart[1]] = id;
      }
    }
    if (coordsStart[1] !== coordsEnd[1]) {
      for (let i = coordsStart[1]; i <= coordsEnd[1]; i++) {
        this.grid[coordsStart[0]][i] = id;
      }
    }
    this.grid[coordsStart[0]][coordsStart[1]] = id;
    this.grid[coordsEnd[0]][coordsEnd[1]] = id;
  }

  // need to remove coords from AIhits once the ship is sunk for sure

  receiveAttack(coords) {
    let square;
    let id = this.grid[coords[0]][coords[1]];
    let [x, y] = coords;

    if (players.current === "human") {
      square = document.querySelector(
        `.enemy-square#r${coords[0]}c${coords[1]}`
      );
      if (id === "miss" || id === "hit") {
        console.log("invalid move");
        return "invalid move";
      }
      if (id === null) {
        this.grid[coords[0]][coords[1]] = "miss";
        square.classList.add("miss");
      } else {
        square.classList.add("hit");
        let hitShip = this.shipsList[id];
        this.grid[coords[0]][coords[1]] = "hit";
        hitShip.hit();
        this.receivedHits += 1;
        this.checkIfLost();
      }
    } else if (players.current === "AI") {
      square = document.querySelector(`.own-square#r${coords[0]}c${coords[1]}`);
      if (id === null) {
        this.grid[coords[0]][coords[1]] = "miss";
        square.classList.add("miss");
      } else if (id === "hit" || id === "miss") {
        // invalid move - already attacked, so try again. it happens because an already attacked square can be added to the queue
        return this.AIattack();
      } else {
        square.classList.add("hit");
        let hitShip = this.shipsList[id];
        this.grid[coords[0]][coords[1]] = "hit";
        hitShip.hit();
        this.receivedHits += 1;
        this.checkIfLost();
        this.AIhits.push(coords);
        if (this.AIhits.length === 1) {
          // add four sides of the current hit
          this.AIqueue.push([x - 1, y]);
          this.AIqueue.push([x + 1, y]);
          this.AIqueue.push([x, y - 1]);
          this.AIqueue.push([x, y + 1]);
        } else {
          // check if the adjacency is vertical or horizontal to the previous hit
          // x,y -> current, i, j -> previous
          let [i, j] = this.AIhits[this.AIhits.length - 1];
          if (x === i) {
            // row is the same
            this.AIqueue.push([x, y - 1]);
            this.AIqueue.push([x, y + 1]);
            this.AIqueue.filter((item) => item[0] === x);
          } else if (y === j) {
            // column is the same
            this.AIqueue.push([x - 1, y]);
            this.AIqueue.push([x + 1, y]);
            this.AIqueue.filter((item) => item[1] === y);
          } else {
            // no adjacency
          }
        }
      }
    }

    console.log("owner: " + this.owner, "hits: " + this.receivedHits);

    if (players.current === "human") {
      players.current = "AI";
    } else if (players.current === "AI") {
      players.current = "human";
    }

    //if it's AI's turn now, send an attack
    if (players.current === "AI") {
      players.human.board.AIattack();
    }
    // console.log(this.grid);
  }

  playerAttack(coords) {
    // if it's not the player's turn, clicking on enemy board will do nothing
    if (players.current === "human") {
      boards.AI.receiveAttack(coords);
    }
    return;
  }
  // when there's 5 adjacent hits, reset the queue, cause max ship is 5
  // need to keep in mind already sunk ships. when a ship of a certain length is for sure sunk, the queue might be reset once this length is reached. e.g.
  // ship 5 and 4 sunk > for sure might reset the queue and hits of ships of that length

  // randomize the queue hits - now its always north south west east
  // random attack should be a bit better
  AIattack() {
    if (this.AIqueue.length === 0) {
      // test - reseting the hits array when the queue is empty
      this.AIhits = [];
      this.AIrandomAttack();
    } else {
      let [x, y] = this.AIqueue.shift();
      return this.receiveAttack([x, y]);
    }
  }

  AIrandomAttack() {
    const x = Math.floor(Math.random() * 9);
    const y = Math.floor(Math.random() * 9);
    if (this.grid[x][y] === "hit" || this.grid[x][y] === "miss") {
      return this.AIrandomAttack();
    } else {
      return this.receiveAttack([x, y]);
    }
  }

  AIcheckRandom() {}

  playerAttack(coords) {
    // if it's not the player's turn, clicking on enemy board will do nothing
    if (players.current === "human") {
      players.AI.board.receiveAttack(coords);
    }
    return;
  }

  checkIfLost() {
    const possibleScore = Gameboard.shipLengths.reduce(
      (previous, current, initial) => previous + current,
      0
    );
    if (this.receivedHits >= possibleScore) {
      this.lostGame = true;
      console.log("game lost: " + this.owner);
      gameEnd(this.owner);
    }
  }

  createGrid() {
    let gridArray = [];
    for (let y = 0; y < 10; y++) {
      gridArray.push([]);
      for (let x = 0; x < 10; x++) {
        gridArray[y].push(null);
      }
    }
    return gridArray;
  }

  // generate random ships and place them on the enemy board
  getRandomPlacement() {
    for (let i = Gameboard.shipLengths.length - 1; i >= 0; i--) {
      const shipL = parseInt(Gameboard.shipLengths[i]);
      let coords = this.getNewCoords(shipL);
      this.placeShip(
        shipL,
        [coords[0][0], coords[0][1]],
        [coords[1][0], coords[1][1]]
      );
      // console.log(this.grid);
    }
  }

  // runs functions generating and checking if new coords are valid, returns coords for one ship or uses recursion to start over the process if coords are invalid
  getNewCoords(shipLength) {
    let coords = this.randomizeCoords(parseInt(shipLength));
    let fullCoords = this.getFullCoords(coords);
    let coordCheck = this.checkIfOccupied(fullCoords);
    if (coordCheck === false) {
      return coords;
    } else {
      return this.getNewCoords(parseInt(shipLength));
    }
  }

  // uses math.random to get random coordinates on the board, randomize wheter the new ship will be vertical or horizontal, calculate that it fits on the board according to the ships length
  randomizeCoords(shipLength) {
    const startRow = Math.floor(Math.random() * 10);
    const startCol = Math.floor(Math.random() * 10);
    const endRow = startRow + parseInt(shipLength) - 1;
    const endCol = startCol + parseInt(shipLength) - 1;

    if (endRow < 10 && endCol < 10) {
      //randomize - horizontal or vertical
      let chance = Math.random() * 1;
      if (chance < 0.5) {
        return [
          [startRow, startCol],
          [startRow, endCol],
        ];
      } else {
        return [
          [startRow, startCol],
          [endRow, startCol],
        ];
      }
    } else if (endCol < 10) {
      return [
        [startRow, startCol],
        [startRow, endCol],
      ];
    } else if (endRow < 10) {
      return [
        [startRow, startCol],
        [endRow, startCol],
      ];
    } else {
      return this.randomizeCoords(shipLength);
    }
  }

  // gets full coordinates of every square in a single ship
  getFullCoords(coords) {
    let rowStart = parseInt(coords[0][0]);
    let colStart = parseInt(coords[0][1]);
    let rowEnd = parseInt(coords[1][0]);
    let colEnd = parseInt(coords[1][1]);

    let fullCoordinates = [];
    if (rowStart !== rowEnd) {
      for (let i = rowStart; i <= rowEnd; i++) {
        fullCoordinates.push([i, colStart]);
      }
    }
    if (colStart !== colEnd) {
      for (let i = colStart; i <= colEnd; i++) {
        fullCoordinates.push([rowStart, i]);
      }
    }
    return fullCoordinates;
  }

  // check if any square of the new ship is already occupied; if so, send info to previous functions to generate new ship coordinates instead
  checkIfOccupied(fullCoordinates) {
    // console.log(fullCoordinates);
    for (let i = 0; i < fullCoordinates.length; i++) {
      let [x, y] = fullCoordinates[i];
      x = parseInt(x);
      y = parseInt(y);
      
      if (this.grid[x][y] !== null) {
        // square is occupied
        return true;
      }
      
      // check if any surrounding squares are occupied - if so, generate new coords. ships shouldnt be too close to each other
      let closeSq = [
        [x - 1, y - 1],
        [x - 1, y + 1],
        [x + 1, y - 1], 
        [x + 1, y + 1]
      ].filter((item) => {
        return item[0] >= 0 && item[0] <= 9 && item[1] >= 0 && item[1] <= 9;
      });
      
      for (let j = 0; j < closeSq.length; j++) {
        if (typeof this.grid[closeSq[j][0]][closeSq[j][1]] === "number" && this.grid[closeSq[j][0]][closeSq[j][1]] !== this.grid[x][y]) {
          // if any of the neighboring squares contain ships and their id is not the same as the currently considered ship's id, return and try with new coords
          return true;
        }
      } 
    }
    return false;
  }

  drawGrid() {
    const main = document.querySelector(".main");
    const array = this.grid;
    const body = document.querySelector("body");
    const prepBoardDiv = document.querySelector("div.prep-board-div");
    const boardContainer = document.createElement("div");
    const boardTitle = document.createElement("div");
    boardContainer.classList.add("board-container");
    boardTitle.classList.add("board-title")
    const grid = document.createElement("div");
    array.forEach((row, rindex) => {
      row.forEach((column, cindex) => {
        const square = document.createElement("div");
        square.setAttribute("id", `r${rindex}c${cindex}`);
        if (this.owner === "human") {
          square.classList.add("own-square");
        } else if (this.owner === "AI") {
          square.classList.add("enemy-square");
          square.addEventListener("click", () => {
            this.playerAttack([rindex, cindex]);
          });
        } else if (this.owner === "prepare") {
          square.classList.add("prep-square");
        }
        if (typeof column == "number") {
          // console.log(column);
          if (this.owner === "human") {
            square.classList.add("own-ship");
          } else {
            // remove marking of enemy ships in the final version of the game
            square.classList.add("enemy-ship");
          }
        }
        // check if those two ifs are needed, possibly remove
        if (column === "miss") {
          square.classList.add("miss");
        }
        if (column === "hit") {
          square.classList.add("hit");
        }
        grid.appendChild(square);
      });
    });

    if (this.owner === "human") {
      grid.classList.add("grid-own");
      boardTitle.textContent = "Your fleet";
      boardContainer.appendChild(boardTitle);
      boardContainer.appendChild(grid);
    } else if (this.owner === "AI") {
      grid.classList.add("grid-enemy");
      boardTitle.textContent = "Enemy fleet";
      boardContainer.appendChild(boardTitle);
      boardContainer.appendChild(grid);
    } else if (this.owner === "prepare") {
      grid.classList.add("grid-prep");
      boardTitle.textContent = "Place your ships";
      boardContainer.appendChild(boardTitle);
      boardContainer.appendChild(grid);
      prepBoardDiv.appendChild(grid);
    }
    grid.classList.add("grid");
    main.appendChild(boardContainer);
  }
}

class Player {
  constructor(owner) {
    this.owner = owner;
    this.status = null;
    this.board = new Gameboard(owner);
  }
}

function getPlayers() {
  players.human = new Player("human");
  players.AI = new Player("AI");
  players.prepare = new Player("prepare");
}


function playTestGame() {
  players.human.board.getRandomPlacement();
  players.human.board.drawGrid();
  players.AI.board.getRandomPlacement();
  players.AI.board.drawGrid();
  players.current = "human";
}

export { Ship, Gameboard, Player, players, getPlayers, playTestGame };
