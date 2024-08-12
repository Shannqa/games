export const brick = {
  w: 72,
  h: 24,
};

export function drawBricks(ctx, bricks) {
  // bricks
  for (let c = 0; c < 11; c++) {
    for (let r = 0; r < 11; r++) {
      if (bricks[c][r].painted === true) {
        // brick is visible
        let xx = bricks[c][r].x;
        let yy = bricks[c][r].y;
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.fillStyle = `rgb(${100 + c * 20}, ${10 + r * 30}, ${200 - c * 10})`;
        ctx.lineWidth = 2;
        ctx.rect(xx, yy, brick.w, brick.h);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      } else if (bricks[c][r].painted === "solid") {
        // brick is solid
        let xx = bricks[c][r].x;
        let yy = bricks[c][r].y;
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "grey";
        ctx.lineWidth = 2;
        ctx.rect(xx, yy, brick.w, brick.h);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}
