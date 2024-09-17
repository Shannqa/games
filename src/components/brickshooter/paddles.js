import { settingsBrowser, settingsMobile } from "./settings.js";
import { powerUp, specialBricks } from "./powerups.js";
import { LEFT, RIGHT } from "./keyboard.js";
import { gameStage } from "./stages.js";
import { balls } from "./balls.js";
import { gun } from "./gun.js";
import { isTouchDevice } from "./touch.js";

const settings = isTouchDevice() ? settingsMobile : settingsBrowser;

export const defaultPaddle = {
  x: settings.canvasW / 2 - 70,
  y: settings.paddleY,
  w: 140,
  h: 20,
  vx: 5.5,
};

export const paddles = [
  {
    x: defaultPaddle.x,
    y: defaultPaddle.y,
    w: defaultPaddle.w,
    h: defaultPaddle.h,
    vx: defaultPaddle.vx,
    active: true,
  },
  {
    x: defaultPaddle.x,
    y: defaultPaddle.y,
    w: defaultPaddle.w,
    h: defaultPaddle.h,
    vx: defaultPaddle.vx,
    active: false,
  },
];

export function drawPaddle(ctx, paddle) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#103549";
  ctx.fillStyle = "#234e66";
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

export function resetPaddle() {
  paddles[0].x = defaultPaddle.x;
}

export function movePaddle(ctx, paddles) {
  if (
    (powerUp.kind === specialBricks.wormhole && powerUp.on) ||
    paddles[1].active
  ) {
    // wormhole enabled or disabled already while two paddles still active
    if (RIGHT === true) {
      paddles[0].x += paddles[0].vx;
    }

    if (LEFT === true) {
      paddles[0].x -= paddles[0].vx;
      // paddles[1].x -= paddles[1].vx; // not sure why
    }

    if (paddles[0].x + paddles[0].w > settings.canvasW) {
      // paddle to the right of canvas boundary
      let leftX = settings.canvasW - paddles[0].x;
      paddles[1].x = 0 - leftX;
      paddles[1].active = true;
      drawPaddle(ctx, paddles[1]);
    } else if (paddles[0].x < 0) {
      // paddle to the left of canvas boundary
      let rightX = 0 - paddles[0].x;
      paddles[1].x = settings.canvasW - rightX;
      paddles[1].active = true;
      drawPaddle(ctx, paddles[1]);
    } else {
      // paddle inside canvas
      if (paddles[1].active) {
        // disable paddle1, give paddle0 its coordinates
        paddles[0].x = paddles[1].x;
        paddles[1].active = false;
      }
    }
  } else {
    // normal paddle moves
    if (RIGHT === true && paddles[0].x + paddles[0].w < settings.canvasW) {
      paddles[0].x += paddles[0].vx;
      balls.forEach((ball) => {
        // sticky ball, move the ball with the paddle
        if (ball.stay) {
          ball.x += paddles[0].vx;
        }
      });
    }
    if (LEFT === true && paddles[0].x > 0) {
      paddles[0].x -= paddles[0].vx;
      balls.forEach((ball) => {
        // sticky ball, move the ball with the paddle
        if (ball.stay) {
          ball.x -= paddles[0].vx;
        }
      });
    }
  }
}
