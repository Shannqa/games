import { paddles, defaultPaddle } from "./paddles.js";
import { settings } from "./settings.js";
import { livesScore } from "./score.js";
export const powerUpDefault = {
  x: 0,
  y: 0,
  vy: 0.9,
  w: 72,
  h: 20,
};

export const powerUp = {
  kind: null,
  released: false,
  on: false,
  x: powerUpDefault.x,
  y: powerUpDefault.y,
  vy: powerUpDefault.vy,
  w: powerUpDefault.w,
  h: powerUpDefault.h,
};

export function drawPowerUp(ctx, kind) {
  const gradient = ctx.createLinearGradient(
    powerUp.x,
    powerUp.y,
    powerUp.x + powerUp.w,
    powerUp.y + powerUp.h
  );

  gradient.addColorStop(0, kind.color1);
  gradient.addColorStop(0.5, kind.color2);
  gradient.addColorStop(1, kind.color1);
  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.fillStyle = gradient;
  ctx.rect(powerUp.x, powerUp.y, powerUp.w, powerUp.h);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

export const specialBricks = {
  bigPaddle: {
    desc: "paddle size x2",
    color1: "#2ea300",
    color2: "#6bb439",
    run() {
      paddles[0].w = paddles[0].w * 2;
      setTimeout(() => specialBricks.bigPaddle.stop(), 5000);
    },
    stop() {
      powerUp.on = false;
      paddles[0].w = defaultPaddle.w;
    },
  },
  smallPaddle: {
    desc: "paddle size - 30%",
    color1: "#850000",
    color2: "#ac0404",
    run() {
      paddles[0].w = paddles[0].w * 0.7;
      setTimeout(() => specialBricks.smallPaddle.stop(), 5000);
    },
    stop() {
      paddles[0].w = defaultPaddle.w;
      powerUp.on = false;
    },
  },
  wormhole: {
    desc: "paddle can go through the wall and appear on the other side",
    color1: "#840075",
    color2: "#a0008d",
    run() {
      setTimeout(() => specialBricks.wormhole.stop(), 5000);
    },
    stop() {
      powerUp.on = false;
      if (!paddle1.active && paddle2.active) {
        // only second paddle active - make it the primary paddle
        paddles[0].x = paddles[1].x;
        paddle[0].y = paddles[1].y;
        paddles[1].active = false;
      } else if (paddles[0].active && paddles[1].active) {
        // both paddles active and on screen - remove 2nd, move 1st to be fully within canvas
        paddles[1].active = false;

        if (paddles[0].x < 0) {
          paddles[0].x = 0;
        } else if (paddles[0].x + paddles[0].w > settings.canvasW) {
          paddles[0].x = settings.canvasW - paddles[0].w;
        }
      }
    },
  },
  twoBalls: {
    desc: "get another ball",
    color1: "#240d68",
    color2: "#2c1081",
    run() {
      balls[1].draw();
      setTimeout(() => specialBricks.twoBalls.stop(), 5000);
    },
    stop() {
      powerUp.on = false;
    },
  },
  bigBall: {
    desc: "ball size x2",
    color1: "#0a515a",
    color2: "#0d6470",
    run() {
      balls.forEach((ball) => {
        ball.radius = ball.radius * 2;
      });

      setTimeout(() => specialBricks.bigBall.stop(), 5000);
    },
    stop() {
      balls.forEach((ball) => {
        ball.radius = defaultBall.radius;
      });
      powerUp.on = false;
    },
  },
  smallBall: {
    desc: "ball size / 2",
    color1: "#9e4500",
    color2: "#b34e01",
    run() {
      setTimeout(() => specialBricks.smallBall.stop(), 5000);
      balls.forEach((ball) => {
        ball.radius = ball.radius * 0.7;
      });
    },
    stop() {
      const balls = [ball1, ball2];
      balls.forEach((ball) => {
        ball.radius = defaultBall.radius;
      });
      powerUp.on = false;
    },
  },
  tripleBalls: "get three balls",
  noDeath: "ball will bounce off the bottom of the canvas",
  gunMode: "you can shoot bricks",
  stickyBall: "ball sticks to the paddle",
  extraLife: "add an extra life",
};

export function powerUpRelease(ctx) {
  if (powerUp.released) {
    drawPowerUp(ctx, powerUp.kind);
    powerUp.y += powerUp.vy;

    if (powerUp.y > settings.canvasH) {
      // outside bottom canvas
      powerUp.released = false;
    } else if (
      (powerUp.x + powerUp.w > paddles[0].x &&
        powerUp.x < paddles[0].x + paddles[0].w &&
        powerUp.y + powerUp.h > paddles[0].y &&
        powerUp.y > paddles[0].y) ||
      // wormhole
      (powerUp.x + powerUp.w > paddles[1].x &&
        powerUp.x < paddles[1].x + paddles[1].w &&
        powerUp.y + powerUp.h > paddles[1].y &&
        powerUp.y > paddles[1].y)
    ) {
      // hit the paddle
      livesScore.score += 50;
      powerUp.released = false;
      powerUp.on = true;
      powerUp.kind.run();
      console.log("powerup");
    }
  }
}
