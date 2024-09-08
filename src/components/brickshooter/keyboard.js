import { gameStage, changeGameStage } from "./stages";
import { balls } from "./balls";

export let LEFT;
export let RIGHT;
export let SPACE;
export function keyDown(e) {
  if (e.key === " " || e.code === "Space") {
    e.preventDefault();
    SPACE = true;
    balls.forEach((ball) => {
      if (ball.stay) {
        ball.stay = false;
      }
    });
  }

  if (e.key === "Left" || e.key === "ArrowLeft") {
    e.preventDefault();
    if (
      gameStage == "lifeLoss" ||
      gameStage == undefined ||
      gameStage == "ready"
    ) {
      changeGameStage("playing");
    } else if (
      gameStage == "gameLoss" ||
      gameStage == "modalWin" ||
      gameStage == "levelWin" ||
      gameStage == "modalLoss"
    ) {
      return;
    }
    LEFT = true;
  }
  if (e.key === "Right" || e.key === "ArrowRight") {
    e.preventDefault();
    if (
      gameStage == "lifeLoss" ||
      gameStage == undefined ||
      gameStage == "ready"
    ) {
      changeGameStage("playing");
    } else if (
      gameStage == "gameLoss" ||
      gameStage == "modalWin" ||
      gameStage == "levelWin" ||
      gameStage == "modalLoss"
    ) {
      return;
    }
    RIGHT = true;
  }
}

export function keyUp(e) {
  if (e.key === "Left" || e.key === "ArrowLeft") LEFT = false;
  if (e.key === "Right" || e.key === "ArrowRight") RIGHT = false;
  if (e.key === " " || e.code === "Space") SPACE = false;
}
