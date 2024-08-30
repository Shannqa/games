import { balls, resetBall } from "./balls";
import { powerUp } from "./powerups";
import { livesScore } from "./score";
import { paddles, resetPaddle } from "./paddles";
import { LEVEL, changeLevel } from "./Game";

export let gameStage = "ready";

/* state stages:
  loaded - game first opened
  modalGameOver
  modalNextLevel
  startLevel
  */
/* canvas stages:
  ready
  playing
  gameLoss
  lifeLoss
  levelWin
  modalWin
  modalLoss
  */

export function changeGameStage(stage) {
  gameStage = stage;
}

export function lifeLoss() {
  gameStage = "lifeLoss";
  console.log(gameStage);
  resetBall(balls[0]);
  balls[0].active = true;
  resetPaddle(paddles[0]);
  if (powerUp.on) {
    powerUp.kind.stop();
  }
  powerUp.kind = null;
  powerUp.on = false;
  powerUp.released = false;

  livesScore.lives -= 1;
}

export function gameLoss() {
  changeGameStage("gameLoss");
  console.log("gameLoss");
}

function win() {}
function start() {}

export function restart() {
  setLives(settings.lives);
}

export function winGame() {
  changeGameStage("gameWin");
}

export function winLevel() {
  console.log("level win");
  balls.forEach((ball) => {
    resetBall(ball);
  });
  balls[1].active = false;
  balls[2].active = false;
  powerUp.kind = null;
  powerUp.released = false;
  powerUp.on = false;
  resetPaddle();
  changeGameStage("levelWin");
  // saveLevel(LEVEL);
  // saveLives(livesScore.lives);
  // saveScore(livesScore.score);
}

// export function nextLevel() {
//   console.log("next");
//   changeGameStage("newLevel");
//   changeLevel();
//   resetBall(balls[0]);
//   balls[0].active = true;
//   resetPaddle(paddles[0]);
//   if (powerUp.on) {
//     powerUp.kind.stop();
//   }
//   powerUp.kind = null;
//   powerUp.on = false;
//   powerUp.released = false;
// }