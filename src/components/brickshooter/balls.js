import { settingsBrowser, settingsMobile } from "./settings.js";
import { livesScore } from "./score";
import { changeActiveBalls, specialBricks, powerUp } from "./powerups";
import { lifeLoss, gameLoss } from "./stages";
import { isTouchDevice } from "./touch";

const settings = isTouchDevice() ? settingsMobile : settingsBrowser;

export const defaultBall = {
  x: settings.canvasW / 2,
  y: settings.paddleY - 14, // 500
  vx: 3.5,
  vy: -3.5,
  radius: 14,
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
    waiting: true,
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

export function moveBall(
  setModal,
  setGameState,
  setLevelSave,
  savedBricks,
  setSavedBricks,
  bricks
) {
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
          gameLoss(
            setModal,
            setGameState,
            setLevelSave,
            savedBricks,
            setSavedBricks,
            bricks
          );
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

      if (powerUp.kind == specialBricks.stickyBall && powerUp.on) {
        // sticky ball. make sure it's properly reflected when near edges of canvas
        if (ball.x + ball.radius > settings.canvasW) {
          console.log(ball.x.toString(), ball.vx.toString());
          if (ball.vx > 0) {
            ball.vx = -3;
          }
        } else if (ball.x - ball.radius < settings.canvasW) {
          if (ball.vx < 0) {
            ball.vx = 3;
          }
        }
      } else {
        ball.vx = -ball.vx;
      }
    }
  });
}
