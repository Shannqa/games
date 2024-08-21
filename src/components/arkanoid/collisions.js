import { paddles } from "./paddles";
import { defaultBall, balls } from "./balls";
import { specialBricks, powerUp } from "./powerups";
import { settings } from "./settings";
import {
  changeHitBricks,
  hitBricks,
  bricksInLevel,
  sticky,
  SPACE,
  LEVEL,
} from "./Game";
import { winGame, winLevel } from "./stages";
import { brick } from "./bricks";
import { livesScore } from "./score";

export function hitBallPaddle() {
  // bounce: ball - paddle
  balls.forEach((ball) => {
    if (ball.active) {
      let bounce = false;
      let paddle;
      if (
        ball.y + ball.radius >= paddles[0].y + 2 &&
        ball.y + ball.radius <= paddles[0].y + paddles[0].h &&
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
          // powerup sticky ball - don't move the ball
          ball.stay = true;
          return;
        }
        let maxAngle = settings.paddleAngle;
        let middle = paddle.w / 2;
        let distance = ball.x - (paddle.x + middle);

        // for extreme edges of the paddle
        if (distance < -middle) {
          distance = -middle;
        } else if (distance > middle) {
          distance = middle;
        }

        // determine the angle of the ball after the bounce
        let scaleFactor = distance / middle;
        let angle = scaleFactor * maxAngle;
        let angleRad = (angle * Math.PI) / 180;

        let speed = Math.sqrt(defaultBall.vx ** 2 + defaultBall.vx ** 2);
        let tanTh = Math.tan(angleRad);

        ball.vy = Math.sqrt(speed ** 2 / (tanTh ** 2 + 1));
        ball.vx = tanTh * ball.vy;
        ball.vy = -ball.vy;
      }
    }
  });
}

export function hitBallBrick(bricks) {
  let toChange = [];
  // collision - ball - brick
  balls.forEach((ball) => {
    let xDir = null;
    let yDir = null;
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
            ball.y + ball.radius < br.y + ball.vy && // solid brick fix
            ball.y - ball.radius <= br.y &&
            ball.x >= br.x &&
            ball.x <= x2
          ) {
            edge = "top";
          } else if (
            br.painted !== false &&
            ball.y + ball.radius >= y2 &&
            ball.y - ball.radius > y2 - ball.vy && // attempting to fick the bug with solid bricks not reflecting balls properly
            ball.y - ball.radius <= y2 &&
            ball.x >= br.x &&
            ball.x <= x2
          ) {
            edge = "bottom";
          } else if (
            br.painted !== false &&
            ball.x + ball.radius >= br.x &&
            ball.x + ball.radius < br.x + ball.vx && // solid brick fix
            ball.x - ball.radius <= br.x &&
            ball.y >= br.y &&
            ball.y <= y2
          ) {
            edge = "left";
          } else if (
            br.painted !== false &&
            ball.x + ball.radius >= x2 &&
            ball.x - ball.radius <= x2 &&
            ball.x - ball.radius > x2 - ball.vx && // solid brick fix
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
                const random = Math.floor(Math.random() * 10);
                // const random = 4;
                powerUp.kind = specialBricks[keys[random]];
                powerUp.x = br.x;
                powerUp.y = br.y;
              }
            } else if (br.painted == "strong") {
              // console.log("strong");
              toChange.push({ c: c, r: r, painted: true });
              livesScore.score += 5;
            } else if (br.painted == "solid") {
              console.log("solid", br, Date.now());
              console.log(
                balls[0].x.toString(),
                balls[0].y.toString(),
                balls[0].vx.toString(),
                balls[0].vy.toString()
              );
            }
          }
        }
      }
    }

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
  });
}
