import { settings } from "./settings.js";
import { powerUp, specialBricks } from "./powerups.js";
import { LEFT, RIGHT, stay } from "./Game.jsx";
import { gameStage } from "./stages.js";
import { balls } from "./balls.js";
import { gun } from "./gun.js";

export const defaultPaddle = {
  x: settings.canvasW / 2 - 50,
  y: settings.canvasH - 80, // 510
  w: 100,
  h: 14,
  vx: 5,
};

export const paddles = [
  {
    x: defaultPaddle.x,
    y: defaultPaddle.y,
    w: defaultPaddle.w,
    h: defaultPaddle.h,
    vx: defaultPaddle.vx,
  },
  {
    x: defaultPaddle.x,
    y: defaultPaddle.y,
    w: defaultPaddle.w,
    h: defaultPaddle.h,
    vx: defaultPaddle.vx,
  },
];

export function drawPaddle(ctx, paddle) {
  ctx.beginPath();
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
  if (powerUp.kind === specialBricks.wormhole && powerUp.on) {
    // wormhole enabled
    if (RIGHT === true) {
      paddles[0].x += paddles[0].vx;
    }
    if (paddles[0].x + paddles[0].w > settings.canvasW) {
      // paddle to the right of canvas boundary
      let leftX = settings.canvasW - paddles[0].x;
      paddles[1].x = 0 - leftX;
      drawPaddle(ctx, paddles[1]);
      paddles[1].active = true;
    }
    if (LEFT === true) {
      paddles[0].x -= paddles[0].vx;
      paddles[1].x -= paddles[1].vx;
    }
    if (paddles[0].x < 0) {
      // paddle to the left of canvas boundary
      let rightX = 0 - paddles[0].x;
      paddles[1].x = settings.canvasW - rightX;
      drawPaddle(ctx, paddles[1]);
      paddles[1].active = true;
    }
  } else {
    // normal paddle moves
    if (RIGHT === true && paddles[0].x + paddles[0].w < settings.canvasW) {
      paddles[0].x += paddles[0].vx;
      if (stay) {
        // powerup sticky ball
        balls[0].x += paddles[0].vx;
      }
      // if (powerUp.on && powerUp.kind == specialBricks.gunMode) {
      //   // powerup gun
      //   gun.x1 = paddles[0].x + gun.distance;
      //   gun.x2 = paddles[0].x + paddles[0].w - gun.distance;
      // }
    }
    if (LEFT === true && paddles[0].x > 0) {
      paddles[0].x -= paddles[0].vx;
      if (stay) {
        // powerup sticky ball
        balls[0].x = paddles[0].x;
      }
      // if (powerUp.on && powerUp.kind == specialBricks.gunMode) {
      //   // powerup gun
      //   gun.x1 = paddles[0].x + gun.distance;
      //   gun.x2 = paddles[0].x + paddles[0].w - gun.distance - gun.w;
      // }
    }
  }
}
