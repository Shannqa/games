import { paddles, defaultPaddle } from "./paddles.js";
import { balls, defaultBall } from "./balls.js";
import { settings } from "./settings.js";
import { livesScore } from "./score.js";
import { gameStage } from "./stages.js";
import { sticky, changeSticky } from "./Game.jsx";
import { gun, ammo, addAmmo } from "./gun.js";
import { brick } from "./bricks.js";
import { changeHitBricks, hitBricks, bricksInLevel } from "./Game";
// second ball doesnt fall down the canvas
// ball gets faster after the first hit of paddle

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
      console.log("big");
      setTimeout(() => specialBricks.bigPaddle.stop(), 10000);
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
      console.log("small");
      setTimeout(() => specialBricks.smallPaddle.stop(), 10000);
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
      setTimeout(() => specialBricks.wormhole.stop(), 10000);
    },
    stop() {
      powerUp.on = false;
      if (!paddles[0].active && paddles[1].active) {
        // only second paddle active - make it the primary paddle
        paddles[0].x = paddles[1].x;
        paddles[1].active = false;
        paddles[0].active = true;
      } else if (paddles[0].active && paddles[1].active) {
        // both paddles active and on screen - remove 2nd, move 1st to be fully within canvas
        paddles[1].active = false;
        if (paddles[0].x < 0) {
          paddles[0].x = 0;
        } else if (paddles[0].x + paddles[0].w > settings.canvasW) {
          paddles[0].x = settings.canvasW - paddles[0].w;
        }
      }
      if (gameStage == "lifeLoss") {
        paddles[0].x = defaultPaddle.x;
      }
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
      setTimeout(() => specialBricks.twoBalls.stop(), 10000);
    },
    stop() {
      powerUp.on = false;
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
      setTimeout(() => specialBricks.bigBall.stop(), 10000);
    },
    stop() {
      balls.forEach((ball) => {
        ball.radius = defaultBall.radius;
      });
      powerUp.on = false;
    },
  },
  smallBall: {
    desc: "ball size - 30%",
    color1: "#9e4500",
    color2: "#b34e01",
    run() {
      setTimeout(() => specialBricks.smallBall.stop(), 10000);
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
  threeBalls: {
    desc: "get three balls",
    color1: "#240d68",
    color2: "#2c1081",
    run() {
      balls[1].active = true;
      balls[1].x = paddles[0].x + paddles[0].w / 2;
      balls[1].y = defaultBall.y;
      balls[2].active = true;
      balls[2].x = paddles[0].x + paddles[0].w / 2;
      balls[2].y = defaultBall.y;
      setTimeout(() => specialBricks.threeBalls.stop(), 10000);
    },
    stop() {
      powerUp.on = false;
    },
  },
  extraLife: {
    desc: "add an extra life",
    color1: "#004511",
    color2: "#005d17",
    run() {
      livesScore.lives += 1;
      powerUp.on = false;
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
      setTimeout(() => specialBricks.stickyBall.stop(), 10000);
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
    interval() {
      let gunInterval;
      if (gunInterval) {
        clearInterval(gunInterval);
      } else {
        gunInterval = setInterval(() => addAmmo(paddles[0]), 1000);
      }
    },
    run() {
      setTimeout(() => specialBricks.gunMode.stop(), 10000);
      this.interval();
      // let interval = setInterval(() => addAmmo(paddles[0]), 1000);
      // setTimeout(() => clearInterval(interval), 10000);
      // console.log("add");

      // // gun.x1 = paddles[0].x + gun.distance;
      // // gun.x2 = paddles[0].x + paddles[0].w - gun.distance - gun.w;
    },
    stop() {
      powerUp.on = false;
      ammo.splice(0, ammo.length);
      this.interval();
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

export function hitGunBricks(bricks) {
  ammo.forEach((bullet) => {
    for (let c = 0; c < 11; c++) {
      for (let r = 0; r < 11; r++) {
        const br = bricks[c][r];
        if (
          br.painted === true &&
          // bullet.active &&
          // ball.x + ball.radius >= br.x &&
          // ball.x - ball.radius <= br.x + brick.w &&
          // ball.y + ball.radius >= br.y &&
          // ball.y - ball.radius <= br.y + brick.h

          bullet.x + gun.w >= br.x &&
          bullet.x <= br.x + brick.w &&
          bullet.y >= br.y &&
          bullet.y <= br.y + brick.h
        ) {
          console.log("hit bullet");
          console.log(ammo);
          bullet.active = false;
          // livesScore.score += 10;
          // let newBricks = [...bricks];
          // console.log(newBricks);
          // newBricks[c][r].painted = false;
          // console.log(newBricks[c][r]);
          // changeHitBricks();
          // if (hitBricks == bricksInLevel) {
          //   winLevel();
          //   return;
          // }
          // // special bricks
          // const isSpecialBrick =
          //   !powerUp.released &&
          //   Math.floor(Math.random() * 100) < settings.specialBricksPercent;
          // if (isSpecialBrick) {
          //   console.log("sp");
          //   powerUp.released = true;

          //   const keys = Object.keys(specialBricks);
          //   // const random = Math.floor(Math.random() * 9);
          //   const random = 9;
          //   powerUp.kind = specialBricks[keys[random]];

          //   console.log(powerUp.kind);

          //   powerUp.x = br.x;
          //   powerUp.y = br.y;
          // }
        }
      }
    }
  });
}
