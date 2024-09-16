import { settingsBrowser, settingsMobile } from "./settings.js";
import { powerUp, specialBricks } from "./powerups.js";
import { LEFT, RIGHT } from "./keyboard.js";
import { gameStage } from "./stages.js";
import { balls } from "./balls.js";
import { gun } from "./gun.js";
import { changeActivePaddle } from "./powerups.js";
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
    specialBricks.wormhole.twoPaddles
  ) {
    // wormhole enabled or disabled already while two paddles still active
    if (RIGHT === true) {
      paddles[0].x += paddles[0].vx;
    }
    if (paddles[0].x + paddles[0].w > settings.canvasW) {
      console.log("right");

      // paddle to the right of canvas boundary
      let leftX = settings.canvasW - paddles[0].x;
      paddles[1].x = 0 - leftX;
      drawPaddle(ctx, paddles[1]);
      specialBricks.wormhole.twoPaddles = true;
      paddles[1].active = true;
    }

    if (LEFT === true) {
      paddles[0].x -= paddles[0].vx;
      paddles[1].x -= paddles[1].vx; // not sure why
    }
    if (paddles[0].x < 0) {
      // paddle to the left of canvas boundary
      let rightX = 0 - paddles[0].x;
      paddles[1].x = settings.canvasW - rightX;
      drawPaddle(ctx, paddles[1]);
      specialBricks.wormhole.twoPaddles = true;
      paddles[1].active = true;
    }

    console.log(
      "powerUp.kind",
      powerUp.kind,
      "powerUp.on",
      powerUp.on,
      "specialBricks.wormhole.twoPaddles",
      specialBricks.wormhole.twoPaddles
    );
    changeActivePaddle();
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

      // if (powerUp.on && powerUp.kind == specialBricks.gunMode) {
      //   // powerup gun
      //   gun.x1 = paddles[0].x + gun.distance;
      //   gun.x2 = paddles[0].x + paddles[0].w - gun.distance;
      // }
    }
    if (LEFT === true && paddles[0].x > 0) {
      paddles[0].x -= paddles[0].vx;
      balls.forEach((ball) => {
        // sticky ball, move the ball with the paddle
        if (ball.stay) {
          ball.x -= paddles[0].vx;
        }
      });
      // if (powerUp.on && powerUp.kind == specialBricks.gunMode) {
      //   // powerup gun
      //   gun.x1 = paddles[0].x + gun.distance;
      //   gun.x2 = paddles[0].x + paddles[0].w - gun.distance - gun.w;
      // }
    }
  }
}
