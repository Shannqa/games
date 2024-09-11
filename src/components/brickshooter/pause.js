import { settings } from "./settings";
export let paused = false;

export function changePaused(state) {
  paused = state;
}

export function drawPause(ctx) {
  settings.canvasH / 2;
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(settings.canvasW / 2, settings.canvasH / 2, 80, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.fillStyle = "#a7c3d2";
  ctx.rect(settings.canvasW / 2 - 35, settings.canvasH / 2 - 35, 20, 70);
  ctx.rect(settings.canvasW / 2 + 15, settings.canvasH / 2 - 35, 20, 70);
  ctx.fill();
  ctx.closePath();
}
