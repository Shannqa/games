import { settings } from "./settings";
import { livesScore } from "./score";
import { paddles, defaultPaddle } from "./paddles";
import { brick } from "./bricks";
import { powerUp, specialBricks, changeActiveBalls } from "./powerups";
import { lifeLoss, gameLoss, winLevel, winGame } from "./stages";
import {
  changeHitBricks,
  hitBricks,
  bricksInLevel,
  sticky,
  SPACE,
  LEVEL,
} from "./Game";

export const defaultBall = {
  x: settings.canvasW / 2,
  y: settings.canvasH - 90, // 500
  vx: 3,
  vy: -3,
  radius: 10,
  active: true,
  stay: false,
};

export const balls = [
  {
    x: defaultBall.x,
    y: defaultBall.y,
    vx: defaultBall.vx,
    vy: defaultBall.vy,
    radius: defaultBall.radius,
    active: true,
    stay: defaultBall.stay,
  },
  {
    x: defaultBall.x,
    y: defaultBall.y,
    vx: defaultBall.vx,
    vy: defaultBall.vy,
    radius: defaultBall.radius,
    active: false,
    stay: defaultBall.stay,
  },
  {
    x: defaultBall.x,
    y: defaultBall.y,
    vx: -defaultBall.vx,
    vy: defaultBall.vy,
    radius: defaultBall.radius,
    active: false,
    stay: defaultBall.stay,
  },
];

export function drawBall(ctx, ball) {
  const radgrad = ctx.createRadialGradient(
    Math.floor(ball.x),
    Math.floor(ball.y),
    ball.radius + 1,
    Math.floor(ball.x),
    Math.floor(ball.y),
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
      if (!balls[0].active) {
        changeActiveBalls();
      }
      if (!balls[0].active && !balls[1].active && !balls[2].active) {
        // all balls are inactive, lose a life and/or game
        if (livesScore.lives < 1) {
          gameLoss();
        } else {
          lifeLoss();
        }
      }
    } else if (ball.y + ball.vy <= ball.radius + settings.gameAreaY) {
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
      if (sticky && !SPACE) {
        // powerup sticky ball
        ball.stay = true;
        return;
      }
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

      let speed = Math.sqrt(
        defaultBall.vx * defaultBall.vx + defaultBall.vx * defaultBall.vx
      );
      let tanTh = Math.tan(angleRad);

      ball.vy = Math.sqrt((speed * speed) / (tanTh * tanTh + 1));
      ball.vx = tanTh * ball.vy;
      ball.vy = -ball.vy;
      if (balls[1] === ball) {
        console.log("ball1", ball.vx);
      }
      if (balls[2] === ball) {
        console.log("ball2", ball.vx);
      }
    }
  });
}

export function hitBallBrick(bricks) {
  let xDir = null;
  let yDir = null;
  let toChange = [];
  // collision - ball - brick
  balls.forEach((ball) => {
    if (ball.active) {
      for (let c = 0; c < 11; c++) {
        for (let r = 0; r < 11; r++) {
          const br = bricks[c][r];
          const x2 = br.x + brick.w;
          const y2 = br.y + brick.h;
          let edge = null;

          // determine which edge of the brick is collided with by the ball
          if (
            br.painted !== false &&
            ball.y + ball.radius >= br.y &&
            ball.y - ball.radius <= br.y &&
            ball.x >= br.x &&
            ball.x <= x2
          ) {
            edge = "top";
          } else if (
            br.painted !== false &&
            ball.y + ball.radius >= y2 &&
            ball.y - ball.radius <= y2 &&
            ball.x >= br.x &&
            ball.x <= x2
          ) {
            edge = "bottom";
          } else if (
            br.painted !== false &&
            ball.x + ball.radius >= br.x &&
            ball.x - ball.radius <= br.x &&
            ball.y >= br.y &&
            ball.y <= y2
          ) {
            edge = "left";
          } else if (
            br.painted !== false &&
            ball.x + ball.radius >= x2 &&
            ball.x - ball.radius <= x2 &&
            ball.y >= br.y &&
            ball.y <= y2
          ) {
            edge = "right";
          }

          // change direction of the ball
          if (edge === "bottom" || edge == "top") {
            yDir = -ball.vy;
          } else if (edge === "left" || edge === "right") {
            xDir = -ball.vx;
          }

          // add to the queue of bricks to change
          if (edge) {
            if (br.painted === true) {
              toChange.push({ c: c, r: r, painted: false });
              livesScore.score += 10;
              changeHitBricks();

              // special bricks with powerups
              const isSpecialBrick =
                !powerUp.released &&
                !powerUp.on &&
                Math.floor(Math.random() * 100) < settings.specialBricksPercent;
              if (isSpecialBrick) {
                powerUp.released = true;
                const keys = Object.keys(specialBricks);
                // const random = Math.floor(Math.random() * 10);
                const random = 4;
                powerUp.kind = specialBricks[keys[random]];
                powerUp.x = br.x;
                powerUp.y = br.y;
              }
            } else if (br.painted == "strong") {
              console.log("strong");
              toChange.push({ c: c, r: r, painted: true });
              livesScore.score += 5;
            }

            // determine wins
            if (hitBricks === bricksInLevel) {
              console.log("hit", hitBricks, "inlvl", bricksInLevel);
              if (LEVEL + 1 === settings.levelCount) {
                winGame();
                return;
              } else {
                winLevel();
                return;
              }
            }
          }
        }
      }
    }

    // apply the change of direction of the ball
    if (xDir) {
      ball.vx = xDir;
    } else if (yDir) {
      ball.vy = yDir;
    }

    // change bricks
    if (toChange.length > 0) {
      toChange.forEach((brickToChange) => {
        bricks[brickToChange.c][brickToChange.r].painted =
          brickToChange.painted;
      });
    }
  });
}
