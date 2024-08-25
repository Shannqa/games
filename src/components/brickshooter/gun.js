import { defaultPaddle, paddles } from "./paddles";
import { settings } from "./settings";
export const gun = {
  x1: 0,
  y: settings.canvasH - 80,
  x2: 0,
  distance: 10,
  w: 6,
  h: -12,
  vx: 2.5,
  vy: -2.5,
};

export const ammo = [];

export function addAmmo(paddle) {
  console.log("ADD");
  if (ammo.length < 8) {
    ammo.push({
      x1: paddle.x + gun.distance,
      x2: paddle.x + paddle.w - gun.distance,
      y: settings.canvasH - 80,
      active1: true,
      active2: true,
    });
  }
}

export function deleteAmmo() {
  while (ammo.length > 0) {
    ammo.pop();
  }
}

export function drawGun(ctx, bullet) {
  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  if (bullet.active1) {
    ctx.rect(bullet.x1, bullet.y, gun.w, gun.h);
  }
  if (bullet.active2) {
    ctx.rect(bullet.x2, bullet.y, gun.w, gun.h);
  }

  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}
