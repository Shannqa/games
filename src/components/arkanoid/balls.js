import { settings } from "./settings";
import { livesScore } from "./score";
import { paddles, defaultPaddle } from "./paddles";
import { brick } from "./bricks";
import { powerUp, specialBricks } from "./powerups";
import { lifeLoss, gameLoss } from "./stages";

export const defaultBall = {
  x: settings.canvasW / 2,
  y: settings.canvasH - 100,
  vx: 1.8,
  vy: -1.8,
  radius: 10,
  active: true,
};

export const balls = [
  {
    x: defaultBall.x,
    y: defaultBall.y,
    vx: defaultBall.vx,
    vy: defaultBall.vy,
    radius: defaultBall.radius,
  },
  {
    x: defaultBall.x + 20,
    y: defaultBall.y + 20,
    vx: defaultBall.vx,
    vy: defaultBall.vy,
    radius: defaultBall.radius,
  },
  {
    x: defaultBall.x + 40,
    y: defaultBall.y + 0,
    vx: defaultBall.vx,
    vy: defaultBall.vy,
    radius: defaultBall.radius,
  },
];

export function drawBall(ctx, ball) {
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

export function resetBall() {
  balls[0].x = defaultBall.x;
  balls[0].y = defaultBall.y;
  balls[0].vx = defaultBall.vx;
  balls[0].vy = defaultBall.vy;
}

export function moveBall() {
  // ball hiting edges of the canvas
  balls.forEach((ball) => {
    if (ball.y + ball.vy > settings.canvasH - ball.radius) {
      // bottom of canvas
      ball.active = false;
      if (!balls[0].active && !balls[1].active) {
        // all balls are inactive, lose a life and/or game
        if (livesScore.lives < 1) {
          gameLoss();
        } else {
          lifeLoss();
        }
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

export function hitBallPaddle() {
  // bounce: ball - paddle
  balls.forEach((ball) => {
    if (
      ball.y + ball.radius >= paddles[0].y &&
      ball.y + ball.radius <= paddles[0].y + paddles[0].h &&
      // ball.y < paddle.y &&
      ball.x + ball.radius >= paddles[0].x &&
      ball.x - ball.radius <= paddles[0].x + paddles[0].w
    ) {
      ball.vy = -ball.vy;
    }

    // WORMHOLE, bounce ball vs paddle2
    if (
      ball.y + ball.radius >= paddles[1].y &&
      ball.y < paddles[1].y &&
      ball.x + ball.radius >= paddles[1].x &&
      ball.x - ball.radius <= paddles[1].x + paddles[1].w
    ) {
      ball.vy = -ball.vy;
    }
  });
  // problem, at the left corner the ball doesnt bounce
}

export function hitBallBrick(ball, bricks) {
  // collision - ball - brick
  for (let c = 0; c < 11; c++) {
    for (let r = 0; r < 11; r++) {
      const br = bricks[c][r];
      if (
        br.painted === "solid" &&
        ball.x + ball.radius >= br.x &&
        ball.x - ball.radius <= br.x + brick.w &&
        ball.y + ball.radius >= br.y &&
        ball.y - ball.radius <= br.y + brick.h
      ) {
        // solid brick, reflect ball
        ball.vy = -ball.vy;
      } else if (
        br.painted === true &&
        ball.x + ball.radius >= br.x &&
        ball.x - ball.radius <= br.x + brick.w &&
        ball.y + ball.radius >= br.y &&
        ball.y - ball.radius <= br.y + brick.h
      ) {
        livesScore.score += 10;
        let newBricks = [...bricks];
        console.log(newBricks);
        newBricks[c][r].painted = false;
        console.log(newBricks[c][r]);

        // special bricks
        const isSpecialBrick =
          !powerUp.released &&
          Math.floor(Math.random() * 100) < settings.specialBricksPercent;
        if (isSpecialBrick) {
          console.log("sp");
          powerUp.released = true;

          const keys = Object.keys(specialBricks);
          const random = Math.floor(Math.random() * 6);
          powerUp.kind = specialBricks[keys[random]];

          console.log(powerUp.kind);

          powerUp.x = br.x;
          powerUp.y = br.y;
        }
        ball.vy = -ball.vy;
      }
    }
  }
}
