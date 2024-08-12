const defaultBall = {
  x: 10,
  y: 20,
  vx: 3,
  vy: 4,
  radius: 5,
  active: true,
}

const balls = [{
    x: ballInfo.x,
    y: ballInfo.y,
    vx: ballInfo.vx,
    vy: ballInfo.vy,
    radius: ballInfo.radius,
  },
  {
    x: ballInfo.x + 20,
    y: ballInfo.y + 20,
    vx: ballInfo.vx,
    vy: ballInfo.vy,
    radius: ballInfo.radius,
  },
  {
    x: ballInfo.x + 40,
    y: ballInfo.y + 0,
    vx: ballInfo.vx,
    vy: ballInfo.vy,
    radius: ballInfo.radius,
  }
]

function drawBall(ctx, ball) {
  const radgrad = ctx.createRadialGradient(
      ball.x,
      ball.y,
      ball.radius + 1,
      ball.x,
      ball.y,
      1
    );
  radgrad.addColorStop(0, "#dca85d");
  radgrad.addColorStop(0.5, "#dca85d");
  radgrad.addColorStop(0.9, "#f4d3a5");
  radgrad.addColorStop(1, "#fee8c9");
  ctx.beginPath();
  ctx.fillStyle = radgrad;
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
}

function resetBall(ball) {
  ball = {...defaultBall};
}

function moveBall() {
  // ball hiting edges of the canvas
  balls.forEach((ball) => {
    if (ball.y + ball.vy > settings.canvasH - ball.radius) {
      // bottom of canvas, lose life
      if (livesScore.lives < 1) {
        gameLoss();
      } else {
        lifeLoss();
      }
    } else if (ball.y + ball.vy < ball.radius) {
      // top of canvas, reflect ball
      ball.vy = -ball.vy;
    } else if (
      ball.x + ball.vx > settings.canvasW - ball.radius ||
      ball.x + ball.vx < ball.radius
    ) {
      // right and left of canvas, reflect ball
      ball.vx = -ball.vx;
    }
    });
  }
