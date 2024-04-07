import { Gameboard, players, getPlayers } from "./game.js";

function createDom() {
  const body = document.querySelector("body");
  const header = document.createElement("div");
  const title = document.createElement("span");
  const main = document.createElement("div");
  const footer = document.createElement("div");

  header.classList.add("header");
  title.textContent = "Battleships";
  main.classList.add("main");

  header.appendChild(title);
  body.appendChild(header);
  body.appendChild(main);
  body.appendChild(footer);
}

/* Drag and drop functions */
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  // catch an error happening if the user tries to drag and drop the ship in a wrong place, e.g. in the middle of multiple squares
  try {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    document.getElementById(data).classList.add("ship-on-board");
    ev.target.appendChild(document.getElementById(data));
  } catch {
    console.log("error - drag&drop");
    return;
  }
}

function dragEnd() {
  areAllShipsPlaced();
}

/* Preparation stage - player places their ships on their board */
function prepareShips() {
  const main = document.querySelector(".main");
  const prepBoardDiv = document.createElement("div");
  const prepBoardTitle = document.createElement("span");
  const prepShipsDiv = document.createElement("div");
  const prepShipsTitle = document.createElement("span");
  const prepShipsList = document.createElement("div");
  const prepInfoDiv = document.createElement("div");
  const prepInfoP = document.createElement("p");
  const startGame = document.createElement("button");
  const prepInfoP2 = document.createElement("p");
  const errorMsg = document.createElement("div");

  prepBoardDiv.classList.add("prep-board-div");
  prepShipsDiv.classList.add("prep-ships-div");
  prepShipsList.classList.add("prep-ships-list");
  prepInfoDiv.classList.add("prep-info");
  startGame.classList.add("start-game");
  startGame.classList.add("hidden");
  prepInfoP2.classList.add("prep-info-p2");
  prepInfoP2.classList.add("hidden");
  errorMsg.classList.add("error-msg");
  errorMsg.classList.add("hidden");

  errorMsg.textContent =
    "Some ships don't fit on the board or overlap. Use drag & drop to move them or double click to rotate them before you can begin the game.";
  startGame.textContent = "Start game";
  startGame.addEventListener("click", checkPlacements);
  prepBoardTitle.textContent = "Your board";
  prepShipsTitle.textContent = "Place your ships";
  prepInfoP.textContent =
    "Drag & drop the ships on the board. Double-click a ship to rotate it.";
  prepInfoP2.textContent =
    "Once you're happy with the placement of your ships, click the start button to begin the game!";
  /* List of ships to be placed */
  Gameboard.shipLengths.forEach((item, index) => {
    const fullShip = document.createElement("div");
    fullShip.classList.add("ship-div");
    for (let i = 0; i < item; i++) {
      const shipSq = document.createElement("div");
      if (i === 0) {
        // first square of a ship
        shipSq.classList.add("sq0-prep");
      }
      shipSq.classList.add("prep-square");
      shipSq.classList.add("ship");
      fullShip.appendChild(shipSq);
    }

    /* Drag and drop */
    fullShip.setAttribute("id", `prep-${index}`);
    fullShip.setAttribute("draggable", "true");
    fullShip.addEventListener("dragstart", drag);
    fullShip.addEventListener("dragend", dragEnd);
    fullShip.addEventListener("dblclick", () => {
      fullShip.classList.toggle("flex-toggle");
    });
    prepShipsList.appendChild(fullShip);
  });

  prepBoardDiv.appendChild(prepBoardTitle);
  prepShipsDiv.appendChild(prepShipsTitle);
  prepShipsDiv.appendChild(prepShipsList);
  prepInfoDiv.appendChild(prepInfoP);
  prepInfoDiv.appendChild(startGame);
  prepInfoDiv.appendChild(prepInfoP2);
  prepShipsDiv.appendChild(prepInfoDiv);
  prepShipsDiv.appendChild(errorMsg);
  main.appendChild(prepBoardDiv);
  main.appendChild(prepShipsDiv);

  players.prepare.board.drawGrid();
  const prepSquare = document.querySelectorAll(".prep-square");
  prepSquare.forEach((square) => {
    square.addEventListener("drop", drop);
    square.addEventListener("dragover", allowDrop);
  });
}

