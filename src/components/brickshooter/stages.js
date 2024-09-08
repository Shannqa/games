import { balls, resetBall } from "./balls";
import { powerUp } from "./powerups";
import { livesScore } from "./score";
import { paddles, resetPaddle } from "./paddles";
import { LEVEL, changeHitBricks, changeLevel } from "./Game";
import { settings } from "./settings";

export let gameStage = "ready";

// problem: set modal is inside a module, can't import it from Game

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

function resetDrawings() {
  balls.forEach((ball) => {
    resetBall(ball);
  });
  balls[0].active = true;
  balls[1].active = false;
  balls[2].active = false;
  if (powerUp.on) {
    powerUp.kind.stop();
  }
  powerUp.kind = null;
  powerUp.released = false;
  powerUp.on = false;
  resetPaddle();
}

export function resetStats(setLevelSave) {
  livesScore.lives = settings.lives;
  livesScore.score = 0;
  setLevelSave(1);
  changeLevel(1);
  changeHitBricks(0);
}

export function lifeLoss() {
  changeGameStage("lifeLoss");
  console.log(gameStage);
  resetDrawings();
  livesScore.lives -= 1;
}

export function gameLoss(setModal, setGameState, setLevelSave) {
  changeGameStage("gameLoss");
  setGameState("gameLoss");
  setModal(true);
  resetDrawings();
  console.log("gameLoss");
  resetStats(setLevelSave);
}

export function restart() {
  setLives(settings.lives);
}

export function winGame() {
  changeGameStage("gameWin");
}

export function winLevel(setModal, setGameState, setLevelSave) {
  console.log("level win");
  resetDrawings();
  changeGameStage("nextLevel");
  setGameState("nextLevel");
  setModal(true);
  // saveLevel(LEVEL);
  // saveLives(livesScore.lives);
  // saveScore(livesScore.score);
}

export function nextLevel() {
  setGameState("playing");
  changeGameStage("playing");
  setModal(false);
  setLevelSave(LEVEL + 1);
  changeLevel(LEVEL + 1);
  changeHitBricks(0);
}
