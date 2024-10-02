import { settings } from "./settings.js";
import { blocks, drawBlock } from "./blocks.js";

export function drawMenu(ctx, nextBlock) {
  const menuStart = settings.canvasW - settings.menuWidth;
  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.moveTo(menuStart, 0);
  ctx.lineTo(menuStart, settings.canvasH);
  ctx.stroke();
  ctx.closePath();

  ctx.font = `${settings.menuText}px sans-serif`;
  ctx.fillStyle = "#000";
  ctx.fillText("Next:", menuStart + 20, 30);
  if (nextBlock) {
    drawBlock(ctx, nextBlock, menuStart + 50, 50);
  }
}