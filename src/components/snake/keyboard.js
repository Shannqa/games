let UP = false;
let DOWN = false;
let LEFT = false;
let RIGHT = false;

function keyDown(e) {
    if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      SPACE = true;
      
    }
 
    if (e.key === "Left" || e.key === "ArrowLeft") {
      e.preventDefault();
      LEFT = true;
    }
    if (e.key === "Right" || e.key === "ArrowRight") {
      e.preventDefault();
      RIGHT = true;
    }
  };

  function keyUp(e) {
    if (e.key === "Left" || e.key === "ArrowLeft") LEFT = false;
    if (e.key === "Right" || e.key === "ArrowRight") RIGHT = false;
    if (e.key === " " || e.code === "Space") SPACE = false;
  };

export { keyDown, keyUp, UP, DOWN, LEFT, RIGHT }