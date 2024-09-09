import { gameStage, changeGameStage } from "./stages";
import { balls } from "./balls";


export let LEFT;
export let RIGHT;
export let SPACE;
export function keyDown(e) {
  if (e.key === " " || e.code === "Space") {
    e.preventDefault();
    if (balls[0].waiting) {
      // when paddle first moves, start moving the ball
      balls[0].waiting = false;
    }
    SPACE = true;
    balls.forEach((ball) => {
      if (ball.stay) {
        ball.stay = false;
      }
    });
  }

  if (e.key === "Left" || e.key === "ArrowLeft") {
    e.preventDefault();
    if (balls[0].waiting) {
      // when paddle first moves, start moving the ball
      balls[0].waiting = false;
    } 
    LEFT = true;
  }
  if (e.key === "Right" || e.key === "ArrowRight") {
    e.preventDefault();
    if (balls[0].waiting) {
      // when paddle first moves, start moving the ball
      balls[0].waiting = false;
    } 
    RIGHT = true;
  }
}

export function keyUp(e) {
  if (e.key === "Left" || e.key === "ArrowLeft") LEFT = false;
  if (e.key === "Right" || e.key === "ArrowRight") RIGHT = false;
  if (e.key === " " || e.code === "Space") SPACE = false;
}
