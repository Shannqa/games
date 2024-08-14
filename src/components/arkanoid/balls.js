import { settings } from "./settings";
import { livesScore } from "./score";
import { paddles, defaultPaddle } from "./paddles";
import { brick } from "./bricks";
import { powerUp, specialBricks } from "./powerups";
import { lifeLoss, gameLoss, winLevel } from "./stages";
import { changeHitBricks, hitBricks, bricksInLevel } from "./Game";

export const defaultBall = {
  x: settings.canvasW / 2,
  y: settings.canvasH - 100, // 500
  vx: 4,
  vy: -4,
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
    active: true,
  },
  {
    x: defaultBall.x,
    y: defaultBall.y,
    vx: defaultBall.vx,
    vy: defaultBall.vy,
    radius: defaultBall.radius,
    active: false,
  },
  {
    x: defaultBall.x,
    y: defaultBall.y,
    vx: defaultBall.vx,
    vy: defaultBall.vy,
    radius: defaultBall.radius,
    active: false,
  },
];

export function drawBall(ctx, ball) {
  // const radgrad = ctx.createRadialGradient(
  //   Math.floor(ball.x),
  //   Math.floor(ball.y),
  //   ball.radius + 1,
  //   Math.floor(ball.x),
  //   Math.floor(ball.y),
  //   1
  // );
  // radgrad.addColorStop(0, "#dca85d");
  // radgrad.addColorStop(0.5, "#dca85d");
  // radgrad.addColorStop(0.9, "#f4d3a5");
  // radgrad.addColorStop(1, "#fee8c9");
  ctx.beginPath();
  // ctx.fillStyle = radgrad;
  ctx.fillStyle = "red";
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
}

export function resetBall(ball) {
  ball.x = defaultBall.x;
  ball.y = defaultBall.y;
  ball.vx = defaultBall.vx;
  ball.vy = defaultBall.vy;
  ball.radius = defaultBall.radius;
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
    let bounce = false;
    let paddle;
    if (
      ball.y + ball.radius >= paddles[0].y + 2 &&
      ball.y + ball.radius <= paddles[0].y + paddles[0].h &&
      // ball.y < paddle.y &&
      ball.x + ball.radius >= paddles[0].x &&
      ball.x - ball.radius <= paddles[0].x + paddles[0].w
    ) {
      bounce = true;
      paddle = paddles[0];
    }

    // WORMHOLE, bounce ball vs paddle2
    if (
      powerUp.kind === specialBricks.wormhole &&
      powerUp.on === true &&
      ball.y + ball.radius >= paddles[1].y &&
      ball.y < paddles[1].y &&
      ball.x + ball.radius >= paddles[1].x &&
      ball.x - ball.radius <= paddles[1].x + paddles[1].w
    ) {
      bounce = true;
      paddle = paddles[1];
    }

    if (bounce) {
      let maxAngle = settings.paddleAngle;
      let middle = paddle.w / 2;
      let distance = ball.x - (paddle.x + middle);

      //for extreme edges of the paddle
      if (distance < -middle) {
        distance = -middle;
      } else if (distance > middle) {
        distance = middle;
      }
      // paddle from 100 tp 190, 145 is mid
      // ball.x hits at 100
      let scaleFactor = distance / middle;
      let angle = scaleFactor * maxAngle;
      let angleRad = (angle * Math.PI) / 180;
      let speed = Math.sqrt(4 * 4 + 4 * 4);
      let tanTh = Math.tan(angleRad);

      ball.vy = Math.sqrt((speed * speed) / (tanTh * tanTh + 1));
      ball.vx = tanTh * ball.vy;
      ball.vy = -ball.vy;
      console.log(
        "max",
        maxAngle,
        "dist",
        distance,
        "scale",
        scaleFactor,
        "angle",
        angle,
        "rad",
        angleRad,
        "tan",
        tanTh
      );
      console.log("vx", ball.vx, "vy", ball.vy);
    }
  });
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
        changeHitBricks();
        if (hitBricks == bricksInLevel) {
          winLevel();
          return;
        }

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
