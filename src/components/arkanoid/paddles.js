import { settings } from "./settings.js";
import { powerUp } from "./powerups.js"

const defaultPaddle = {
  x: settings.canvasW / 2 - 40,
  y: settings.canvasH - 50,
  w: 80,
  h: 12,
  vx: 3,
}

const paddles = [
  {
    x: defaultPaddle.x,
    y: defaultPaddle.y,
    w: defaultPaddle.w,
    h: defaultPaddle.h,
    vx: defaultPaddle.vx
  },
  {
    x: defaultPaddle.x,
    y: defaultPaddle.y,
    w: defaultPaddle.w,
    h: defaultPaddle.h,
    vx: defaultPaddle.vx
  }
]

function drawPaddle(ctx, paddle) {
  ctx.beginPath();
  ctx.strokeStyle = "#103549";
  ctx.fillStyle = "#234e66";
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

function resetPaddle(paddle) {
  paddle = {...defaultPaddle}
}

function movePaddle(ctx, paddles) {
  if (powerUp.kind !== "wormhole" && !powerUp.on) {
    // normal paddle moves
    if (RIGHT === true && paddles[0].x + paddles[0].w < settings.canvasW) {
        paddles[0].x += paddles[0].vx;
      }
      if (LEFT === true && paddles[0].x > 0) {
        paddles[0].x -= paddles[0].vx;
      }
  } else if (powerUp.kind === "wormhole" && powerUp.on) {
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
    if (paddle[0].x < 0) {
      // paddle to the left of canvas boundary
      let rightX = 0 - paddles[0].x;
      paddles[1].x = settings.canvasW - rightX;
      drawPaddle(ctx, paddles[1]);
      paddles[1].active = true;
      }
    } 
    
  }