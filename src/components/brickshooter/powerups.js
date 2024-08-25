import { paddles, defaultPaddle, resetPaddle } from "./paddles.js";
import { balls, defaultBall, resetBall } from "./balls.js";
import { settings } from "./settings.js";
import { livesScore } from "./score.js";
import { gameStage, winLevel } from "./stages.js";
import { changeSticky } from "./Game.jsx";
import { gun, ammo, addAmmo, deleteAmmo } from "./gun.js";
import { brick } from "./bricks.js";
import { changeHitBricks, hitBricks, bricksInLevel } from "./Game.jsx";

let gunInterval;

export const powerUpDefault = {
  x: 0,
  y: 0,
  vy: 1.8,
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
  ctx.lineWidth = 1;
  ctx.fillStyle = gradient;
  ctx.rect(powerUp.x, powerUp.y, powerUp.w, powerUp.h);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

export const specialBricks = {
  bigPaddle: {
    desc: "bigger paddle",
    color1: "#2ea300",
    color2: "#6bb439",
    run() {
      paddles[0].w = paddles[0].w * 1.5;
      setTimeout(() => specialBricks.bigPaddle.stop(), settings.powerUpTimer);
    },
    stop() {
      powerUp.on = false;
      paddles[0].w = defaultPaddle.w;
    },
  },

  wormhole: {
    desc: "paddle can go through the wall and appear on the other side",
    color1: "#840075",
    color2: "#a0008d",
    twoPaddles: false,
    run() {
      setTimeout(() => specialBricks.wormhole.stop(), settings.powerUpTimer);
    },
    stop() {
      powerUp.on = false;
      changeActivePaddle();
    },
  },
  twoBalls: {
    desc: "get another ball",
    color1: "#3a1d91",
    color2: "#4c2cab",
    run() {
      balls[1].active = true;
      balls[1].x = paddles[0].x + paddles[0].w / 2;
      balls[1].y = settings.canvasH - 100;
      setTimeout(() => specialBricks.twoBalls.stop(), settings.powerUpTimer);
    },
    stop() {
      powerUp.on = false;
      changeActiveBalls();
    },
  },
  bigBall: {
    desc: "ball size x1.5",
    color1: "#0a515a",
    color2: "#0d6470",
    run() {
      balls.forEach((ball) => {
        ball.radius = ball.radius * 1.5;
      });
      setTimeout(() => specialBricks.bigBall.stop(), settings.powerUpTimer);
    },
    stop() {
      balls.forEach((ball) => {
        ball.radius = defaultBall.radius;
      });
      powerUp.on = false;
    },
  },
  threeBalls: {
    desc: "get three balls",
    color1: "#240d68",
    color2: "#2c1081",
    run() {
      balls[1].active = true;
      balls[1].x = paddles[0].x + paddles[0].w / 2 - 10;
      balls[1].y = defaultBall.y;
      balls[2].active = true;
      balls[2].x = paddles[0].x + paddles[0].w / 2 + 10;
      balls[2].y = defaultBall.y;
      setTimeout(() => specialBricks.threeBalls.stop(), settings.powerUpTimer);
    },
    stop() {
      powerUp.on = false;
      changeActiveBalls();
    },
  },
  extraLife: {
    desc: "add an extra life",
    color1: "#004511",
    color2: "#005d17",
    run() {
      livesScore.lives += 1;
      setTimeout(() => specialBricks.extraLife.stop(), 3000);
    },
    stop() {
      powerUp.on = false;
    },
  },
  stickyBall: {
    desc: "ball sticks to the paddle",
    color1: "#547314",
    color2: "#689019",
    run() {
      setTimeout(() => specialBricks.stickyBall.stop(), settings.powerUpTimer);
      changeSticky(true);
    },
    stop() {
      powerUp.on = false;
      changeSticky(false);
    },
  },
  gunMode: {
    desc: "you can shoot bricks",
    color1: "#5a5a5a",
    color2: "#808080",
    run() {
      setTimeout(() => specialBricks.gunMode.stop(), settings.powerUpTimer);
      gunInterval = setInterval(() => addAmmo(paddles[0]), 500);
    },
    stop() {
      clearInterval(gunInterval);
      gunInterval = null;
      powerUp.on = false;
      deleteAmmo();
      console.log("del");
      console.log(ammo);
    },
  },
  smallPaddle: {
    desc: "paddle size - 30%",
    color1: "#850000",
    color2: "#ac0404",
    run() {
      paddles[0].w = paddles[0].w * 0.7;
      setTimeout(() => specialBricks.smallPaddle.stop(), settings.powerUpTimer);
    },
    stop() {
      paddles[0].w = defaultPaddle.w;
      powerUp.on = false;
    },
  },
  smallBall: {
    desc: "ball size - 30%",
    color1: "#9e4500",
    color2: "#b34e01",
    run() {
      setTimeout(() => specialBricks.smallBall.stop(), settings.powerUpTimer);
      balls.forEach((ball) => {
        ball.radius = ball.radius * 0.7;
      });
    },
    stop() {
      balls.forEach((ball) => {
        ball.radius = defaultBall.radius;
      });
      powerUp.on = false;
    },
  },
};

export function powerUpRelease(ctx) {
  if (powerUp.released) {
    drawPowerUp(ctx, powerUp.kind);
    powerUp.y += powerUp.vy;

    if (powerUp.y > settings.canvasH) {
      // outside bottom canvas
      powerUp.released = false;
    } else if (
      (powerUp.x + powerUp.w >= paddles[0].x &&
        powerUp.x <= paddles[0].x + paddles[0].w &&
        powerUp.y + powerUp.h >= paddles[0].y &&
        powerUp.y <= paddles[0].y) ||
      // wormhole
      (paddles[1].active &&
        powerUp.x + powerUp.w >= paddles[1].x &&
        powerUp.x <= paddles[1].x + paddles[1].w &&
        powerUp.y + powerUp.h >= paddles[1].y &&
        powerUp.y <= paddles[1].y)
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

// powerup - gun mode
export function hitGunBricks(bricks) {
  ammo.forEach((bullet) => {
    for (let c = 0; c < 11; c++) {
      for (let r = 0; r < 11; r++) {
        const br = bricks[c][r];
        let hit = false;
        if (
          (br.painted === true || br.painted === "strong") &&
          bullet.y >= br.y &&
          bullet.y <= br.y + brick.h
        ) {
          if (
            bullet.active1 &&
            bullet.x1 >= br.x &&
            bullet.x1 + gun.w <= br.x + brick.w
          ) {
            bullet.active1 = false;
            hit = true;
          }
          if (
            bullet.active2 &&
            bullet.x2 >= br.x &&
            bullet.x2 + gun.w <= br.x + brick.w
          ) {
            bullet.active2 = false;
            hit = true;
          }
        }
        if (hit) {
          if (br.painted === "strong") {
            bricks[c][r].painted = true;
            livesScore.score += 5;
          } else if (br.painted === true) {
            bricks[c][r].painted = false;
            livesScore.score += 10;
            changeHitBricks();
            if (hitBricks === bricksInLevel) {
              if (LEVEL + 1 === settings.levelCount) {
                winGame();
                return;
              } else {
                winLevel();
                return;
              }
            }
          }

          // special bricks
          const isSpecialBrick =
            !powerUp.released &&
            !powerUp.on &&
            Math.floor(Math.random() * 100) < settings.specialBricksPercent;
          if (isSpecialBrick) {
            console.log("sp");
            powerUp.released = true;

            const keys = Object.keys(specialBricks);
            const random = Math.floor(Math.random() * 9);
            // const random = 9;
            powerUp.kind = specialBricks[keys[random]];

            console.log(powerUp.kind);

            powerUp.x = br.x;
            powerUp.y = br.y;
          }
        }
      }
    }
  });
}

// powerup - wormhole
export function drawWormhole(ctx) {
  let Y = defaultPaddle.y - 20;
  let Y2 = defaultPaddle.y + defaultPaddle.h + 20;
  let X = 1;
  let X2 = settings.canvasW - 1;
  let YY = (Y2 - Y) / 8;
  let gradient = ctx.createLinearGradient(X, Y, X, Y2);
  gradient.addColorStop(0, "#6c84fb");
  gradient.addColorStop(0.25, "#561994");
  gradient.addColorStop(0.5, "#6c84fb");
  gradient.addColorStop(0.75, "#561994");
  gradient.addColorStop(1, "#6c84fb");
  ctx.lineWidth = 6;
  ctx.strokeStyle = gradient;

  ctx.beginPath();
  ctx.moveTo(X, Y);
  ctx.lineTo(X + 5, Y + YY);
  ctx.lineTo(X, Y + YY * 2);
  ctx.lineTo(X + 5, Y + YY * 3);
  ctx.lineTo(X, Y + YY * 4);
  ctx.lineTo(X + 5, Y + YY * 5);
  ctx.lineTo(X, Y + YY * 6);
  ctx.lineTo(X + 5, Y + YY * 7);
  ctx.lineTo(X, Y + YY * 8);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(X2, Y);
  ctx.lineTo(X2 - 5, Y + YY);
  ctx.lineTo(X2, Y + YY * 2);
  ctx.lineTo(X2 - 5, Y + YY * 3);
  ctx.lineTo(X2, Y + YY * 4);
  ctx.lineTo(X2 - 5, Y + YY * 5);
  ctx.lineTo(X2, Y + YY * 6);
  ctx.lineTo(X2 - 5, Y + YY * 7);
  ctx.lineTo(X2, Y + YY * 8);
  ctx.stroke();
}

export function announceExtraLife(ctx) {
  ctx.font = "16px sans-serif";
  ctx.fillStyle = "#000";
  ctx.fillText(`+1 life`, settings.canvasW / 2, settings.canvasH / 2);
}

export function changeActiveBalls() {
  if (!balls[0].active) {
    let ballToRemove = null;
    if (balls[1].active) {
      ballToRemove = balls[1];
    } else if (balls[2].active) {
      ballToRemove = balls[2];
    }

    if (ballToRemove) {
      console.log(ballToRemove.x, balls[1].x, balls[2].x);
      balls[0].x = ballToRemove.x;
      balls[0].y = ballToRemove.y;
      balls[0].vx = ballToRemove.vx;
      balls[0].vy = ballToRemove.vy;
      balls[0].active = true;
      resetBall(ballToRemove);
      console.log(ballToRemove.x, balls[1].x, balls[2].x);
      ballToRemove.active = false;
    }
  }
}

export function changeActivePaddle() {
  if (paddles[0].x > settings.canvasW || paddles[0].x + defaultPaddle.w < 0) {
    // paddle 0 is completely outside of canvas
    paddles[0].active = false;
  }
  if (paddles[1].x > settings.canvasW || paddles[1].x + defaultPaddle.w < 0) {
    // paddle 0 is completely outside of canvas
    paddles[1].active = false;
  }

  if (paddles[0].active && !paddles[1].active) {
    // all good, paddle0 is main
    return;
  } else if (!paddles[0].active && paddles[1].active) {
    // paddle1 is main, change to paddle0
    paddles[0].x = paddles[1].x;
    paddles[0].active = true;
    paddles[1].active = false;
    specialBricks.wormhole.twoPaddles = false;
  }
}