// check if all ships were placed on the player's board
function areAllShipsPlaced() {
  const prepShipsList = document.querySelector(".prep-ships-list");

  if (prepShipsList.childNodes.length === 0) {
    const startGame = document.querySelector(".start-game");
    const prepInfoP2 = document.querySelector(".prep-info-p2");
    startGame.classList.remove("hidden");
    prepInfoP2.classList.remove("hidden");
  }
}

// check if all ships are placed correctly, if so, start the game
function checkPlacements() {
  const placeOnBoard = placeShips(players.human.board);

  if (placeOnBoard === false) {
    const errorMsg = document.querySelector(".error-msg");
    errorMsg.classList.remove("hidden");
    return placementError();
  }
  const prepBoardDiv = document.querySelector(".prep-board-div");
  const prepShipsDiv = document.querySelector(".prep-ships-div");
  prepBoardDiv.classList.add("hidden");
  prepShipsDiv.classList.add("hidden");

  players.human.board.drawGrid();
  players.AI.board.getRandomPlacement();
  players.AI.board.drawGrid();
  // console.log(boardB.grid);
  players.current = "human";
}

// reset the human board due to placement error
function placementError() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (players.human.board.grid[i][j] !== null) {
        players.human.board.grid[i][j] = null;
      }
    }
  }
}

// add ships to the players gameboard
function placeShips(board) {
  // get placed ships coords
  for (let i = 0; i < Gameboard.shipLengths.length; i++) {
    const ship = document.querySelector(`#prep-${i}`);
    const coordStart = ship.parentNode.id;
    coordStart.split("");
    let startRow = parseInt(coordStart[1]);
    let startColumn = parseInt(coordStart[3]);
    let length = parseInt(Gameboard.shipLengths[i]);
    let endRow = startRow + length - 1;
    let endColumn = startColumn + length - 1;
    let fullCoords;
    if (ship.classList.contains("flex-toggle")) {
      //ship is vertical
      if (endRow > 9) {
        return false;
      }
      fullCoords = board.getFullCoords([
        [startRow, startColumn],
        [endRow, startColumn],
      ]);
      if (board.checkIfOccupied(fullCoords) == true) {
        return false;
      }
      board.placeShip(length, [startRow, startColumn], [endRow, startColumn]);
    } else {
      // ship is horizontal
      if (endColumn > 9) {
        return false;
      }
      fullCoords = board.getFullCoords([
        [startRow, startColumn],
        [startRow, endColumn],
      ]);
      if (board.checkIfOccupied(fullCoords) == true) {
        return false;
      }
      board.placeShip(length, [startRow, startColumn], [startRow, endColumn]);
    }
  }
}
/* Clean all child nodes of .main */
function cleanMainDom() {
  const main = document.querySelector(".main");
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
}

/* The game ends, start over */
function gameEnd(player) {
  const main = document.querySelector(".main");
  const modal = document.createElement("div");
  const wonOrLost = document.createElement("p");
  const button = document.createElement("button");

  modal.classList.add("modal");
  button.classList.add("button-modal");
  button.textContent = "Play again";
  button.addEventListener("click", playAgain);
  players.current = null;
  if (player === "AI") {
    wonOrLost.textContent = "You won!";
  } else if (player === "human") {
    wonOrLost.textContent = "You lost";
  }

  modal.appendChild(wonOrLost);
  modal.appendChild(button);
  main.appendChild(modal);
}

function playAgain() {
  getPlayers();
  cleanMainDom();
  prepareShips();
}

export { createDom, prepareShips, placeShips, gameEnd };
