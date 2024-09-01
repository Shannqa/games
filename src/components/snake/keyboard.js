let currentDir = "right";

function keyDown(e) {
  // if (e.key === " " || e.code === "Space") {
  //   e.preventDefault();
  //   SPACE = true;
  // }
  if (e.key === "Up" || e.key === "ArrowUp") {
    e.preventDefault();
    currentDir = "up";
  }
  if (e.key === "Down" || e.key === "ArrowDown") {
    e.preventDefault();
    currentDir = "down";
  }
  if (e.key === "Left" || e.key === "ArrowLeft") {
    e.preventDefault();
    currentDir = "left";
  }
  if (e.key === "Right" || e.key === "ArrowRight") {
    e.preventDefault();
    currentDir = "right";
  }
}

// function keyUp(e) {
//   if (e.key === "Up" || e.key === "ArrowUp") UP = false;
//   if (e.key === "Down" || e.key === "ArrowDown") DOWN = false;
//   if (e.key === "Left" || e.key === "ArrowLeft") LEFT = false;
//   if (e.key === "Right" || e.key === "ArrowRight") RIGHT = false;
//   if (e.key === " " || e.code === "Space") SPACE = false;
// }

export { keyDown, currentDir };
