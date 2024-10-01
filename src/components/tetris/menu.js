import { settings } from "./settings.js";
import { blocks, drawBlock } from "./blocks.js";

export function drawMenu(ctx, nextBlock) {
  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.moveTo(settings.width - settings.menuWidth, 0);
  ctx.lineTo(settings.width - settings.menuWidth, height);
  ctx.stroke();
  ctx.closePath();
  
  
  drawBlock(nextBlock, blocks, ctx, settings.width - (settings.menuWidth/ 2), 100)
}