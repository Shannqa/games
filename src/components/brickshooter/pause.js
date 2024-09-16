import { settingsBrowser, settingsMobile } from "./settings";
import { isTouchDevice } from "./touch.js";

const settings = isTouchDevice() ? settingsMobile : settingsBrowser;

export let paused = false;

export function changePaused(state) {
  paused = state;
}

export function drawPause(ctx) {
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(settings.canvasW / 2, settings.canvasH / 2, 80, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.fillStyle = "#a7c3d2";
  ctx.rect(settings.canvasW / 2 - 30, settings.canvasH / 2 - 35, 20, 70);
  ctx.rect(settings.canvasW / 2 + 10, settings.canvasH / 2 - 35, 20, 70);
  ctx.fill();
  ctx.closePath();
}

// mobile pause
export function drawMobilePause(ctx) {
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(
    settings.canvasW / 2,
    settings.gameAreaY - 25,
    15,
    0,
    Math.PI * 2,
    true
  );
  ctx.fill();
  ctx.fillStyle = "#000";
  ctx.rect(settings.canvasW / 2 - 6, settings.gameAreaY - 30, 4, 10);
  ctx.rect(settings.canvasW / 2 + 2, settings.gameAreaY - 30, 4, 10);
  ctx.fill();
  ctx.closePath();
}
export function drawMobilePlay(ctx) {
  ctx.fillStyle = "#000";
  ctx.beginPath();

  ctx.arc(
    settings.canvasW / 2,
    settings.gameAreaY - 25,
    15,
    0,
    Math.PI * 2,
    true
  );
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.moveTo(settings.canvasW / 2 - 4, 17);
  ctx.lineTo(settings.canvasW / 2 - 4, 32);
  ctx.lineTo(settings.canvasW / 2 + 7, 25);
  ctx.lineTo(settings.canvasW / 2 - 4, 17);
  ctx.fill();
  ctx.closePath();
}
