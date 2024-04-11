import { useContext } from "react"
import { BattleshipsContext } from "./Battleships.jsx"
import Board from "./Board";

function Game() {
  const { playerGrid, computerGrid, currentMove, setCurrentMove } = useContext(BattleshipsContext);
  
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
  
  
  
  
  return(
    <>
      <div>
        <h2>Player:</h2>
        <Board grid={playerGrid} owner="player" />
      </div>
      <div>
        <h2>Computer:</h2>
        <Board grid={computerGrid} owner="enemy"/>
      </div>
    </>
  )
}

export default Game