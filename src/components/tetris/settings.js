export const settings = {
  canvasW: 600,
  canvasH: 600,
  menuWidth: 200,
  gameAreaW: 400,
  menuText: 20,
  speed: 60, // 60 +/- 1 per second
  squareSize: 20,
};

export const settingsMobile = {};

export const nrOfBlocks = {
  x: settings.gameAreaW / settings.squareSize,
  y: settings.canvasH / settings.squareSize,
};
