import { settings } from "./settings";

export const livesScore = {
  lives: 3,
  score: 0,
  draw(ctx) {
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#000";
    ctx.fillText(`Lives: ${this.lives}`, 5, 16);
    const scoreSize = ctx.measureText(`Score: ${this.score}`);
    ctx.fillText(
      `Score: ${this.score}`,
      settings.canvasW - scoreSize.width - 5,
      16
    );
  },
};
