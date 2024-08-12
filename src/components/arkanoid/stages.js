import { balls, resetBall } from "./balls";
import { powerUp } from "./powerups";
import { livesScore } from "./score";
import { paddles, resetPaddle } from "./paddles";
export let gameStage = "ready";

export function changeGameStage(stage) {
  gameStage = stage;
}

export function lifeLoss() {
  gameStage = "lifeLoss";
  console.log(gameStage);
  resetBall(balls[0]);
  resetPaddle(paddles[0]);
  console.log(paddles[0]);
  if (powerUp.on) {
    powerUp.kind.stop();
  }
  powerUp.kind = null;
  powerUp.on = false;
  powerUp.released = false;

  livesScore.lives -= 1;
}

export function gameLoss() {}

function win() {}
function start() {}

export function restart() {
  setLives(settings.lives);
}
