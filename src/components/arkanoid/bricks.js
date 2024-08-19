export const brick = {
  w: 64, // 72
  h: 28,
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
        const gradient = ctx.createLinearGradient(
          xx,
          yy,
          xx + brick.w,
          yy + brick.h
        );
        gradient.addColorStop(0, "#aeaeae");
        gradient.addColorStop(0.5, "grey");
        gradient.addColorStop(1, "#aeaeae");
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.fillStyle = gradient;
        ctx.lineWidth = 2;
        ctx.rect(xx, yy, brick.w, brick.h);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      } else if (bricks[c][r].painted === "strong") {
        // brick needs two hits to be destroyed
        let xx = bricks[c][r].x;
        let yy = bricks[c][r].y;
        ctx.beginPath();
        ctx.strokeStyle = "#000";

        const gradient = ctx.createLinearGradient(
          xx,
          yy,
          xx + brick.w,
          yy + brick.h
        );
        let color = `rgb(${100 + c * 20}, ${10 + r * 30}, ${200 - c * 10})`;
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.5, "#dbdbdb");
        gradient.addColorStop(1, color);

        ctx.fillStyle = gradient;
        ctx.lineWidth = 2;
        ctx.rect(xx, yy, brick.w, brick.h);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

// count the number of bricks in a level, needed for win conditions
export function countBricks(bricks) {
  let count = 0;
  bricks.forEach((row, rIndex) => {
    row.forEach((column, cIndex) => {
      if (column.painted === true || column.painted == "strong") {
        count++;
      }
    });
  });
  return count;
}
