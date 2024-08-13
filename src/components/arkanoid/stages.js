import { balls, resetBall } from "./balls";
import { powerUp } from "./powerups";
import { livesScore } from "./score";
import { paddles, resetPaddle } from "./paddles";
export let gameStage = "ready";
import { LEVEL, changeLevel } from "./Game";

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

export function winLevel() {
  changeGameStage("modal");
  // saveLevel(LEVEL);
  // saveLives(livesScore.lives);
  // saveScore(livesScore.score);
}

export function nextLevel() {
  console.log("next");
  changeGameStage("newLevel");
  changeLevel();
  resetBall(balls[0]);
  balls[0].active = true;
  resetPaddle(paddles[0]);
  if (powerUp.on) {
    powerUp.kind.stop();
  }
  powerUp.kind = null;
  powerUp.on = false;
  powerUp.released = false;
}
