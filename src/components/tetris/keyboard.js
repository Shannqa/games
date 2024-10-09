import { rotateBlock, moveToSide } from "./blocks";

export let LEFT;
export let RIGHT;
export let DOWN;
export let ENTER;
export let SPACE;

export function keyDown(e, placedBlocks) {
  if (e.key === "Left" || e.key === "ArrowLeft") {
    e.preventDefault();
    moveToSide("left", placedBlocks);
    console.log("left");
  }
  if (e.key === "Right" || e.key === "ArrowRight") {
    e.preventDefault();
    moveToSide("right", placedBlocks);
  }
  if (e.key === "Enter") {
    // pause the game
    e.preventDefault();
    // if (!modal) {
    //   if (paused) {
    //     changePaused(false);
    //   } else {
    //     changePaused(true);
    //   }
    // }
  }
  if (e.key === "ArrowUp") {
    e.preventDefault();
    rotateBlock();
  }
}

export function keyUp(e) {
  /*
  if (e.key === "Left" || e.key === "ArrowLeft") LEFT = false;
  if (e.key === "Right" || e.key === "ArrowRight") RIGHT = false;
  if (e.key === " " || e.code === "Space") SPACE = false;*/
}
