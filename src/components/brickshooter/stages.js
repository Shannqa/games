import { balls, resetBall } from "./balls";
import { powerUp } from "./powerups";
import { livesScore } from "./score";
import { paddles, resetPaddle } from "./paddles";
import { LEVEL, changeHitBricks, changeLevel } from "./Game";
import { settings } from "./settings";

export let gameStage = "ready";

export function changeGameStage(stage) {
  gameStage = stage;
}

// click on modal - start playing
export function startGame(
  setModal,
  setGameState,
  setLevelSave,
  savedBricks,
  setSavedBricks,
  bricks
) {
  setGameState("playing");
  // changeGameStage("playing");
  const canvas = document.getElementById("brickCanvas");
  canvas.scrollIntoView();
  setModal(false);
  // resetStats(setLevelSave);
}

// win level - show modal
export function winLevel(
  setModal,
  setGameState,
  setLevelSave,
  savedBricks,
  setSavedBricks,
  bricks
) {
  setSavedBricks(bricks);
  console.log("level win");
  resetDrawings();
  // changeGameStage("nextLevel");
  changeGameStage("nextLevel");
  setModal(true);
  // saveLevel(LEVEL);
  // saveLives(livesScore.lives);
  // saveScore(livesScore.score);
}

// win level - click on modal
export function winLevelNext(
  setModal,
  setGameState,
  setLevelSave,
  savedBricks,
  setSavedBricks,
  bricks
) {
  // setGameState("playing");
  setSavedBricks(null);
  changeGameStage("playing");
  setModal(false);
  setLevelSave(LEVEL + 1);
  changeLevel(LEVEL + 1);
  changeHitBricks(0);
  balls[0].waiting = true;
}

// lost a life, continue
export function lifeLoss() {
  // changeGameStage("lifeLoss");
  resetDrawings();
  livesScore.lives -= 1;
}

// game over, show modal
export function gameLoss(
  setModal,
  setGameState,
  setLevelSave,
  savedBricks,
  setSavedBricks,
  bricks
) {
  setSavedBricks(bricks);
  console.log(livesScore.score);
  setModal(true);
  setGameState("gameLoss");
  // changeGameStage("gameLoss");

  resetDrawings();
}

// win game, show modal
export function winGame(
  setModal,
  setGameState,
  setLevelSave,
  savedBricks,
  setSavedBricks,
  bricks
) {
  //changeGameStage("gameWin");
  setSavedBricks(bricks);
  setGameState("gameWin");
  setModal(true);
  resetDrawings();
}

// reset game after win or loss, click on modal
export function resetGame(
  setModal,
  setGameState,
  setLevelSave,
  savedBricks,
  setSavedBricks,
  bricks
) {
  setGameState("playing");
  resetStats(setLevelSave);
  setModal(false);
  setSavedBricks(null);
}

// reset balls, paddles, powerups
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

// reset lives, score, level, hit bricks
export function resetStats(setLevelSave) {
  livesScore.lives = settings.lives;
  livesScore.score = 0;
  setLevelSave(1);
  changeLevel(1);
  changeHitBricks(0);
}

/*
win level and game loss - cant save state (gamestate?), otherwise it will re-render and reset bricks
*/
