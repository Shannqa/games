import settings from "./settings";

export const score = {
  score: 0,
  draw(ctx) {
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#000";
    const scoreSize = ctx.measureText(`Score: ${this.score}`);
    ctx.fillText(
      `Score: ${this.score}`,
      settings.canvasW - scoreSize.width - 5,
      16
    );
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.moveTo(0, settings.gameAreaY);
    ctx.lineTo(settings.canvasW, settings.gameAreaY);
    ctx.stroke();
  },
};

export function intervalScore() {}
