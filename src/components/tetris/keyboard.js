export let LEFT;
export let RIGHT;
export let DOWN;
export let ENTER;

export function keyDown(e, modal) {
  if (e.key === "Left" || e.key === "ArrowLeft") {
    e.preventDefault();
    LEFT = true;
  }
  if (e.key === "Right" || e.key === "ArrowRight") {
    e.preventDefault();
    RIGHT = true;
  }
  if (e.key === "Enter" || e.code === "Enter") {
    // pause the game
    e.preventDefault();
    if (!modal) {
      if (paused) {
        changePaused(false);
      } else {
        changePaused(true);
      }
    }
  }
}
/*
export function keyUp(e) {
  if (e.key === "Left" || e.key === "ArrowLeft") LEFT = false;
  if (e.key === "Right" || e.key === "ArrowRight") RIGHT = false;
  if (e.key === " " || e.code === "Space") SPACE = false;
}
*/