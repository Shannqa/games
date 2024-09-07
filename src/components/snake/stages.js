import { score } from "./score";
import { snake, defaultSnake } from "./snake";
import { changeCurrentDir } from "./keyboard";

// loaded

// state playing
export function setPlaying(setGameState, setModal) {
  setModal(false);
  setGameState("playing");
  score.score = 0;
  snake.length = 0;
  changeCurrentDir("right");
  snake.push(defaultSnake[0]);
  snake.push(defaultSnake[1]);
  snake.push(defaultSnake[2]);
  console.log(snake);
}

// state loss
export function setLoss(setGameState, setModal) {
  // changeGameStage("stop");
  setModal(true);
  setGameState("loss");
}
