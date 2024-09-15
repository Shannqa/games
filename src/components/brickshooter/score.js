import { settingsBrowser, settingsMobile } from "./settings";
import { isTouchDevice } from "./touch";
const settings = isTouchDevice() ? settingsMobile : settingsBrowser;

export const livesScore = {
  lives: settings.lives,
  score: 0,
  draw(ctx) {
    ctx.font = `${settings.scoreText}px sans-serif`;
    ctx.fillStyle = "#000";
    ctx.fillText(`Lives: ${this.lives}`, 5, settings.gameAreaY - 10);
    const scoreSize = ctx.measureText(`Score: ${this.score}`);
    ctx.fillText(
      `Score: ${this.score}`,
      settings.canvasW - scoreSize.width - 5,
      settings.gameAreaY - 10
    );
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.moveTo(0, settings.gameAreaY);
    ctx.lineTo(settings.canvasW, settings.gameAreaY);
    ctx.stroke();
  },
};
